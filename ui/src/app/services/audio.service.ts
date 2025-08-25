import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio: HTMLAudioElement | null = null;
  private isEnabled = true;

  constructor() {
    // Precargar el audio para mejor rendimiento
    this.preloadAudio();
  }

  private preloadAudio(): void {
    try {
      this.audio = new Audio();
      this.audio.src = '/assets/sounds/whistle.mp3';
      this.audio.preload = 'auto';
      this.audio.volume = 0.7; // Volumen al 70%
    } catch (error) {
      console.warn('No se pudo precargar el audio de silbato:', error);
    }
  }

  /**
   * Reproduce el sonido de silbato para fin de cuarto
   */
  playQuarterEndWhistle(): void {
    if (!this.isEnabled || !this.audio) {
      return;
    }

    try {
      // Reiniciar el audio si ya se está reproduciendo
      this.audio.currentTime = 0;
      
      const playPromise = this.audio.play();
      
      // Manejar navegadores que requieren interacción del usuario
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn('No se pudo reproducir el silbato automáticamente:', error);
          // Intentar reproducir después de la próxima interacción del usuario
          this.enableAudioOnNextInteraction();
        });
      }
    } catch (error) {
      console.warn('Error al reproducir silbato:', error);
    }
  }

  /**
   * Habilita/deshabilita los sonidos
   */
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  /**
   * Obtiene el estado de habilitación de audio
   */
  isAudioEnabled(): boolean {
    return this.isEnabled;
  }

  /**
   * Maneja la política de autoplay de los navegadores
   */
  private enableAudioOnNextInteraction(): void {
    const enableAudio = () => {
      if (this.audio) {
        this.audio.play().then(() => {
          this.audio!.pause();
          this.audio!.currentTime = 0;
        }).catch(() => {
          // Silenciar errores de autoplay
        });
      }
      
      // Remover listeners después del primer uso
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
      document.removeEventListener('keydown', enableAudio);
    };

    document.addEventListener('click', enableAudio, { once: true });
    document.addEventListener('touchstart', enableAudio, { once: true });
    document.addEventListener('keydown', enableAudio, { once: true });
  }
}
