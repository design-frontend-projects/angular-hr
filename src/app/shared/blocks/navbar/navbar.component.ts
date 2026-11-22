import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  LucideArrowRight,
  LucideMenu,
  LucidePackage,
  LucideX,
} from '@lucide/angular';

interface NavLinkItem {
  readonly label: string;
  readonly path: string;
  readonly exact: boolean;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, LucidePackage, LucideMenu, LucideX, LucideArrowRight],
  template: `
    <header class="sticky top-0 z-40 border-b border-white/10 bg-navy-900/95 backdrop-blur-md">
      <div class="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <!-- Brand Logo -->
        <a
          routerLink="/"
          (click)="closeMenu()"
          class="group flex items-center gap-3 focus:outline-none"
        >
          <span
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-signal-500 text-white shadow-lg shadow-signal-500/25 transition-transform duration-200 group-hover:scale-105"
          >
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

        <!-- Desktop Navigation -->
        <nav aria-label="Main navigation" class="hidden items-center gap-1 md:flex">
          @for (item of navLinks; track item.path) {
            <a
              [routerLink]="item.path"
              routerLinkActive="bg-white/10 text-white"
              [routerLinkActiveOptions]="{ exact: item.exact }"
              class="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              {{ item.label }}
            </a>
          }
        </nav>

        <!-- Desktop CTA -->
        <div class="hidden items-center gap-3 md:flex">
          <a
            routerLink="/"
            fragment="track-shipment"
            class="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            Track Shipment
          </a>
          <a
            routerLink="/contact"
            class="inline-flex items-center gap-2 rounded-lg bg-signal-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-signal-500/30 transition-all hover:bg-signal-600 focus:outline-none focus:ring-2 focus:ring-signal-400 focus:ring-offset-2 focus:ring-offset-navy-900"
          >
            Get a Quote
            <svg lucideArrowRight class="h-4 w-4" aria-hidden="true"></svg>
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button
          type="button"
          (click)="toggleMenu()"
          [attr.aria-expanded]="mobileMenuOpen()"
          aria-controls="mobile-nav"
          aria-label="Toggle navigation menu"
          class="inline-flex items-center justify-center rounded-lg p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white md:hidden"
        >
          @if (mobileMenuOpen()) {
            <svg lucideX class="h-6 w-6" aria-hidden="true"></svg>
          } @else {
            <svg lucideMenu class="h-6 w-6" aria-hidden="true"></svg>
          }
        </button>
      </div>

      <!-- Mobile Drawer -->
      @if (mobileMenuOpen()) {
        <div id="mobile-nav" class="border-t border-white/10 bg-navy-950 px-4 pt-3 pb-5 md:hidden">
          <nav aria-label="Mobile navigation" class="flex flex-col gap-1">
            @for (item of navLinks; track item.path) {
              <a
                [routerLink]="item.path"
                routerLinkActive="bg-white/10 text-white"
                [routerLinkActiveOptions]="{ exact: item.exact }"
                (click)="closeMenu()"
                class="rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                {{ item.label }}
              </a>
            }
          </nav>
          <div class="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4">
            <a
              routerLink="/"
              fragment="track-shipment"
              (click)="closeMenu()"
              class="rounded-lg border border-white/15 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-white/5"
            >
              Track Shipment
            </a>
            <a
              routerLink="/contact"
              (click)="closeMenu()"
              class="inline-flex items-center justify-center gap-2 rounded-lg bg-signal-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-signal-600"
            >
              Get a Quote
              <svg lucideArrowRight class="h-4 w-4" aria-hidden="true"></svg>
            </a>
          </div>
        </div>
      }
    </header>
  `,
})
export class NavbarComponent {
  protected readonly mobileMenuOpen = signal(false);

  protected readonly navLinks: readonly NavLinkItem[] = [
    { label: 'Home', path: '/', exact: true },
    { label: 'Services', path: '/services', exact: false },
    { label: 'About Us', path: '/about', exact: false },
    { label: 'Contact Us', path: '/contact', exact: false },
  ];

  protected toggleMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
