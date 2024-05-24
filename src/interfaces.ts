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
  bookings: Booking[];
}

// Booking

export interface BookingResponse {
  data: BookingData;
  meta: Record<string, unknown>;
}

export interface BookingData {
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
  data: Venue[];
  meta: Record<string, unknown>;
}

export interface SingleVenueResponse {
  data: Venue;
  meta: Record<string, unknown>;
}

// Profile

export interface ProfileResponse {
  data: ProfileData;
  meta: Record<string, unknown>;
}

export interface ProfileData {
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

export interface MediaItem {
  alt: string;
  url: string;
}

interface VenueMeta {
  [key: string]: boolean;
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

export interface Venue {
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
  bookings: BookingData[];
  _count: Count;
  owner: Person;
}

export interface Booking {
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

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface VenueFormData {
  address: string;
  city?: string;
  zip?: string;
  country?: string;
  continent?: string;
  title: string;
  description?: string;
  price: number;
}

export interface ApiError {
  message: string;
}

export type ApiStatus =
  | "idle"
  | "loading"
  | "success"
  | "error"
  | { errors: ApiError[]; status: string; statusCode: number };
