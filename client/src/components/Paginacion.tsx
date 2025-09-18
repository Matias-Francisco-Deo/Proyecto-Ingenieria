interface PaginacionProps {
  paginaActual: number;
  totalPaginas: number;
  onPageChange?: (page: number) => void;
}

export default function Paginacion({
  paginaActual,
  totalPaginas,
  onPageChange,
}: PaginacionProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      {/* Botón anterior */}
      <button
        onClick={() => onPageChange?.(paginaActual - 1)}
        disabled={paginaActual === 1}
        className="px-3 py-1 rounded bg-amber-600 text-white disabled:bg-gray-400"
      >
        Atrás
      </button>

      {/* Número actual */}
      <span className="px-4 py-1 rounded bg-gray-200 text-black font-bold">
        {paginaActual} / {totalPaginas}
      </span>

      {/* Botón siguiente */}
      <button
        onClick={() => onPageChange?.(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
        className="px-3 py-1 rounded bg-amber-600 text-white disabled:bg-gray-400"
      >
        Adelante
      </button>
    </div>
  );
}
