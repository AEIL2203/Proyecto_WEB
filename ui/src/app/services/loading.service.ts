import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() {}

  /**
   * Set the loading state
   * @param isLoading Whether the application is in a loading state
   */
  setLoading(isLoading: boolean): void {
    // Only update if the state has changed
    if (this.loadingSubject.value !== isLoading) {
      setTimeout(() => {
        this.loadingSubject.next(isLoading);
      });
    }
  }

  /**
   * Get the current loading state
   * @returns The current loading state
   */
  getLoading(): boolean {
    return this.loadingSubject.value;
  }

  /**
   * Show loading indicator
   */
  show(): void {
    this.setLoading(true);
  }

  /**
   * Hide loading indicator
   */
  hide(): void {
    this.setLoading(false);
  }
}
