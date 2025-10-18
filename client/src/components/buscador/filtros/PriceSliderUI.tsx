interface PriceProps {
  setRangoPrecio: (rangoPrecio: number[]) => void;
}

import { useState, useRef, useEffect } from "react";

const width = 20; // width of handle in pixels

export default function PriceRangeSlider({ setRangoPrecio }: PriceProps) {
  const [minHandlePos, setMin] = useState(0);
  const [maxHandlePositionSimulado, setMax] = useState(100);
  const [minPrecio, setMinPrecio] = useState(0);
  const [maxPrecio, setMaxPrecio] = useState(100000);

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(null); // "min" or "max" or null

  // Convert percentage position to price value
  const positionToPrice = (pos: number) => {
    const MIN_TOTAL_PRICE = 0;
    const MAX_TOTAL_PRICE = 100000;
    return Math.round(
      (pos / 100) * (MAX_TOTAL_PRICE - MIN_TOTAL_PRICE) + MIN_TOTAL_PRICE
    );
  };

  useEffect(() => {
    setRangoPrecio([0, 100000]);
  }, []);

  // Handle mouse move event to update slider positions
  const onMouseMove = (e: { clientX: number }) => {
    if (!dragging.current) return;

    const slider = sliderRef.current;
    if (!slider) return;

    const rect = slider.getBoundingClientRect();
    let newPos = ((e.clientX - rect.left) / rect.width) * 100;
    newPos = Math.min(Math.max(newPos, 0), 100); // clamp between 0 and 100

    if (dragging.current === "min") {
      const newPrice = positionToPrice(newPos);
      if (newPrice > maxPrecio) return;
      setMin(newPos);
      setMinPrecio(newPrice);
      setRangoPrecio([newPrice, maxPrecio]);
    } else if (dragging.current === "max") {
      const newPrice = positionToPrice(newPos);
      if (newPrice < minPrecio) return;
      setMax(newPos);
      setMaxPrecio(newPrice);
      setRangoPrecio([minPrecio, newPrice]);
    }
  };

  // Stop dragging
  const onMouseUp = () => {
    document.body.style.userSelect = "";
    dragging.current = null;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  // Start dragging either min or max handle
  const startDrag = (handle: string) => {
    document.body.style.userSelect = "none";
    dragging.current = handle as unknown as null;
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="mb-8">
      <label className="text-gray-300 font-semibold mb-3 block">
        Rango de Precio: ${minPrecio} - ${maxPrecio}
      </label>
      <div className="flex items-center">
        <div
          className="relative flex-1 h-1 bg-neutral-700 mx-2 rounded-full"
          ref={sliderRef}
        >
          <div
            className="absolute h-1 bg-amber-500 rounded-full"
            style={{
              left: `${minHandlePos}%`,
              right: `${100 - maxHandlePositionSimulado}%`,
            }}
          />
          <div
            className="absolute w-5 h-5 bg-amber-500 rounded-full cursor-pointer border-2 border-neutral-800 shadow-md transition duration-100 hover:scale-110"
            style={{
              left: `calc(${minHandlePos}% - ${width / 2}px)`,
              top: "50%",
              transform: "translateY(-50%)",
            }}
            onMouseDown={() => startDrag("min")}
          />
          <div
            className="absolute w-5 h-5 bg-amber-500 rounded-full cursor-pointer border-2 border-neutral-800 shadow-md transition duration-100 hover:scale-110"
            style={{
              left: `calc(${maxHandlePositionSimulado}% - ${width / 2}px)`,
              top: "50%",
              transform: "translateY(-50%)",
            }}
            onMouseDown={() => startDrag("max")}
          />
        </div>
      </div>
    </div>
  );
}
