import type { Inmueble } from "@/types/types";

interface PublicacionHeaderProps {
    inmueble: Inmueble;
    editando: boolean;
    onNameChange: (name: string) => void;
}

export default function PublicacionHeader({
    inmueble,
    editando,
    onNameChange,
}: PublicacionHeaderProps) {
    return (
        <div className="flex justify-between items-center mb-4">
            {editando ? (
                <div className="flex items-center gap-1 text-amber-400">
                    <label htmlFor="name">Nombre:</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={inmueble.name ?? ""}
                        onChange={(e) => onNameChange(e.target.value)}
                        placeholder="Nombre"
                        className="rounded-md bg-gray-600 px-3 py-1.5 text-base text-white outline-none focus:ring-2"
                    />
                </div>
            ) : (
                <h1 className="text-3xl font-extrabold">{inmueble.name}</h1>
            )}
            <div className="border border-gray-600 rounded-lg px-4 py-2 ml-4 flex items-center gap-3">
                <p className="text-base text-white">{inmueble.ownerEmail}</p>
                <p className="text-lg font-semibold text-gray-200">
                    {inmueble.ownerName}
                </p>
            </div>
        </div>
    );
}
