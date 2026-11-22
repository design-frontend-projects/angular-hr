import { Component, inject } from '@angular/core';
import { LucideCircleCheck, LucideInfo, LucideX } from '@lucide/angular';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast-container',
  imports: [LucideCircleCheck, LucideInfo, LucideX],
  template: `
    <div
      aria-live="polite"
      aria-atomic="true"
      class="pointer-events-none fixed right-4 bottom-4 z-50 flex w-full max-w-sm flex-col gap-3 sm:right-6 sm:bottom-6"
    >
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          role="status"
          class="pointer-events-auto flex items-start gap-3 rounded-xl border bg-white p-4 shadow-xl ring-1 ring-slate-900/5 animate-slide-in-right"
          [class.border-emerald-200]="toast.variant === 'success'"
          [class.border-rose-200]="toast.variant === 'error'"
          [class.border-slate-200]="toast.variant === 'info'"
        >
          @if (toast.variant === 'success') {
            <span class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <svg lucideCircleCheck class="h-4 w-4" aria-hidden="true"></svg>
            </span>
          } @else if (toast.variant === 'error') {
            <span class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
              <svg lucideInfo class="h-4 w-4" aria-hidden="true"></svg>
            </span>
          } @else {
            <span class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
              <svg lucideInfo class="h-4 w-4" aria-hidden="true"></svg>
            </span>
          }

          <div class="min-w-0 flex-1">
            <p class="text-sm font-semibold text-slate-900">{{ toast.title }}</p>
            @if (toast.description) {
              <p class="mt-0.5 text-xs leading-relaxed text-slate-600">
                {{ toast.description }}
              </p>
            }
          </div>

          <button
            type="button"
            (click)="toastService.dismiss(toast.id)"
            class="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-signal-500"
            aria-label="Dismiss notification"
          >
            <svg lucideX class="h-4 w-4" aria-hidden="true"></svg>
          </button>
        </div>
      }
    </div>
  `,
})
export class ToastContainerComponent {
  protected readonly toastService = inject(ToastService);
}
