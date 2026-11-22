import { TestBed } from '@angular/core/testing';
import { TrackingService } from './tracking.service';

describe('TrackingService', () => {
  let service: TrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackingService);
  });

  it('should normalize lowercase and whitespace when looking up a valid tracking ID', () => {
    const result = service.lookup('  sr-552910  ');
    expect(result).not.toBeNull();
    expect(result?.trackingNumber).toBe('SR-552910');
    expect(result?.status).toBe('delivered');
    expect(service.state().error).toBeNull();
  });

  it('should return null and set an error for an unknown tracking ID', () => {
    const result = service.lookup('SR-000000');
    expect(result).toBeNull();
    expect(service.state().shipment).toBeNull();
    expect(service.state().error).toContain('No shipment found');
  });

  it('should return an error when tracking number is empty', () => {
    const result = service.lookup('   ');
    expect(result).toBeNull();
    expect(service.state().error).toContain('Please enter a SwiftRoute tracking number');
  });
});
