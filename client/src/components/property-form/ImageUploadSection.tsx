interface ImageUploadSectionProps {
    error?: boolean;
    previewImages: string[];
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveImage: (index: number) => void;
}

export default function ImageUploadSection({
    error,
    previewImages,
    onImageChange,
    onRemoveImage,
}: ImageUploadSectionProps) {
    return (
        <div>
            <div className="flex items-center justify-between">
                <label
                    htmlFor="images"
                    className="block font-medium text-sm/6"
                >
                    Subir imagenes
                </label>
            </div>
            <div className="mt-2 flex gap-2 flex-wrap">
                <input
                    id="images"
                    name="images"
                    type="file"
                    multiple
                    required
                    autoComplete="images"
                    onChange={onImageChange}
                    className={`${
                        error ? "inputError" : ""
                    } loginInput -outline-offset-1 focus:-outline-offset-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6`}
                />
                {previewImages.map((img, idx) => (
                    <div
                        key={idx}
                        className="relative"
                    >
                        <img
                            src={img}
                            alt={`Preview ${idx}`}
                            className="w-32 h-32 object-contain border rounded"
                        />
                        <button
                            type="button"
                            onClick={() => onRemoveImage(idx)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
