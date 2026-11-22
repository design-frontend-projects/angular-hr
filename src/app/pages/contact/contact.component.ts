import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  LucideCircleCheck,
  LucideClock,
  LucideHeadphones,
  LucideMail,
  LucideMapPin,
  LucidePhone,
  LucideSend,
} from '@lucide/angular';
import {
  contactFormSchema,
  SERVICE_INTEREST_OPTIONS,
  zodFieldValidator,
} from '../../core/schemas/contact.schema';
import { SeoService } from '../../core/services/seo.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-contact',
  imports: [
    ReactiveFormsModule,
    LucideCircleCheck,
    LucideClock,
    LucideHeadphones,
    LucideMail,
    LucideMapPin,
    LucidePhone,
    LucideSend,
  ],
  template: `
    <!-- Page Header -->
    <section class="bg-navy-900 py-18 text-white lg:py-22">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
          <p class="text-xs font-bold tracking-[0.2em] text-signal-400 uppercase">Contact Us</p>
          <h1 class="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Speak with a SwiftRoute logistics specialist.
          </h1>
          <p class="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
            Need a custom lane quote, enterprise volume pricing, or immediate dispatch support?
            Send us your shipment details and our team responds within 2 business hours.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Contact Content -->
    <section class="bg-slate-50 py-18 lg:py-22">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid gap-10 lg:grid-cols-12">
          <!-- Left Info Column -->
          <div class="space-y-6 lg:col-span-5">
            <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div class="flex items-center gap-3">
                <span
                  class="flex h-10 w-10 items-center justify-center rounded-xl bg-signal-500/10 text-signal-600"
                >
                  <svg lucideHeadphones class="h-5 w-5" aria-hidden="true"></svg>
                </span>
                <div>
                  <h2 class="font-display text-lg font-bold text-navy-900">
                    24/7 Dispatch &amp; Control Tower
                  </h2>
                  <p class="text-xs text-slate-500">Immediate help for active shipments</p>
                </div>
              </div>

              <dl class="mt-6 space-y-4 text-sm">
                <div class="flex items-start gap-3">
                  <svg lucidePhone class="mt-0.5 h-4 w-4 shrink-0 text-signal-500" aria-hidden="true"></svg>
                  <div>
                    <dt class="font-semibold text-navy-900">Toll-Free Dispatch</dt>
                    <dd class="text-slate-600">+1 (800) 555-0194</dd>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <svg lucideMail class="mt-0.5 h-4 w-4 shrink-0 text-signal-500" aria-hidden="true"></svg>
                  <div>
                    <dt class="font-semibold text-navy-900">Quotes &amp; Partnerships</dt>
                    <dd class="text-slate-600">dispatch&#64;swiftroute.example.com</dd>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <svg lucideMapPin class="mt-0.5 h-4 w-4 shrink-0 text-signal-500" aria-hidden="true"></svg>
                  <div>
                    <dt class="font-semibold text-navy-900">Global Headquarters</dt>
                    <dd class="text-slate-600">
                      450 Logistics Parkway, Suite 900, Chicago, IL 60606
                    </dd>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <svg lucideClock class="mt-0.5 h-4 w-4 shrink-0 text-signal-500" aria-hidden="true"></svg>
                  <div>
                    <dt class="font-semibold text-navy-900">Response SLA</dt>
                    <dd class="text-slate-600">Under 2 business hours for freight quotes</dd>
                  </div>
                </div>
              </dl>
            </div>

            <div class="rounded-2xl bg-navy-900 p-6 text-white">
              <p class="text-xs font-bold tracking-wider text-signal-400 uppercase">
                Enterprise Accounts
              </p>
              <h3 class="mt-2 font-display text-lg font-bold">
                Shipping 500+ parcels or pallets per month?
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-slate-300">
                Unlock negotiated air/ocean rates, automated REST webhook tracking, and a dedicated
                operations manager.
              </p>
            </div>
          </div>

          <!-- Right Form Column -->
          <div class="lg:col-span-7">
            <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              @if (submittedReference(); as refCode) {
                <div class="py-8 text-center animate-fade-in-up">
                  <span
                    class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"
                  >
                    <svg lucideCircleCheck class="h-8 w-8" aria-hidden="true"></svg>
                  </span>
                  <h2 class="mt-5 font-display text-2xl font-extrabold text-navy-900">
                    Inquiry Received
                  </h2>
                  <p class="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
                    Thank you! Your request has been logged with our dispatch desk. A SwiftRoute
                    specialist will follow up shortly.
                  </p>
                  <div
                    class="mx-auto mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700"
                  >
                    Reference ID:
                    <span class="font-mono text-navy-900">{{ refCode }}</span>
                  </div>
                  <div class="mt-7">
                    <button
                      type="button"
                      (click)="resetForm()"
                      class="rounded-xl bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-signal-500"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              } @else {
                <h2 class="font-display text-xl font-bold text-navy-900">
                  Request a Quote or Send a Message
                </h2>
                <p class="mt-1 text-sm text-slate-500">
                  All fields marked with * are required. Validated client-side with Zod.
                </p>

                <form
                  [formGroup]="contactForm"
                  (ngSubmit)="onSubmit()"
                  novalidate
                  class="mt-6 space-y-5"
                >
                  <div class="grid gap-5 sm:grid-cols-2">
                    <!-- Full Name -->
                    <div>
                      <label for="fullName" class="block text-sm font-semibold text-navy-900">
                        Full Name *
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        formControlName="fullName"
                        placeholder="Jordan Rivera"
                        class="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-navy-900 placeholder:text-slate-400 focus:border-signal-500 focus:outline-none focus:ring-2 focus:ring-signal-500/20"
                      />
                      @if (fieldError('fullName'); as err) {
                        <p class="mt-1.5 text-xs font-medium text-rose-600">{{ err }}</p>
                      }
                    </div>

                    <!-- Company -->
                    <div>
                      <label for="company" class="block text-sm font-semibold text-navy-900">
                        Company (Optional)
                      </label>
                      <input
                        id="company"
                        type="text"
                        formControlName="company"
                        placeholder="Acme Retail Group"
                        class="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-navy-900 placeholder:text-slate-400 focus:border-signal-500 focus:outline-none focus:ring-2 focus:ring-signal-500/20"
                      />
                      @if (fieldError('company'); as err) {
                        <p class="mt-1.5 text-xs font-medium text-rose-600">{{ err }}</p>
                      }
                    </div>
                  </div>

                  <div class="grid gap-5 sm:grid-cols-2">
                    <!-- Email -->
                    <div>
                      <label for="email" class="block text-sm font-semibold text-navy-900">
                        Work Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        formControlName="email"
                        placeholder="jordan@company.com"
                        class="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-navy-900 placeholder:text-slate-400 focus:border-signal-500 focus:outline-none focus:ring-2 focus:ring-signal-500/20"
                      />
                      @if (fieldError('email'); as err) {
                        <p class="mt-1.5 text-xs font-medium text-rose-600">{{ err }}</p>
                      }
                    </div>

                    <!-- Phone -->
                    <div>
                      <label for="phone" class="block text-sm font-semibold text-navy-900">
                        Phone Number (Optional)
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        formControlName="phone"
                        placeholder="+1 (312) 555-0148"
                        class="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-navy-900 placeholder:text-slate-400 focus:border-signal-500 focus:outline-none focus:ring-2 focus:ring-signal-500/20"
                      />
                      @if (fieldError('phone'); as err) {
                        <p class="mt-1.5 text-xs font-medium text-rose-600">{{ err }}</p>
                      }
                    </div>
                  </div>

                  <!-- Service Interest -->
                  <div>
                    <label for="serviceInterest" class="block text-sm font-semibold text-navy-900">
                      Service Interest *
                    </label>
                    <select
                      id="serviceInterest"
                      formControlName="serviceInterest"
                      class="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-navy-900 focus:border-signal-500 focus:outline-none focus:ring-2 focus:ring-signal-500/20"
                    >
                      @for (opt of serviceOptions; track opt.value) {
                        <option [value]="opt.value">{{ opt.label }}</option>
                      }
                    </select>
                    @if (fieldError('serviceInterest'); as err) {
                      <p class="mt-1.5 text-xs font-medium text-rose-600">{{ err }}</p>
                    }
                  </div>

                  <!-- Message -->
                  <div>
                    <label for="message" class="block text-sm font-semibold text-navy-900">
                      Shipment Details or Message *
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      formControlName="message"
                      placeholder="Tell us your origin, destination, approximate weight/volume, and target delivery timeline..."
                      class="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-navy-900 placeholder:text-slate-400 focus:border-signal-500 focus:outline-none focus:ring-2 focus:ring-signal-500/20"
                    ></textarea>
                    @if (fieldError('message'); as err) {
                      <p class="mt-1.5 text-xs font-medium text-rose-600">{{ err }}</p>
                    }
                  </div>

                  <button
                    type="submit"
                    [disabled]="submitting()"
                    class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-signal-500 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-signal-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <svg lucideSend class="h-4 w-4" aria-hidden="true"></svg>
                    {{ submitting() ? 'Submitting Request...' : 'Submit Shipping Inquiry' }}
                  </button>
                </form>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  private readonly toast = inject(ToastService);

  protected readonly serviceOptions = SERVICE_INTEREST_OPTIONS;
  protected readonly submitting = signal(false);
  protected readonly submittedReference = signal<string | null>(null);

  protected readonly contactForm = this.fb.nonNullable.group({
    fullName: ['', [zodFieldValidator(contactFormSchema.shape.fullName)]],
    company: ['', [zodFieldValidator(contactFormSchema.shape.company)]],
    email: ['', [zodFieldValidator(contactFormSchema.shape.email)]],
    phone: ['', [zodFieldValidator(contactFormSchema.shape.phone)]],
    serviceInterest: [
      'express-air-freight',
      [zodFieldValidator(contactFormSchema.shape.serviceInterest)],
    ],
    message: ['', [zodFieldValidator(contactFormSchema.shape.message)]],
  });

  ngOnInit(): void {
    this.seo.update({
      title: 'Contact Us',
      description:
        'Request a shipping quote or contact SwiftRoute Logistics 24/7 dispatch desk for air freight, ground courier, ocean cargo, and warehousing.',
      path: '/contact',
    });

    const preselectedService = this.route.snapshot.queryParamMap.get('service');
    if (
      preselectedService &&
      this.serviceOptions.some((option) => option.value === preselectedService)
    ) {
      this.contactForm.controls.serviceInterest.setValue(preselectedService);
    }
  }

  protected fieldError(
    fieldName: 'fullName' | 'company' | 'email' | 'phone' | 'serviceInterest' | 'message',
  ): string | null {
    const control = this.contactForm.controls[fieldName];
    if (!control.touched && !control.dirty) {
      return null;
    }
    const err = control.errors?.['zod'];
    return typeof err === 'string' ? err : null;
  }

  protected onSubmit(): void {
    this.contactForm.markAllAsTouched();
    const parsed = contactFormSchema.safeParse(this.contactForm.getRawValue());

    if (!parsed.success) {
      this.toast.show(
        'Please review the form',
        'Fix the highlighted fields before submitting your inquiry.',
        'error',
      );
      return;
    }

    this.submitting.set(true);
    const reference = `SRQ-${Math.floor(100000 + Math.random() * 900000)}`;

    // Client-side mock submission confirmation
    this.submitting.set(false);
    this.submittedReference.set(reference);
    this.toast.show(
      'Inquiry submitted',
      `Reference ${reference} logged. Our logistics desk will respond shortly.`,
      'success',
    );
  }

  protected resetForm(): void {
    this.submittedReference.set(null);
    this.contactForm.reset({
      fullName: '',
      company: '',
      email: '',
      phone: '',
      serviceInterest: 'express-air-freight',
      message: '',
    });
  }
}
