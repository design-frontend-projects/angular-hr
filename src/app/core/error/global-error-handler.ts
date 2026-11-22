import { ErrorHandler, Injectable, inject } from '@angular/core';
import { ToastService } from '../services/toast.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private readonly toast = inject(ToastService);

  handleError(error: unknown): void {
    console.error('[SwiftRoute GlobalErrorHandler]', error);
    if (typeof window !== 'undefined') {
      this.toast.show(
        'Something went wrong',
        'An unexpected error occurred. Please try again or refresh the page.',
        'error',
      );
    }
  }
}
