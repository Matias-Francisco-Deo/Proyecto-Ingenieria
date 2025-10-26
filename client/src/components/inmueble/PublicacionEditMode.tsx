import CarruselEditable from "@/components/CarruselEditable";
import InmuebleEditable from "@/components/InmuebleEditable";
import ImageUploader from "./ImageUploader";
import type { Inmueble } from "@/types/types";

interface PublicacionEditModeProps {
    inmueble: Inmueble;
    images: string[];
    currentIndex: number;
    nextImage: () => void;
    prevImage: () => void;
    onRemoveImage: (index: number) => void;
    previewImages: string[];
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemovePreview: (index: number) => void;
    onCancelar: () => void;
    onGuardar: (data: Partial<Inmueble>) => void;
}

export default function PublicacionEditMode({
    inmueble,
    images,
    currentIndex,
    nextImage,
    prevImage,
    onRemoveImage,
    previewImages,
    onImageChange,
    onRemovePreview,
    onCancelar,
    onGuardar,
}: PublicacionEditModeProps) {
    return (
        <>
            <div className="w-3/5">
                <CarruselEditable
                    images={images}
                    currentIndex={currentIndex}
                    nextImage={nextImage}
                    prevImage={prevImage}
                    onRemoveImage={onRemoveImage}
                />
                <ImageUploader
                    previewImages={previewImages}
                    onImageChange={onImageChange}
                    onRemoveImage={onRemovePreview}
                />
            </div>

            <div className="w-2/5 bg-gray-800 rounded-xl p-4 flex flex-col justify-between">
                <InmuebleEditable
                    inmueble={inmueble}
                    onCancelar={onCancelar}
                    onGuardar={onGuardar}
                />
            </div>
        </>
    );
}
