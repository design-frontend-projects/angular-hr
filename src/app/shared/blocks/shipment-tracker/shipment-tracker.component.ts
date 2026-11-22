import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  LucideArrowRight,
  LucideCircleCheck,
  LucideClock,
  LucideCopy,
  LucideInfo,
  LucideMapPin,
  LucideSearch,
  LucideTruck,
} from '@lucide/angular';
import { ShipmentStatus } from '../../../core/models/shipping.models';
import { ToastService } from '../../../core/services/toast.service';
import { TrackingService } from '../../../core/services/tracking.service';

@Component({
  selector: 'app-shipment-tracker',
  imports: [
    FormsModule,
    LucideSearch,
    LucideMapPin,
    LucideClock,
    LucideTruck,
    LucideCircleCheck,
    LucideInfo,
    LucideCopy,
    LucideArrowRight,
  ],
  template: `
    <div
      id="track-shipment"
      class="rounded-2xl border border-white/15 bg-white p-5 text-slate-900 shadow-2xl shadow-navy-950/40 sm:p-6"
    >
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-2.5">
          <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-signal-500/10 text-signal-600">
            <svg lucideTruck class="h-5 w-5" aria-hidden="true"></svg>
          </span>
          <div>
            <h2 class="font-display text-base font-bold text-navy-900">Live Shipment Tracker</h2>
            <p class="text-xs text-slate-500">Real-time hub telemetry &amp; customs milestones</p>
          </div>
        </div>
        <span
          class="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 sm:inline-flex"
        >
          <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"></span>
          Live Feed
        </span>
      </div>

      <!-- Search Form -->
      <form (ngSubmit)="onSearch()" class="mt-4 flex flex-col gap-2.5 sm:flex-row">
        <label for="tracking-input" class="sr-only">Tracking number</label>
        <div class="relative flex-1">
          <svg
            lucideSearch
            class="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          ></svg>
          <input
            id="tracking-input"
            name="trackingNumber"
            type="text"
            [ngModel]="inputCode()"
            (ngModelChange)="inputCode.set($event)"
            placeholder="Enter tracking ID (e.g. SR-884120)"
            autocomplete="off"
            class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-4 pl-10 text-sm font-medium text-navy-900 placeholder:text-slate-400 focus:border-signal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-signal-500/20"
          />
        </div>
        <button
          type="submit"
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-signal-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-signal-600 focus:outline-none focus:ring-2 focus:ring-signal-500 focus:ring-offset-2"
        >
          Track
          <svg lucideArrowRight class="h-4 w-4" aria-hidden="true"></svg>
        </button>
      </form>

      <!-- Demo Chips -->
      <div class="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span class="font-medium text-slate-500">Try demo ID:</span>
        @for (demoId of trackingService.demoIds; track demoId) {
          <button
            type="button"
            (click)="selectDemo(demoId)"
            class="rounded-md border px-2.5 py-1 font-mono text-xs font-semibold transition-colors"
            [class.border-signal-500]="state().query === demoId"
            [class.bg-signal-500/10]="state().query === demoId"
            [class.text-signal-700]="state().query === demoId"
            [class.border-slate-200]="state().query !== demoId"
            [class.bg-slate-50]="state().query !== demoId"
            [class.text-slate-600]="state().query !== demoId"
            [class.hover:border-slate-300]="state().query !== demoId"
          >
            {{ demoId }}
          </button>
        }
      </div>

      <!-- Error State -->
      @if (state().error; as errorMessage) {
        <div
          role="alert"
          class="mt-4 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-sm text-rose-800"
        >
          <svg lucideInfo class="mt-0.5 h-4 w-4 shrink-0 text-rose-600" aria-hidden="true"></svg>
          <p>{{ errorMessage }}</p>
        </div>
      }

      <!-- Shipment Result -->
      @if (state().shipment; as shipment) {
        <div class="mt-5 rounded-xl border border-slate-200 bg-slate-50/70 p-4 animate-fade-in-up">
          <!-- Header Row -->
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3.5">
            <div class="flex items-center gap-2">
              <span class="font-mono text-sm font-bold text-navy-900">
                {{ shipment.trackingNumber }}
              </span>
              <button
                type="button"
                (click)="copyCode(shipment.trackingNumber)"
                class="rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-200/60 hover:text-slate-700"
                title="Copy tracking number"
                aria-label="Copy tracking number"
              >
                <svg lucideCopy class="h-3.5 w-3.5" aria-hidden="true"></svg>
              </button>
            </div>

            <span
              class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
              [class]="statusBadgeClasses(shipment.status)"
            >
              <svg lucideCircleCheck class="h-3.5 w-3.5" aria-hidden="true"></svg>
              {{ shipment.statusLabel }}
            </span>
          </div>

          <!-- Route & Progress -->
          <div class="mt-3.5 grid gap-3 sm:grid-cols-2">
            <div>
              <p class="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                Origin → Destination
              </p>
              <p class="mt-0.5 text-sm font-semibold text-navy-900">
                {{ shipment.origin }} → {{ shipment.destination }}
              </p>
            </div>
            <div>
              <p class="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                Estimated Delivery
              </p>
              <p class="mt-0.5 flex items-center gap-1.5 text-sm font-semibold text-navy-900">
                <svg lucideClock class="h-3.5 w-3.5 text-signal-500" aria-hidden="true"></svg>
                {{ shipment.estimatedDelivery }}
              </p>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="mt-3.5">
            <div class="flex items-center justify-between text-xs text-slate-500">
              <span class="font-medium text-slate-700">{{ shipment.serviceTier }}</span>
              <span>{{ shipment.pieces }} pc · {{ shipment.weight }}</span>
            </div>
            <div class="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                class="h-full rounded-full bg-signal-500 transition-all duration-500"
                [style.width.%]="shipment.progressPercent"
              ></div>
            </div>
          </div>

          <!-- Timeline -->
          <ol class="mt-4 space-y-3 border-t border-slate-200/80 pt-4">
            @for (event of shipment.events; track event.id) {
              <li class="relative flex gap-3 pl-1">
                <span
                  class="mt-1 flex h-2.5 w-2.5 shrink-0 rounded-full ring-4"
                  [class.bg-signal-500]="event.current"
                  [class.ring-signal-500/20]="event.current"
                  [class.bg-slate-400]="!event.current"
                  [class.ring-slate-200]="!event.current"
                ></span>
                <div class="min-w-0 flex-1">
                  <div class="flex flex-wrap items-baseline justify-between gap-x-2">
                    <p
                      class="text-xs font-semibold"
                      [class.text-navy-900]="event.current"
                      [class.text-slate-700]="!event.current"
                    >
                      {{ event.title }}
                    </p>
                    <span class="text-[11px] text-slate-400">{{ event.timestamp }}</span>
                  </div>
                  <p class="mt-0.5 flex items-center gap-1 text-[11px] font-medium text-slate-500">
                    <svg lucideMapPin class="h-3 w-3 text-slate-400" aria-hidden="true"></svg>
                    {{ event.location }}
                  </p>
                </div>
              </li>
            }
          </ol>
        </div>
      }
    </div>
  `,
})
export class ShipmentTrackerComponent {
  protected readonly trackingService = inject(TrackingService);
  private readonly toastService = inject(ToastService);

  protected readonly state = this.trackingService.state;
  protected readonly inputCode = signal(this.trackingService.state().query);

  protected onSearch(): void {
    this.trackingService.lookup(this.inputCode());
  }

  protected selectDemo(code: string): void {
    this.inputCode.set(code);
    this.trackingService.lookup(code);
  }

  protected copyCode(code: string): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    this.toastService.show('Tracking ID copied', `${code} copied to your clipboard.`, 'info', 2500);
  }

  protected statusBadgeClasses(status: ShipmentStatus): string {
    switch (status) {
      case 'delivered':
        return 'bg-emerald-100 text-emerald-800';
      case 'out_for_delivery':
        return 'bg-signal-500/15 text-signal-700';
      case 'in_transit':
        return 'bg-sky-100 text-sky-800';
      case 'exception':
        return 'bg-rose-100 text-rose-800';
      default:
        return 'bg-slate-200 text-slate-700';
    }
  }
}
