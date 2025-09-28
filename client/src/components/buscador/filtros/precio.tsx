import React from "react";
import type { Dispatch, SetStateAction, RefObject } from "react";

interface PriceSliderUIProps {
    minPrecio: number;
    maxPrecio: number;
    setDragging: Dispatch<SetStateAction<null | "min" | "max">>;
    sliderRef: RefObject<HTMLDivElement>;
    minHandlePosition: number;
    maxHandlePosition: number;
    HANDLE_WIDTH: number;
}

const PriceSliderUI: React.FC<PriceSliderUIProps> = (props) => (
    <div className="mb-8">
        <label className="text-gray-300 font-semibold mb-3 block">
            Rango de Precio: $$ {props.minPrecio} - $$ {props.maxPrecio}
        </label>
        <div className="flex items-center">
            <div
                ref={props.sliderRef}
                className="relative flex-1 h-1 bg-neutral-700 mx-2 rounded-full"
            >
                {/* Rango de selección activa */}
                <div
                    className="absolute h-1 bg-amber-500 rounded-full"
                    style={{
                        left: `${props.minHandlePosition}%`,
                        right: `${100 - props.maxHandlePosition}%`,
                    }}
                />

                {/* Handle Mínimo */}
                <div
                    onMouseDown={() => props.setDragging("min")}
                    className="absolute w-5 h-5 bg-amber-500 rounded-full cursor-pointer border-2 border-neutral-800 shadow-md transition duration-100 hover:scale-110"
                    style={{
                        left: `calc(${props.minHandlePosition}% - ${
                            props.HANDLE_WIDTH / 2
                        }px)`,
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                />
                {/* Handle Máximo */}
                <div
                    onMouseDown={() => props.setDragging("max")}
                    className="absolute w-5 h-5 bg-amber-500 rounded-full cursor-pointer border-2 border-neutral-800 shadow-md transition duration-100 hover:scale-110"
                    style={{
                        left: `calc(${props.maxHandlePosition}% - ${
                            props.HANDLE_WIDTH / 2
                        }px)`,
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                />
            </div>
        </div>
    </div>
);

export default PriceSliderUI;
