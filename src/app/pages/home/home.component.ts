import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideArrowRight,
  LucideCheck,
  LucidePlane,
  LucideShieldCheck,
  LucideShip,
  LucideTruck,
  LucideWarehouse,
} from '@lucide/angular';
import { COMPANY_STATS, SHIPPING_SERVICES } from '../../core/data/services.data';
import { SeoService } from '../../core/services/seo.service';
import { ShipmentTrackerComponent } from '../../shared/blocks/shipment-tracker/shipment-tracker.component';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    ShipmentTrackerComponent,
    LucideArrowRight,
    LucideCheck,
    LucidePlane,
    LucideShieldCheck,
    LucideShip,
    LucideTruck,
    LucideWarehouse,
  ],
  template: `
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-navy-900 text-white">
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.16),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.10),transparent_45%)]"
      ></div>

      <div class="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div class="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <!-- Left Column -->
          <div class="lg:col-span-6 lg:pt-4">
            <div
              class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-signal-400"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-signal-500"></span>
              Next-Generation Global Logistics Network
            </div>

            <h1
              class="mt-6 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.08]"
            >
              Deliver faster with
              <span class="text-signal-400">precision</span>
              at every mile.
            </h1>

            <p class="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              SwiftRoute connects air, ocean, and express ground networks under one real-time
              control tower—moving mission-critical cargo across 65 countries with 99.4% audited
              on-time reliability.
            </p>

            <div class="mt-8 flex flex-wrap items-center gap-4">
              <a
                routerLink="/contact"
                class="inline-flex items-center gap-2 rounded-xl bg-signal-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-signal-500/25 transition-all hover:bg-signal-600 focus:outline-none focus:ring-2 focus:ring-signal-400 focus:ring-offset-2 focus:ring-offset-navy-900"
              >
                Request Shipping Quote
                <svg lucideArrowRight class="h-4 w-4" aria-hidden="true"></svg>
              </a>
              <a
                routerLink="/services"
                class="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Explore Services
              </a>
            </div>

            <!-- Trust Highlights -->
            <div class="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
              <div>
                <p class="font-display text-2xl font-extrabold text-white sm:text-3xl">99.4%</p>
                <p class="mt-1 text-xs text-slate-400">Audited On-Time</p>
              </div>
              <div>
                <p class="font-display text-2xl font-extrabold text-white sm:text-3xl">180+</p>
                <p class="mt-1 text-xs text-slate-400">Global Hubs</p>
              </div>
              <div>
                <p class="font-display text-2xl font-extrabold text-white sm:text-3xl">24/7</p>
                <p class="mt-1 text-xs text-slate-400">Live Telemetry</p>
              </div>
            </div>
          </div>

          <!-- Right Column: Interactive Shipment Tracker -->
          <div class="lg:col-span-6">
            <app-shipment-tracker />
          </div>
        </div>
      </div>
    </section>

    <!-- Core Services Overview -->
    <section class="bg-white py-20 lg:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div class="max-w-2xl">
            <p class="text-xs font-bold tracking-[0.2em] text-signal-600 uppercase">
              Shipping Solutions
            </p>
            <h2 class="mt-2 font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">
              Built for every lane, weight class, and deadline
            </h2>
          </div>
          <a
            routerLink="/services"
            class="inline-flex items-center gap-1.5 text-sm font-semibold text-signal-600 transition-colors hover:text-signal-700"
          >
            View all 6 services
            <svg lucideArrowRight class="h-4 w-4" aria-hidden="true"></svg>
          </a>
        </div>

        <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          @for (service of featuredServices; track service.slug) {
            <article
              class="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-signal-500/40 hover:shadow-xl hover:shadow-slate-900/5"
            >
              <div
                class="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-signal-400 transition-colors group-hover:bg-signal-500 group-hover:text-white"
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
                  @default {
                    <svg lucideWarehouse class="h-6 w-6" aria-hidden="true"></svg>
                  }
                }
              </div>

              <span class="mt-5 text-[11px] font-bold tracking-wider text-signal-600 uppercase">
                {{ service.categoryLabel }}
              </span>
              <h3 class="mt-1 font-display text-lg font-bold text-navy-900">
                {{ service.title }}
              </h3>
              <p class="mt-2.5 flex-1 text-sm leading-relaxed text-slate-600">
                {{ service.tagline }}
              </p>

              <div class="mt-5 border-t border-slate-100 pt-4">
                <div class="flex items-center justify-between text-xs font-medium text-slate-500">
                  <span>{{ service.transitTime }}</span>
                  <a
                    routerLink="/contact"
                    [queryParams]="{ service: service.slug }"
                    class="inline-flex items-center gap-1 font-semibold text-navy-900 transition-colors group-hover:text-signal-600"
                  >
                    Quote
                    <svg lucideArrowRight class="h-3.5 w-3.5" aria-hidden="true"></svg>
                  </a>
                </div>
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="border-y border-slate-200/80 bg-slate-50 py-20 lg:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <p class="text-xs font-bold tracking-[0.2em] text-signal-600 uppercase">
            How SwiftRoute Works
          </p>
          <h2 class="mt-2 font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">
            From pickup request to verified doorstep delivery
          </h2>
        </div>

        <div class="mt-14 grid gap-8 md:grid-cols-3">
          @for (step of workflowSteps; track step.step) {
            <div class="relative rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div class="flex items-center justify-between">
                <span
                  class="flex h-10 w-10 items-center justify-center rounded-xl bg-signal-500/10 font-display text-sm font-extrabold text-signal-600"
                >
                  {{ step.step }}
                </span>
                <svg lucideCheck class="h-5 w-5 text-emerald-500" aria-hidden="true"></svg>
              </div>
              <h3 class="mt-5 font-display text-lg font-bold text-navy-900">
                {{ step.title }}
              </h3>
              <p class="mt-2.5 text-sm leading-relaxed text-slate-600">
                {{ step.description }}
              </p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Operational Metrics Strip -->
    <section class="bg-white py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          @for (stat of stats; track stat.label) {
            <div class="rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
              <p class="font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">
                {{ stat.value }}
              </p>
              <p class="mt-2 text-sm font-bold text-slate-800">{{ stat.label }}</p>
              <p class="mt-1 text-xs text-slate-500">{{ stat.detail }}</p>
            </div>
          }
        </div>

        <!-- Bottom CTA Banner -->
        <div
          class="mt-16 overflow-hidden rounded-3xl bg-navy-900 px-6 py-12 text-white shadow-2xl sm:px-12 lg:flex lg:items-center lg:justify-between lg:py-14"
        >
          <div class="max-w-2xl">
            <div class="inline-flex items-center gap-2 text-xs font-semibold text-signal-400">
              <svg lucideShieldCheck class="h-4 w-4" aria-hidden="true"></svg>
              Enterprise SLA &amp; Dedicated Account Onboarding
            </div>
            <h2 class="mt-3 font-display text-2xl font-extrabold sm:text-3xl">
              Ready to streamline your shipping operations?
            </h2>
            <p class="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              Speak with a SwiftRoute logistics engineer for custom lane pricing, volume discounts,
              and API integration support.
            </p>
          </div>
          <div class="mt-8 flex flex-wrap gap-3 lg:mt-0 lg:shrink-0">
            <a
              routerLink="/contact"
              class="inline-flex items-center gap-2 rounded-xl bg-signal-500 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-signal-600"
            >
              Talk to Our Team
              <svg lucideArrowRight class="h-4 w-4" aria-hidden="true"></svg>
            </a>
            <a
              routerLink="/about"
              class="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              About SwiftRoute
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HomeComponent implements OnInit {
  private readonly seo = inject(SeoService);

  protected readonly featuredServices = SHIPPING_SERVICES.filter((s) => s.featured);
  protected readonly stats = COMPANY_STATS;

  protected readonly workflowSteps = [
    {
      step: '01',
      title: 'Book & Schedule Pickup',
      description:
        'Generate labels, lock in transparent lane rates, and dispatch a SwiftRoute courier directly to your warehouse or storefront.',
    },
    {
      step: '02',
      title: 'Automated Hub & Customs Transit',
      description:
        'Smart sortation hubs and pre-arrival EDI customs clearance move freight continuously while streaming live telemetry updates.',
    },
    {
      step: '03',
      title: 'Verified Final-Mile Delivery',
      description:
        'Recipients receive accurate delivery windows along with instant digital signatures and photo proof-of-delivery.',
    },
  ] as const;

  ngOnInit(): void {
    this.seo.update({
      title: 'Global Delivery & Freight Solutions',
      description:
        'Track shipments live and ship globally with SwiftRoute Logistics. Express air freight, ground courier, ocean cargo, and 3PL fulfillment across 180+ hubs.',
      path: '/',
    });
  }
}
