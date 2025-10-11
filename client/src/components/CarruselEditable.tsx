import React from "react";
import Botones from "./BotonesCarrusel";

interface CarruselProps {
    images: string[];
    currentIndex: number;
    nextImage: () => void;
    prevImage: () => void;
    onRemoveImage?: (index: number) => void;
}

const Carrusel: React.FC<CarruselProps> = ({
    images,
    currentIndex,
    nextImage,
    prevImage,
    onRemoveImage,
}) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    return (
        <div className="w-full h-[500px] relative overflow-hidden bg-gray-800 rounded-xl flex items-center justify-center">
            {images.length > 0 ? (
                <>
                    <div className="relative w-full h-full flex items-center justify-center">
                        {images.map((img, index) => {
                            const total = images.length;
                            let offset = index - currentIndex;

                            if (offset < -Math.floor(total / 2))
                                offset += total;
                            if (offset > Math.floor(total / 2)) offset -= total;

                            const isCenter = offset === 0;
                            const isVisible = Math.abs(offset) <= 1;
                            const scale = isCenter ? 1 : 0.7;
                            const zIndex = isCenter ? 10 : 5;
                            const translateX = offset * 35;

                            return (
                                <div
                                    key={index}
                                    className="absolute w-full h-full flex items-center justify-center"
                                >
                                    <img
                                        src={`${apiUrl}${img}`}
                                        alt={`imagen ${index + 1}`}
                                        className="transition-all duration-500 rounded-xl"
                                        style={{
                                            transform: `translateX(${translateX}%) scale(${scale})`,
                                            zIndex,
                                            height: "80%",
                                            objectFit: "contain",
                                            opacity: isVisible ? 1 : 0,
                                            pointerEvents: isVisible
                                                ? "auto"
                                                : "none",
                                        }}
                                    />
                                    {isCenter && onRemoveImage && (
                                        <button
                                            onClick={() => onRemoveImage(index)}
                                            className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg z-20"
                                            title="Eliminar imagen"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {images.length > 1 && (
                        <Botones
                            onNext={nextImage}
                            onPrev={prevImage}
                        />
                    )}
                </>
            ) : (
                <span className="text-gray-400">[Imagen]</span>
            )}
        </div>
    );
};

export default Carrusel;
