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

type PendingPetition = {
  id: number;
  name: string;
  description: string;
  ubication: string;
  price: number;
  date_start: string;
  date_end: string;
  capacity: number;
  client_name: string;
  client_email: string;
};

type ApproveResponse = {
  id: number;
  error?: string;
};
