import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideArrowRight,
  LucideCheck,
  LucideClock,
  LucideFileCheck,
  LucidePlane,
  LucideShieldCheck,
  LucideShip,
  LucideSnowflake,
  LucideTruck,
  LucideWarehouse,
} from '@lucide/angular';
import { SHIPPING_SERVICES } from '../../core/data/services.data';
import { ServiceCategory } from '../../core/models/shipping.models';
import { SeoService } from '../../core/services/seo.service';

interface CategoryFilter {
  readonly id: ServiceCategory;
  readonly label: string;
}

@Component({
  selector: 'app-services',
  imports: [
    RouterLink,
    LucideArrowRight,
    LucideCheck,
    LucideClock,
    LucideFileCheck,
    LucidePlane,
    LucideShieldCheck,
    LucideShip,
    LucideSnowflake,
    LucideTruck,
    LucideWarehouse,
  ],
  template: `
    <!-- Page Header -->
    <section class="bg-navy-900 py-18 text-white lg:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
          <p class="text-xs font-bold tracking-[0.2em] text-signal-400 uppercase">
            Shipping &amp; Freight Services
          </p>
          <h1 class="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            End-to-end logistics tailored to your cargo.
          </h1>
          <p class="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
            From urgent next-flight-out air parcels to full-container ocean freight and GDP
            cold-chain transport, every lane is backed by transparent SLAs and 24/7 telemetry.
          </p>
        </div>

        <!-- Category Filters -->
        <div class="mt-10 flex flex-wrap gap-2.5" role="tablist" aria-label="Filter services">
          @for (filter of filters; track filter.id) {
            <button
              type="button"
              role="tab"
              [attr.aria-selected]="selectedCategory() === filter.id"
              (click)="selectedCategory.set(filter.id)"
              class="rounded-xl px-4 py-2 text-sm font-semibold transition-all"
              [class.bg-signal-500]="selectedCategory() === filter.id"
              [class.text-white]="selectedCategory() === filter.id"
              [class.shadow-md]="selectedCategory() === filter.id"
              [class.bg-white/10]="selectedCategory() !== filter.id"
              [class.text-slate-300]="selectedCategory() !== filter.id"
              [class.hover:bg-white/15]="selectedCategory() !== filter.id"
            >
              {{ filter.label }}
            </button>
          }
        </div>
      </div>
    </section>

    <!-- Services Catalog -->
    <section class="bg-slate-50 py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          @for (service of filteredServices(); track service.slug) {
            <article
              class="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-signal-500/40 hover:shadow-xl hover:shadow-slate-900/5 animate-fade-in-up"
            >
              <div class="flex items-start justify-between gap-4">
                <div
                  class="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-signal-400"
                >
                  @switch (service.icon) {
                    @case ('plane') {
                      <svg lucidePlane class="h-6 w-6" aria-hidden="true"></svg>
                    }
                    @case ('truck') {
                      <svg lucideTruck class="h-6 w-6" aria-hidden="true"></svg>
                    }
                    @case ('ship') {
                      <svg lucideShip class="h-6 w-6" aria-hidden="true"></svg>
                    }
                    @case ('warehouse') {
                      <svg lucideWarehouse class="h-6 w-6" aria-hidden="true"></svg>
                    }
                    @case ('snowflake') {
                      <svg lucideSnowflake class="h-6 w-6" aria-hidden="true"></svg>
                    }
                    @default {
                      <svg lucideFileCheck class="h-6 w-6" aria-hidden="true"></svg>
                    }
                  }
                </div>

                <span
                  class="rounded-full bg-signal-500/10 px-3 py-1 text-xs font-semibold text-signal-700"
                >
                  {{ service.categoryLabel }}
                </span>
              </div>

              <h2 class="mt-5 font-display text-xl font-bold text-navy-900">
                {{ service.title }}
              </h2>
              <p class="mt-2.5 text-sm leading-relaxed text-slate-600">
                {{ service.description }}
              </p>

              <!-- SLA Badges -->
              <div class="mt-5 flex flex-wrap gap-2">
                <span
                  class="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700"
                >
                  <svg lucideClock class="h-3.5 w-3.5 text-signal-500" aria-hidden="true"></svg>
                  {{ service.transitTime }}
                </span>
                <span
                  class="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700"
                >
                  <svg lucideShieldCheck class="h-3.5 w-3.5" aria-hidden="true"></svg>
                  {{ service.slaGuarantee }}
                </span>
              </div>

              <!-- Feature List -->
              <ul class="mt-5 flex-1 space-y-2.5 border-t border-slate-100 pt-5 text-sm text-slate-600">
                @for (feature of service.features; track feature) {
                  <li class="flex items-start gap-2.5">
                    <svg
                      lucideCheck
                      class="mt-0.5 h-4 w-4 shrink-0 text-signal-500"
                      aria-hidden="true"
                    ></svg>
                    <span>{{ feature }}</span>
                  </li>
                }
              </ul>

              <div class="mt-6 pt-2">
                <a
                  routerLink="/contact"
                  [queryParams]="{ service: service.slug }"
                  class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-signal-500"
                >
                  Request Custom Quote
                  <svg lucideArrowRight class="h-4 w-4" aria-hidden="true"></svg>
                </a>
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- Industries Served -->
    <section class="bg-white py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <p class="text-xs font-bold tracking-[0.2em] text-signal-600 uppercase">
            Industry Verticals
          </p>
          <h2 class="mt-2 font-display text-3xl font-extrabold text-navy-900">
            Specialized compliance for high-stakes sectors
          </h2>
        </div>

        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          @for (industry of industries; track industry.name) {
            <div class="rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
              <h3 class="font-display text-base font-bold text-navy-900">{{ industry.name }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-slate-600">{{ industry.summary }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class ServicesComponent implements OnInit {
  private readonly seo = inject(SeoService);

  protected readonly selectedCategory = signal<ServiceCategory>('all');

  protected readonly filters: readonly CategoryFilter[] = [
    { id: 'all', label: 'All Services' },
    { id: 'freight', label: 'Air & Ocean Freight' },
    { id: 'courier', label: 'Express & Cold-Chain' },
    { id: 'fulfillment', label: 'Warehousing & Customs' },
  ];

  protected readonly filteredServices = computed(() => {
    const active = this.selectedCategory();
    if (active === 'all') {
      return SHIPPING_SERVICES;
    }
    return SHIPPING_SERVICES.filter((service) => service.category === active);
  });

  protected readonly industries = [
    {
      name: 'E-Commerce & Retail',
      summary: 'Same-day fulfillment cutoffs, branded tracking pages, and effortless returns.',
    },
    {
      name: 'Healthcare & Pharma',
      summary: 'GDP-certified cold chain with continuous 2–8°C IoT audit trails.',
    },
    {
      name: 'Industrial Manufacturing',
      summary: 'Just-in-time air charters and heavy LTL/FCL component replenishment.',
    },
    {
      name: 'High-Value Electronics',
      summary: 'Tamper-evident chain-of-custody, bonded transit, and full cargo insurance.',
    },
  ] as const;

  ngOnInit(): void {
    this.seo.update({
      title: 'Shipping & Freight Services',
      description:
        'Explore SwiftRoute Logistics services: Express Air Freight, Ground Courier, Ocean Cargo, 3PL Warehousing, Cold-Chain Logistics, and Customs Brokerage.',
      path: '/services',
    });
  }
}
