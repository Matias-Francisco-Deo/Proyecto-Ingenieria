interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (evt: React.FormEvent<HTMLFormElement>) => void;
}

export default function DeleteConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
}: DeleteConfirmationModalProps) {
    return (
        <div
            className={`absolute z-100 top-1/4 flex flex-col gap-6 p-14 bg-gray-800 rounded-2xl border-2 border-amber-400 transition duration-300 ease-in-out w-[500px] ${
                isOpen
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
            }`}
            style={{ left: "50%", transform: "translateX(-50%)" }}
        >
            <h2 className="text-3xl text-center">
                ¿Realmente desea dar de baja la propiedad?
            </h2>
            <form
                className="flex flex-col gap-10"
                onSubmit={onConfirm}
            >
                <button className="bg-red-950 hover:bg-red-800 text-white font-bold py-3 px-10 rounded-2xl text-xl cursor-pointer mx-auto">
                    Confirmar baja
                </button>
            </form>
            <div className="top-0 right-0 absolute">
                <button
                    type="button"
                    onClick={onClose}
                    className="hover:cursor-pointer absolute -top-3 -right-3 bg-black hover:bg-red-800 text-white rounded-full border-2 border-amber-400 w-10 h-10 flex items-center justify-center text-xs"
                >
                    X
                </button>
            </div>
        </div>
    );
}
