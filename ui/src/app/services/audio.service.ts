import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private whistleAudio: HTMLAudioElement | null = null;
  private scoreAudio: HTMLAudioElement | null = null;
  private isEnabled = true;

  constructor() {
    // Precargar sonidos
    this.preloadAudio();
  }

  private preloadAudio(): void {
    try {
      this.whistleAudio = new Audio();
      this.whistleAudio.src = '/assets/sounds/whistle.mp3';
      this.whistleAudio.preload = 'auto';
      this.whistleAudio.volume = 0.7;

      this.scoreAudio = new Audio();
      this.scoreAudio.src = '/assets/sounds/score.mp3';
      this.scoreAudio.preload = 'auto';
      this.scoreAudio.volume = 0.6;
    } catch (error) {
      console.warn('No se pudo precargar el audio de silbato:', error);
    }
  }

  // Reproduce silbato de fin de cuarto
  playQuarterEndWhistle(): void {
    if (!this.isEnabled || !this.whistleAudio) {
      return;
    }

    try {
      // Reiniciar reproducción
      this.whistleAudio.currentTime = 0;
      
      const playPromise = this.whistleAudio.play();
      
      // Manejar política de autoplay
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn('No se pudo reproducir el silbato automáticamente:', error);
          // Habilitar en próxima interacción
          this.enableAudioOnNextInteraction();
        });
      }
    } catch (error) {
      console.warn('Error al reproducir silbato:', error);
    }
  }

  // Reproduce sonido de anotación
  playScore(): void {
    if (!this.isEnabled || !this.scoreAudio) return;
    try {
      this.scoreAudio.currentTime = 0;
      const p = this.scoreAudio.play();
      if (p) p.catch(() => this.enableAudioOnNextInteraction());
    } catch {}
  }

  // Sonido de inicio de tiempo extra
  playOvertimeStart(): void {
    this.playQuarterEndWhistle();
  }

  // Sonido de fin de partido
  playGameEnd(): void {
    this.playQuarterEndWhistle();
    // Encadenar sonidos
    setTimeout(() => this.playScore(), 250);
  }

  // Habilitar/deshabilitar sonidos
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  // Estado de habilitación
  isAudioEnabled(): boolean {
    return this.isEnabled;
  }

  // Maneja política de autoplay
  private enableAudioOnNextInteraction(): void {
    const enableAudio = () => {
      if (this.whistleAudio) {
        this.whistleAudio.play().then(() => {
          this.whistleAudio!.pause();
          this.whistleAudio!.currentTime = 0;
        }).catch(() => {
          // Ignorar errores
        });
      }
      if (this.scoreAudio) {
        this.scoreAudio.play().then(() => {
          this.scoreAudio!.pause();
          this.scoreAudio!.currentTime = 0;
        }).catch(() => {});
      }
      
      // Limpiar listeners
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
      document.removeEventListener('keydown', enableAudio);
    };

    document.addEventListener('click', enableAudio, { once: true });
    document.addEventListener('touchstart', enableAudio, { once: true });
    document.addEventListener('keydown', enableAudio, { once: true });
  }
}
