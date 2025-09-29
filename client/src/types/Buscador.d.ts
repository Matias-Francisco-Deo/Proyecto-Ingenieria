export interface UseBusquedaInmueblesResult {
    nombre: string;
    setNombre: (nombre: string) => void;
    data: InmueblesSummaryResponse | undefined | null;
    loading: boolean;
    handleBuscar: (page?: number) => Promise<void>;
}
