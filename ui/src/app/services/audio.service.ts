import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private whistleAudio: HTMLAudioElement | null = null;
  private scoreAudio: HTMLAudioElement | null = null;
  private isEnabled = true;

  constructor() {
    // Precargar el audio para mejor rendimiento
    this.preloadAudio();
  }

  private preloadAudio(): void {
    try {
      this.whistleAudio = new Audio();
      this.whistleAudio.src = '/assets/sounds/whistle.mp3';
      this.whistleAudio.preload = 'auto';
      this.whistleAudio.volume = 0.7; // Volumen al 70%

      this.scoreAudio = new Audio();
      this.scoreAudio.src = '/assets/sounds/score.mp3';
      this.scoreAudio.preload = 'auto';
      this.scoreAudio.volume = 0.6;
    } catch (error) {
      console.warn('No se pudo precargar el audio de silbato:', error);
    }
  }

  /**
   * Reproduce el sonido de silbato para fin de cuarto
   */
  playQuarterEndWhistle(): void {
    if (!this.isEnabled || !this.whistleAudio) {
      return;
    }

    try {
      // Reiniciar el audio si ya se está reproduciendo
      this.whistleAudio.currentTime = 0;
      
      const playPromise = this.whistleAudio.play();
      
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
   * Reproduce sonido de anotación
   */
  playScore(): void {
    if (!this.isEnabled || !this.scoreAudio) return;
    try {
      this.scoreAudio.currentTime = 0;
      const p = this.scoreAudio.play();
      if (p) p.catch(() => this.enableAudioOnNextInteraction());
    } catch {}
  }

  /**
   * Reproduce sonido para inicio de tiempo extra (reutiliza silbato)
   */
  playOvertimeStart(): void {
    this.playQuarterEndWhistle();
  }

  /**
   * Reproduce sonido al finalizar el partido (reutiliza silbato + score suave)
   */
  playGameEnd(): void {
    this.playQuarterEndWhistle();
    // Pequeño retardo para encadenar el score como confirmación
    setTimeout(() => this.playScore(), 250);
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
      if (this.whistleAudio) {
        this.whistleAudio.play().then(() => {
          this.whistleAudio!.pause();
          this.whistleAudio!.currentTime = 0;
        }).catch(() => {
          // Silenciar errores de autoplay
        });
      }
      if (this.scoreAudio) {
        this.scoreAudio.play().then(() => {
          this.scoreAudio!.pause();
          this.scoreAudio!.currentTime = 0;
        }).catch(() => {});
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
