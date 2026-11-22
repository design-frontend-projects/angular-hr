export type ShipmentStatus =
  | 'label_created'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered'
  | 'exception';

export interface TrackingEvent {
  readonly id: string;
  readonly timestamp: string;
  readonly location: string;
  readonly title: string;
  readonly description: string;
  readonly completed: boolean;
  readonly current?: boolean;
}

export interface ShipmentRecord {
  readonly trackingNumber: string;
  readonly status: ShipmentStatus;
  readonly statusLabel: string;
  readonly origin: string;
  readonly destination: string;
  readonly estimatedDelivery: string;
  readonly serviceTier: string;
  readonly weight: string;
  readonly pieces: number;
  readonly progressPercent: number;
  readonly events: readonly TrackingEvent[];
}

export type ServiceCategory = 'all' | 'freight' | 'courier' | 'fulfillment';

export interface ShippingServiceItem {
  readonly slug: string;
  readonly title: string;
  readonly category: Exclude<ServiceCategory, 'all'>;
  readonly categoryLabel: string;
  readonly tagline: string;
  readonly description: string;
  readonly transitTime: string;
  readonly slaGuarantee: string;
  readonly features: readonly string[];
  readonly icon:
    | 'plane'
    | 'truck'
    | 'ship'
    | 'warehouse'
    | 'snowflake'
    | 'file-check';
  readonly featured?: boolean;
}

export interface CompanyStat {
  readonly value: string;
  readonly label: string;
  readonly detail: string;
}

export interface CoreValue {
  readonly title: string;
  readonly description: string;
  readonly icon: 'shield-check' | 'clock' | 'globe' | 'leaf';
}

export interface HubLocation {
  readonly region: string;
  readonly city: string;
  readonly code: string;
  readonly role: string;
  readonly capacity: string;
}

export interface SeoMetadata {
  readonly title: string;
  readonly description: string;
  readonly path: string;
}

export type ToastVariant = 'success' | 'error' | 'info';

export interface ToastMessage {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly variant: ToastVariant;
}
