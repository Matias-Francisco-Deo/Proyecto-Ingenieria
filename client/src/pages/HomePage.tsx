import BuscadorDeInmuebles from "@/components/buscador/Buscador";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-white p-4">
            <h1 className="text-6xl font-light text-white w-1/2 text-center">
                RESERVO
            </h1>

            <div className="w-full max-w-xl">
                <BuscadorDeInmuebles />
            </div>
        </div>
    );
}
