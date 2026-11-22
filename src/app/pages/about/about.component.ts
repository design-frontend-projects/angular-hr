import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideArrowRight,
  LucideClock,
  LucideGlobe,
  LucideLeaf,
  LucideMapPin,
  LucideShieldCheck,
} from '@lucide/angular';
import {
  COMPANY_STATS,
  CORE_VALUES,
  HUB_LOCATIONS,
} from '../../core/data/services.data';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-about',
  imports: [
    RouterLink,
    LucideArrowRight,
    LucideClock,
    LucideGlobe,
    LucideLeaf,
    LucideMapPin,
    LucideShieldCheck,
  ],
  template: `
    <!-- Page Header -->
    <section class="bg-navy-900 py-18 text-white lg:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
          <p class="text-xs font-bold tracking-[0.2em] text-signal-400 uppercase">
            About SwiftRoute Logistics
          </p>
          <h1 class="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Engineered to make global shipping predictable.
          </h1>
          <p class="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
            Founded by supply-chain operators and systems engineers, SwiftRoute replaces fragmented
            freight handoffs with a unified, telemetry-driven delivery network spanning 65 countries.
          </p>
        </div>
      </div>
    </section>

    <!-- Mission & Story -->
    <section class="bg-white py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid items-center gap-12 lg:grid-cols-12">
          <div class="lg:col-span-7">
            <p class="text-xs font-bold tracking-[0.2em] text-signal-600 uppercase">Our Story</p>
            <h2 class="mt-2 font-display text-3xl font-extrabold text-navy-900">
              Eliminating blind spots across modern supply chains
            </h2>
            <p class="mt-5 text-base leading-relaxed text-slate-600">
              Traditional shipping forces businesses to stitch together separate couriers, customs
              brokers, and regional warehouses—leading to missed SLAs and frustrated customers.
            </p>
            <p class="mt-4 text-base leading-relaxed text-slate-600">
              At SwiftRoute, every hub, linehaul flight, and last-mile electric van reports into a
              single 24/7 Control Tower. When weather or port congestion threatens a lane, our
              routing engine proactively re-allocates capacity before delays ever reach your
              recipients.
            </p>
          </div>

          <div class="grid grid-cols-2 gap-4 lg:col-span-5">
            @for (stat of stats; track stat.label) {
              <div class="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p class="font-display text-2xl font-extrabold text-navy-900 sm:text-3xl">
                  {{ stat.value }}
                </p>
                <p class="mt-1.5 text-xs font-bold text-slate-800">{{ stat.label }}</p>
                <p class="mt-1 text-[11px] leading-relaxed text-slate-500">{{ stat.detail }}</p>
              </div>
            }
          </div>
        </div>
      </div>
    </section>

    <!-- Core Values -->
    <section class="border-y border-slate-200/80 bg-slate-50 py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="max-w-2xl">
          <p class="text-xs font-bold tracking-[0.2em] text-signal-600 uppercase">Our Principles</p>
          <h2 class="mt-2 font-display text-3xl font-extrabold text-navy-900">
            What drives every shipment we move
          </h2>
        </div>

        <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          @for (value of values; track value.title) {
            <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-signal-500/10 text-signal-600"
              >
                @switch (value.icon) {
                  @case ('globe') {
                    <svg lucideGlobe class="h-5 w-5" aria-hidden="true"></svg>
                  }
                  @case ('shield-check') {
                    <svg lucideShieldCheck class="h-5 w-5" aria-hidden="true"></svg>
                  }
                  @case ('clock') {
                    <svg lucideClock class="h-5 w-5" aria-hidden="true"></svg>
                  }
                  @default {
                    <svg lucideLeaf class="h-5 w-5" aria-hidden="true"></svg>
                  }
                }
              </span>
              <h3 class="mt-4 font-display text-lg font-bold text-navy-900">{{ value.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-slate-600">{{ value.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Global Distribution Hubs -->
    <section class="bg-white py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div class="max-w-2xl">
            <p class="text-xs font-bold tracking-[0.2em] text-signal-600 uppercase">
              Strategic Infrastructure
            </p>
            <h2 class="mt-2 font-display text-3xl font-extrabold text-navy-900">
              Flagship intercontinental superhubs
            </h2>
          </div>
          <a
            routerLink="/contact"
            class="inline-flex items-center gap-1.5 text-sm font-semibold text-signal-600 hover:text-signal-700"
          >
            Partner with our network
            <svg lucideArrowRight class="h-4 w-4" aria-hidden="true"></svg>
          </a>
        </div>

        <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          @for (hub of hubs; track hub.code) {
            <div class="rounded-2xl border border-slate-200 bg-white p-6">
              <div class="flex items-center justify-between">
                <span class="text-xs font-semibold text-signal-600">{{ hub.region }}</span>
                <span
                  class="rounded-md bg-navy-900 px-2 py-0.5 font-mono text-[11px] font-bold text-white"
                >
                  {{ hub.code }}
                </span>
              </div>
              <h3 class="mt-3 flex items-center gap-1.5 font-display text-lg font-bold text-navy-900">
                <svg lucideMapPin class="h-4 w-4 text-signal-500" aria-hidden="true"></svg>
                {{ hub.city }}
              </h3>
              <p class="mt-2 text-sm text-slate-600">{{ hub.role }}</p>
              <p class="mt-4 border-t border-slate-100 pt-3 text-xs font-medium text-slate-500">
                {{ hub.capacity }}
              </p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent implements OnInit {
  private readonly seo = inject(SeoService);

  protected readonly stats = COMPANY_STATS;
  protected readonly values = CORE_VALUES;
  protected readonly hubs = HUB_LOCATIONS;

  ngOnInit(): void {
    this.seo.update({
      title: 'About Us',
      description:
        'Learn how SwiftRoute Logistics powers 180+ global sorting hubs with real-time telemetry, electric last-mile fleets, and 99.4% audited on-time delivery.',
      path: '/about',
    });
  }
}
