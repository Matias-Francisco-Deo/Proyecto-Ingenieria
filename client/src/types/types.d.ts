export interface SignInError {
    error: string;
}

export interface UserInfo {
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
