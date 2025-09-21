export interface SignInError {
  error: string;
}

export interface UserInfo {
  id: number;
  username: string;
  key: string;
  error?: string;
}

export interface Inmueble {
  id: number;
  name: string;
  ubication: string;
  price: number;
  nameDelDuenio: string;
  email: string;
  error?: string;
}

export interface PeticionPendiente {
  id: number;
  client_name: string;
  requested_date_start: string; // con hora
  requested_date_end: string; // con hora
  property_name: string;
  created_date: string;
  event_date: string;
  error?: string;
}
