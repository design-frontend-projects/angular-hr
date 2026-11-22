import { Injectable, signal } from '@angular/core';
import { ToastMessage, ToastVariant } from '../models/shipping.models';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly _toasts = signal<readonly ToastMessage[]>([]);
  readonly toasts = this._toasts.asReadonly();

  show(title: string, description?: string, variant: ToastVariant = 'info', durationMs = 4500): void {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const next: ToastMessage = { id, title, description, variant };
    this._toasts.update((items) => [...items, next]);

    if (typeof window !== 'undefined' && durationMs > 0) {
      window.setTimeout(() => this.dismiss(id), durationMs);
    }
  }

  dismiss(id: string): void {
    this._toasts.update((items) => items.filter((item) => item.id !== id));
  }
}
