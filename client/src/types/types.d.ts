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

export interface PendingPetitionDraft {
    id: number;
    client_name: string;
    client_email: string;
    price: number;
    requested_date_start: string; // con hora
    requested_date_end: string; // con hora
    property_name: string;
    created_date: string;
    event_date: string;
    error?: string;
}

export interface CancelledRejectedPetitionDraft {
    id: number;
    client_name: string;
    client_email: string;
    price: number;
    requested_date_start: string; // con hora
    requested_date_end: string; // con hora
    property_name: string;
    created_date: string;
    event_date: string;
    rejection_motive?: string;
    error?: string;
}

export interface PendingPetition {
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
}

export interface ErrorResponse {
    error?: string;
}

export interface Inmueble {
    id: number;
    name: string;
    description: string;
    ubication: string;
    price: number; // precio por hora
    condition: string;
    start: string;
    end: string;
    cancellation: string;
    availableDays: string[];
}

export interface HorarioDTO {
    horaInicio: string;
    horaFin: string;
}

export interface MappedHorarioDTO {
    horaInicio: number;
    horaFin: number;
}

export interface ReservaDTO {
    id: number | string;
    nameOwner: string;
    email: string;
    dateEvento: string;
    horaInicio: string;
    horaFin: string;
    nameInmueble: string;
    dateEmision: string;
}
