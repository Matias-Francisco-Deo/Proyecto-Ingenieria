import React from "react";

interface BotonesProps {
    onNext: () => void;
    onPrev: () => void;
}

const Botones: React.FC<BotonesProps> = ({ onNext, onPrev }) => {
    return (
        <>
            <button
                onClick={onPrev}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 rounded z-20 p-1 flex items-center justify-center"
            >
                <div className="bg-amber-500 w-8 h-8 flex items-center justify-center rounded">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#ffffff"
                        className="w-4 h-4"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </div>
            </button>

            <button
                onClick={onNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 rounded z-20 p-1 flex items-center justify-center"
            >
                <div className="bg-amber-500 w-8 h-8 flex items-center justify-center rounded">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#ffffff"
                        className="w-4 h-4"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </button>
        </>
    );
};

export default Botones;