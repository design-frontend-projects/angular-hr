import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowRight, LucidePackage } from '@lucide/angular';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, LucidePackage, LucideArrowRight],
  template: `
    <section class="flex min-h-[65vh] items-center justify-center bg-slate-50 px-4 py-20">
      <div class="max-w-md text-center">
        <span
          class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-signal-400"
        >
          <svg lucidePackage class="h-7 w-7" aria-hidden="true"></svg>
        </span>
        <p class="mt-6 font-mono text-sm font-bold text-signal-600">404 · ROUTE NOT FOUND</p>
        <h1 class="mt-2 font-display text-3xl font-extrabold text-navy-900">
          This shipment lane doesn't exist
        </h1>
        <p class="mt-3 text-sm leading-relaxed text-slate-600">
          The page you are looking for may have been moved or removed. Return to SwiftRoute Home or
          explore our shipping services.
        </p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            routerLink="/"
            class="inline-flex items-center gap-2 rounded-xl bg-signal-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-signal-600"
          >
            Back to Home
            <svg lucideArrowRight class="h-4 w-4" aria-hidden="true"></svg>
          </a>
          <a
            routerLink="/services"
            class="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-slate-100"
          >
            View Services
          </a>
        </div>
      </div>
    </section>
  `,
})
export class NotFoundComponent implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'Page Not Found',
      description: 'The requested SwiftRoute Logistics page could not be found.',
      path: '/404',
    });
  }
}
