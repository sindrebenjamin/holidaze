// Login

export interface LoggedInUserResponse {
  data: User;
  meta: Record<string, unknown>;
}

export interface User {
  name: string;
  email: string;
  bio: string;
  avatar: MediaItem;
  banner: MediaItem;
  accessToken: string;
  venueManager: boolean;
}

// Booking

export interface BookingResponse {
  data: BookingData;
  meta: Record<string, unknown>;
}

interface BookingData {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue: Venue;
  customer: Customer;
}

// Venue

export interface VenueResponse {
  data: VenueData;
  meta: Record<string, unknown>;
}

interface VenueData {
  id: string;
  name: string;
  description: string;
  media: MediaItem[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: VenueMeta;
  location: Location;
  bookings: Booking[];
  _count: Count;
}

// Profile

export interface ProfileResponse {
  data: ProfileData;
  meta: Record<string, unknown>;
}

interface ProfileData {
  name: string;
  email: string;
  bio: string;
  avatar: MediaItem;
  banner: MediaItem;
  venueManager: boolean;
  venues: Venue[];
  bookings: Booking[];
  _count: Count;
}

// Shared interfaces

interface MediaItem {
  url: string;
  alt: string;
}

interface VenueMeta {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

interface Location {
  address: string | null;
  city: string | null;
  zip: string | null;
  country: string | null;
  continent: string | null;
  lat: number | null;
  lng: number | null;
}

interface Customer extends Person {}

interface Person {
  name: string;
  email: string;
  bio: string | null;
  avatar: MediaItem;
  banner: MediaItem;
}

interface Venue {
  id: string;
  name: string;
  description: string;
  media: MediaItem[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: VenueMeta;
  location: Location | null;
}

interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue: Venue;
}

interface Count {
  venues: number;
  bookings: number;
}

// Local

export interface ApiOptions {
  method: string;
  headers: HeadersInit;
  body?: string;
}

export interface FormData {
  name: string;
  email: string;
  password: string;
}

interface ApiError {
  message: string;
}

export type ApiStatus =
  | "idle"
  | "loading"
  | "success"
  | "error"
  | { errors: ApiError[]; status: string; statusCode: number };
