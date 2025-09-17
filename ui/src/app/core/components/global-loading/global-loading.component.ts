import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../services/loading.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-global-loading',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  template: `
    <app-loading-spinner 
      [isLoading]="isLoading"
      message="Cargando..."
    ></app-loading-spinner>
  `
})
export class GlobalLoadingComponent implements OnInit {
  isLoading = false;

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.loadingService.loading$.subscribe(loading => {
      this.isLoading = loading;
    });
  }
}
