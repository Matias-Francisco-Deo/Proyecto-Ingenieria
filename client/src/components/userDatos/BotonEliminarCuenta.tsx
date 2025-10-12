interface BotonEliminarCuentaProps {
    onEliminar?: () => void;
}

export default function BotonEliminarCuenta({
    onEliminar,
}: BotonEliminarCuentaProps) {
    return (
        <button
            type="button"
            className="bg-red-600 hover:bg-red-700 transition text-white font-medium px-6 py-3 rounded-lg text-xl md:text-2xl cursor-pointer"
            onClick={onEliminar}
        >
            Eliminar cuenta
        </button>
    );
}
