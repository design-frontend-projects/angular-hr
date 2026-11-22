import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should render the contact form and validate required fields on submit', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
    expect(form).toBeTruthy();

    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Please enter your full name');
    expect(fixture.nativeElement.textContent).toContain('Please enter a valid business');
  });

  it('should show confirmation reference when valid inquiry is submitted', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      contactForm: {
        setValue: (val: Record<string, string>) => void;
      };
      onSubmit: () => void;
    };

    component.contactForm.setValue({
      fullName: 'Alex Morgan',
      company: 'Nordic Goods',
      email: 'alex@nordicgoods.io',
      phone: '+44 20 7946 0958',
      serviceInterest: 'ocean-container-cargo',
      message: 'Looking for monthly 40ft container shipping from Rotterdam to New York.',
    });

    component.onSubmit();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Inquiry Received');
    expect(fixture.nativeElement.textContent).toContain('SRQ-');
  });
});
