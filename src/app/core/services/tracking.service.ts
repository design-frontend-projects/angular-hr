import { Injectable, signal } from '@angular/core';
import { DEMO_TRACKING_IDS, MOCK_SHIPMENTS } from '../data/mock-shipments.data';
import { ShipmentRecord } from '../models/shipping.models';

export interface TrackingState {
  readonly query: string;
  readonly shipment: ShipmentRecord | null;
  readonly error: string | null;
  readonly searched: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TrackingService {
  readonly demoIds = DEMO_TRACKING_IDS;

  private readonly _state = signal<TrackingState>({
    query: 'SR-884120',
    shipment: MOCK_SHIPMENTS['SR-884120'],
    error: null,
    searched: true,
  });

  readonly state = this._state.asReadonly();

  lookup(rawTrackingNumber: string): ShipmentRecord | null {
    const normalized = rawTrackingNumber.trim().toUpperCase();

    if (!normalized) {
      this._state.set({
        query: '',
        shipment: null,
        error: 'Please enter a SwiftRoute tracking number (e.g. SR-884120).',
        searched: true,
      });
      return null;
    }

    const match = MOCK_SHIPMENTS[normalized] ?? null;

    if (!match) {
      this._state.set({
        query: normalized,
        shipment: null,
        error: `No shipment found for "${normalized}". Try one of the demo tracking numbers below.`,
        searched: true,
      });
      return null;
    }

    this._state.set({
      query: normalized,
      shipment: match,
      error: null,
      searched: true,
    });
    return match;
  }

  reset(): void {
    this._state.set({
      query: '',
      shipment: null,
      error: null,
      searched: false,
    });
  }
}
