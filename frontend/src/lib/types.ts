export interface ServiceItem {
  id?: string;
  title: string;
  slug: string;
  category: string;
  tagline: string;
  description: string;
  detailedFeatures: string[];
  startingPriceLkr: number;
  estimatedDays: number;
  imageUrl: string;
  iconName: string;
  isActive: boolean;
  order: number;
}

export interface LookbookItem {
  id?: string;
  title: string;
  category: string;
  description: string;
  fabricDetails: string;
  lapelStyle?: string;
  fitType?: string;
  priceLkr?: number;
  isRental: boolean;
  rentalPricePerDayLkr?: number;
  availableSizes: string[];
  imageUrl: string;
  galleryUrls?: string[];
  tags: string[];
  isFeatured: boolean;
  order: number;
}

export interface FabricSwatch {
  id?: string;
  name: string;
  code: string;
  millOrigin: string;
  country: string;
  composition: string;
  weave: string;
  weightGsm: number;
  season: string;
  textureImageUrl: string;
  colorHex: string;
  colorFamily: string;
  inStock: boolean;
  isFeatured: boolean;
  description: string;
}

export interface Appointment {
  id?: string;
  referenceCode?: string;
  customerName: string;
  email: string;
  phone: string;
  serviceType: string;
  fittingLocation: string;
  appointmentDate: string;
  preferredTimeSlot: string;
  fabricInterest?: string;
  estimatedBudgetLkr?: string;
  specialNotes?: string;
  status: string;
  adminNotes?: string;
  createdAt?: string;
}

export interface Inquiry {
  id?: string;
  customerName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  inquiryType: string;
  preferredContactMethod: string;
  status: string;
  createdAt?: string;
}

export interface DashboardStats {
  appointments: {
    total: number;
    pending: number;
    confirmed: number;
    completed: number;
  };
  inquiries: {
    total: number;
    pending: number;
  };
  catalog: {
    lookbookItems: number;
    rentals: number;
    fabrics: number;
  };
  recentAppointments: Appointment[];
  recentInquiries: Inquiry[];
}

export interface UserSession {
  token: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
}
