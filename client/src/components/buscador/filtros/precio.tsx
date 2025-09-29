function PriceSliderUI() {
    const minPrecioSimulado = 50;
    const maxPrecioSimulado = 350;
    const minHandlePositionSimulado = 20;
    const maxHandlePositionSimulado = 80;
    const HANDLE_WIDTH_SIMULADO = 20;

    return (
        <div className="mb-8">
            <label className="text-gray-300 font-semibold mb-3 block">
                Rango de Precio: ${minPrecioSimulado} - ${maxPrecioSimulado}
            </label>
            <div className="flex items-center">
                <div className="relative flex-1 h-1 bg-neutral-700 mx-2 rounded-full">
                    <div
                        className="absolute h-1 bg-amber-500 rounded-full"
                        style={{
                            left: `${minHandlePositionSimulado}%`,
                            right: `${100 - maxHandlePositionSimulado}%`,
                        }}
                    />
                    <div
                        className="absolute w-5 h-5 bg-amber-500 rounded-full cursor-pointer border-2 border-neutral-800 shadow-md transition duration-100 hover:scale-110"
                        style={{
                            left: `calc(${minHandlePositionSimulado}% - ${
                                HANDLE_WIDTH_SIMULADO / 2
                            }px)`,
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                    />
                    <div
                        className="absolute w-5 h-5 bg-amber-500 rounded-full cursor-pointer border-2 border-neutral-800 shadow-md transition duration-100 hover:scale-110"
                        style={{
                            left: `calc(${maxHandlePositionSimulado}% - ${
                                HANDLE_WIDTH_SIMULADO / 2
                            }px)`,
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default PriceSliderUI;
