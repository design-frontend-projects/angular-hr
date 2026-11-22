import {
  CompanyStat,
  CoreValue,
  HubLocation,
  ShippingServiceItem,
} from '../models/shipping.models';

export const SHIPPING_SERVICES: readonly ShippingServiceItem[] = [
  {
    slug: 'express-air-freight',
    title: 'Express Air Freight',
    category: 'freight',
    categoryLabel: 'Air Freight',
    tagline: 'Next-flight-out priority air cargo for urgent global supply chains.',
    description:
      'Direct airport-to-door air logistics with guaranteed uplift capacity across 120+ international gateways and real-time flight milestone telemetry.',
    transitTime: '1–3 Business Days',
    slaGuarantee: '99.6% On-Time SLA',
    features: [
      'Priority charter & commercial uplift allocation',
      'Door-to-door customs pre-clearance included',
      'GPS & shock-sensor telemetry available',
    ],
    icon: 'plane',
    featured: true,
  },
  {
    slug: 'ground-courier-network',
    title: 'Ground Courier Network',
    category: 'courier',
    categoryLabel: 'Express Courier',
    tagline: 'Same-day metro and next-day regional parcel & LTL delivery.',
    description:
      'High-frequency scheduled linehaul and last-mile electric fleets connecting urban centers, warehouses, and retail storefronts with live proof-of-delivery.',
    transitTime: 'Same Day – 48 Hours',
    slaGuarantee: '99.4% On-Time SLA',
    features: [
      'Live recipient ETA windows & photo POD',
      'Automated API label & manifest generation',
      'Low-emission EV urban delivery fleet',
    ],
    icon: 'truck',
    featured: true,
  },
  {
    slug: 'ocean-container-cargo',
    title: 'Ocean & Container Cargo',
    category: 'freight',
    categoryLabel: 'Ocean Freight',
    tagline: 'Cost-efficient FCL and LCL maritime shipping across major trade lanes.',
    description:
      'Flexible full-container and consolidated ocean freight backed by direct carrier allocations, port drayage, and end-to-end container visibility.',
    transitTime: '12–28 Days (Port-to-Port)',
    slaGuarantee: 'Fixed Weekly Sailings',
    features: [
      'FCL (20ft / 40ft / High Cube) & LCL consolidation',
      'Automated bill-of-lading & port drayage',
      'Container-level vessel tracking & delay alerts',
    ],
    icon: 'ship',
    featured: true,
  },
  {
    slug: 'warehousing-fulfillment',
    title: 'Warehousing & Fulfillment',
    category: 'fulfillment',
    categoryLabel: 'Fulfillment',
    tagline: 'Strategic multi-hub inventory storage, pick-pack, and 3PL dispatch.',
    description:
      'Position inventory closer to customers across our 180+ smart hubs with real-time WMS sync, same-day order cutoff, and streamlined reverse logistics.',
    transitTime: 'Same-Day Pick & Pack',
    slaGuarantee: '99.92% Order Accuracy',
    features: [
      'Real-time ERP & e-commerce inventory sync',
      'Custom kitting, labeling & returns processing',
      '24/7 biometric security & climate monitoring',
    ],
    icon: 'warehouse',
    featured: true,
  },
  {
    slug: 'cold-chain-logistics',
    title: 'Cold-Chain Logistics',
    category: 'courier',
    categoryLabel: 'Specialized',
    tagline: 'GDP-compliant temperature-controlled shipping for pharma & perishables.',
    description:
      'Unbroken thermal integrity from -20°C to +25°C with continuous IoT temperature logging, active thermal containers, and proactive excursion alerts.',
    transitTime: '24–72 Hours Globally',
    slaGuarantee: 'GDP & ISO 9001 Certified',
    features: [
      'Continuous IoT thermal telemetry & audit logs',
      'Validated dry-ice & active reefers',
      'Dedicated 24/7 clinical & perishable desk',
    ],
    icon: 'snowflake',
  },
  {
    slug: 'customs-brokerage',
    title: 'Customs Brokerage',
    category: 'fulfillment',
    categoryLabel: 'Trade Compliance',
    tagline: 'Frictionless cross-border clearance and tariff compliance.',
    description:
      'Licensed customs specialists and automated EDI filing eliminate border bottlenecks, optimize HS classifications, and ensure full regulatory compliance.',
    transitTime: 'Pre-Arrival Clearance',
    slaGuarantee: '98.9% First-Pass Release',
    features: [
      'HS tariff classification & duty optimization',
      'Digital commercial invoice & COO validation',
      'Importer-of-record & bonded transit support',
    ],
    icon: 'file-check',
  },
];

export const COMPANY_STATS: readonly CompanyStat[] = [
  {
    value: '99.4%',
    label: 'On-Time Delivery Rate',
    detail: 'Audited across 14.2M annual shipments',
  },
  {
    value: '180+',
    label: 'Global Sorting Hubs',
    detail: 'Connected across 65 countries',
  },
  {
    value: '24/7',
    label: 'Live Control Tower',
    detail: 'Proactive route & customs monitoring',
  },
  {
    value: '4.9/5',
    label: 'Enterprise CSAT',
    detail: 'Trusted by 3,400+ B2B shippers',
  },
];

export const CORE_VALUES: readonly CoreValue[] = [
  {
    title: 'Radical Transparency',
    description:
      'Every parcel and pallet emits real-time scan telemetry so you and your customers never guess where cargo stands.',
    icon: 'globe',
  },
  {
    title: 'Relentless Reliability',
    description:
      'Redundant carrier capacity and automated rerouting keep your supply chain moving even during peak surges.',
    icon: 'shield-check',
  },
  {
    title: 'Precision Velocity',
    description:
      'AI-assisted hub sorting and pre-arrival customs filing shave hours off every cross-border milestone.',
    icon: 'clock',
  },
  {
    title: 'Responsible Transit',
    description:
      'Over 60% of our urban last-mile fleet is electric, with certified carbon-inset options on air and ocean lanes.',
    icon: 'leaf',
  },
];

export const HUB_LOCATIONS: readonly HubLocation[] = [
  {
    region: 'North America',
    city: 'Chicago, Illinois',
    code: 'ORD-01',
    role: 'Americas Headquarters & Air/Ground Superhub',
    capacity: '480,000 sq ft · Automated Sortation',
  },
  {
    region: 'Europe',
    city: 'Rotterdam, Netherlands',
    code: 'RTM-02',
    role: 'EMEA Maritime & Cross-Border Gateway',
    capacity: '390,000 sq ft · Bonded Customs Zone',
  },
  {
    region: 'Middle East & Africa',
    city: 'Dubai, UAE',
    code: 'DXB-03',
    role: 'Intercontinental Air Bridge & Cold-Chain Hub',
    capacity: '260,000 sq ft · GDP Cold Storage',
  },
  {
    region: 'Asia-Pacific',
    city: 'Singapore',
    code: 'SIN-04',
    role: 'APAC Consolidation & E-Commerce Fulfillment',
    capacity: '340,000 sq ft · 24/7 Port Access',
  },
];
