import { useRef, useEffect } from "react";

interface CapacityProps {
  setCapacity: (capacity: number) => void;
}

function CapacityUI({ setCapacity }: CapacityProps) {
  // const [capacityOnInput, setCapacityOnInput] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const updateCapacity = () => {
    const value = Number(inputRef.current?.value);
    setCapacity(value);
  };

  useEffect(() => {
    return updateCapacity();
  }, []);

  return (
    <div className="mb-6 flex flex-col gap-4 font-semibold">
      <input
        ref={inputRef}
        onKeyDown={(e) => {
          if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
        }}
        onKeyUp={() => updateCapacity()}
        type="number"
        placeholder="Buscar por capacidad..."
        className="no-spin w-[55%] p-2 rounded-xl bg-neutral-800 text-gray-300"
      />
    </div>
  );
}

export default CapacityUI;
