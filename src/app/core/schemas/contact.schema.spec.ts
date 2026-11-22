import { contactFormSchema } from './contact.schema';

describe('contactFormSchema (Zod)', () => {
  it('accepts a valid shipping inquiry payload', () => {
    const result = contactFormSchema.safeParse({
      fullName: 'Jordan Rivera',
      company: 'Acme Retail',
      email: 'jordan@acmeretail.com',
      phone: '+1 (312) 555-0148',
      serviceInterest: 'express-air-freight',
      message: 'We need weekly air freight from Rotterdam to Chicago for 12 pallets.',
    });

    expect(result.success).toBe(true);
  });

  it('rejects an invalid email and too-short message', () => {
    const result = contactFormSchema.safeParse({
      fullName: 'J',
      company: '',
      email: 'not-an-email',
      phone: 'abc',
      serviceInterest: 'express-air-freight',
      message: 'Too short',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const fields = result.error.issues.map((issue) => issue.path[0]);
      expect(fields).toContain('fullName');
      expect(fields).toContain('email');
      expect(fields).toContain('phone');
      expect(fields).toContain('message');
    }
  });
});
