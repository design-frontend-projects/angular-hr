import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { z } from 'zod';

export const SERVICE_INTEREST_OPTIONS = [
  { value: 'express-air-freight', label: 'Express Air Freight' },
  { value: 'ground-courier-network', label: 'Ground Courier Network' },
  { value: 'ocean-container-cargo', label: 'Ocean & Container Cargo' },
  { value: 'warehousing-fulfillment', label: 'Warehousing & Fulfillment' },
  { value: 'cold-chain-logistics', label: 'Cold-Chain Logistics' },
  { value: 'customs-brokerage', label: 'Customs Brokerage' },
  { value: 'general-inquiry', label: 'General Inquiry' },
] as const;

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Please enter your full name (at least 2 characters).')
    .max(100, 'Name must be 100 characters or fewer.'),
  company: z
    .string()
    .trim()
    .max(120, 'Company name must be 120 characters or fewer.')
    .optional()
    .or(z.literal('')),
  email: z
    .string()
    .trim()
    .email('Please enter a valid business or personal email address.'),
  phone: z
    .string()
    .trim()
    .refine(
      (val) => val === '' || /^[+\d\s().-]{7,25}$/.test(val),
      'Please enter a valid phone number.',
    ),
  serviceInterest: z
    .string()
    .trim()
    .min(1, 'Please select a shipping service.'),
  message: z
    .string()
    .trim()
    .min(15, 'Please share at least 15 characters about your shipment or inquiry.')
    .max(2000, 'Message must be 2,000 characters or fewer.'),
});

export type ContactFormPayload = z.infer<typeof contactFormSchema>;

export function zodFieldValidator<T extends z.ZodTypeAny>(schema: T): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const result = schema.safeParse(control.value ?? '');
    if (result.success) {
      return null;
    }
    const firstIssue = result.error.issues[0];
    return {
      zod: firstIssue?.message ?? 'Invalid value.',
    };
  };
}
