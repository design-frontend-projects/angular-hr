import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideClock,
  LucideMail,
  LucideMapPin,
  LucidePackage,
  LucidePhone,
} from '@lucide/angular';

@Component({
  selector: 'app-footer',
  imports: [
    RouterLink,
    LucidePackage,
    LucideMapPin,
    LucidePhone,
    LucideMail,
    LucideClock,
  ],
  template: `
    <footer class="border-t border-white/10 bg-navy-950 text-slate-300">
      <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <!-- Brand Column -->
          <div class="space-y-4">
            <a routerLink="/" class="inline-flex items-center gap-3">
              <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-signal-500 text-white">
                <svg lucidePackage class="h-5 w-5" aria-hidden="true"></svg>
              </span>
              <div class="flex flex-col leading-none">
                <span class="font-display text-lg font-extrabold tracking-tight text-white">
                  Swift<span class="text-signal-400">Route</span>
                </span>
                <span class="mt-0.5 text-[10px] font-semibold tracking-[0.2em] text-slate-400 uppercase">
                  Logistics
                </span>
              </div>
            </a>
            <p class="text-sm leading-relaxed text-slate-400">
              Precision express delivery, global air &amp; ocean freight, and real-time supply chain
              visibility across 180+ distribution hubs worldwide.
            </p>
            <div class="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
              All 180+ Global Hubs Operational
            </div>
          </div>

          <!-- Company Links -->
          <div>
            <h3 class="font-display text-sm font-bold tracking-wider text-white uppercase">
              Company
            </h3>
            <ul class="mt-4 space-y-2.5 text-sm">
              <li>
                <a routerLink="/" class="transition-colors hover:text-signal-400">Home</a>
              </li>
              <li>
                <a routerLink="/about" class="transition-colors hover:text-signal-400">About Us</a>
              </li>
              <li>
                <a routerLink="/services" class="transition-colors hover:text-signal-400">
                  Shipping Services
                </a>
              </li>
              <li>
                <a routerLink="/contact" class="transition-colors hover:text-signal-400">
                  Contact &amp; Quotes
                </a>
              </li>
            </ul>
          </div>

          <!-- Services Links -->
          <div>
            <h3 class="font-display text-sm font-bold tracking-wider text-white uppercase">
              Solutions
            </h3>
            <ul class="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  routerLink="/contact"
                  [queryParams]="{ service: 'express-air-freight' }"
                  class="transition-colors hover:text-signal-400"
                >
                  Express Air Freight
                </a>
              </li>
              <li>
                <a
                  routerLink="/contact"
                  [queryParams]="{ service: 'ground-courier-network' }"
                  class="transition-colors hover:text-signal-400"
                >
                  Ground Courier Network
                </a>
              </li>
              <li>
                <a
                  routerLink="/contact"
                  [queryParams]="{ service: 'ocean-container-cargo' }"
                  class="transition-colors hover:text-signal-400"
                >
                  Ocean &amp; Container Cargo
                </a>
              </li>
              <li>
                <a
                  routerLink="/contact"
                  [queryParams]="{ service: 'warehousing-fulfillment' }"
                  class="transition-colors hover:text-signal-400"
                >
                  Warehousing &amp; 3PL
                </a>
              </li>
              <li>
                <a
                  routerLink="/contact"
                  [queryParams]="{ service: 'cold-chain-logistics' }"
                  class="transition-colors hover:text-signal-400"
                >
                  Cold-Chain Logistics
                </a>
              </li>
            </ul>
          </div>

          <!-- Contact Column -->
          <div>
            <h3 class="font-display text-sm font-bold tracking-wider text-white uppercase">
              24/7 Dispatch Desk
            </h3>
            <ul class="mt-4 space-y-3 text-sm text-slate-400">
              <li class="flex items-start gap-2.5">
                <svg lucideMapPin class="mt-0.5 h-4 w-4 shrink-0 text-signal-400" aria-hidden="true"></svg>
                <span>450 Logistics Parkway, Suite 900, Chicago, IL 60606</span>
              </li>
              <li class="flex items-center gap-2.5">
                <svg lucidePhone class="h-4 w-4 shrink-0 text-signal-400" aria-hidden="true"></svg>
                <span>+1 (800) 555-0194</span>
              </li>
              <li class="flex items-center gap-2.5">
                <svg lucideMail class="h-4 w-4 shrink-0 text-signal-400" aria-hidden="true"></svg>
                <span>dispatch&#64;swiftroute.example.com</span>
              </li>
              <li class="flex items-center gap-2.5">
                <svg lucideClock class="h-4 w-4 shrink-0 text-signal-400" aria-hidden="true"></svg>
                <span>Control Tower Open 24/7/365</span>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row"
        >
          <p>&copy; {{ currentYear }} SwiftRoute Logistics Inc. All rights reserved.</p>
          <div class="flex items-center gap-6">
            <span>ISO 9001 &amp; GDP Certified</span>
            <span>·</span>
            <span>99.4% Audited SLA</span>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  protected readonly currentYear = new Date().getFullYear();
}
