export interface SignInError {
    error: string;
}

export interface UserInfo {
    id: number;
    username: string;
    key: string;
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
    pagado: boolean;
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
    owner_name: string;
    owner_email: string;
    client_name: string;
    client_email: string;
    street: string;
    number: number;
    status: string;
    cancellationPolicy: string;
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
    capacity: number;
    condition: string;
    start: string;
    end: string;
    cancellation: string;
    ownerId: number; // nuevo
    ownerName: string;
    ownerEmail: string;
    availableDays: string[];
    street: string;
    number: number;
    imageURL: string;
    error?: string;
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
    pagado: boolean;
}

interface ReservaCanceladasDTO {
    id: number;
    dateEvento: string;
    horaInicio: string;
    horaFin: string;
    dateEmision: string;
    priceToPay: number;
    motivoCancelacion: string;
    inmuebleDTO: {
        nameInmueble: string;
        ubication: string;
        calle: string;
        altura: number;
        owner: {
            email: string;
            nameOwner: string;
        };
    };
}

export interface ReservationsSummaryResponse<T> {
    content: T[];
    totalPages: number;
    number: number;
}
