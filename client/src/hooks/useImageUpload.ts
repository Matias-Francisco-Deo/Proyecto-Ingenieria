import { useState } from "react";

export function useImageUpload() {
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newFiles = Array.from(files);
        setSelectedFiles((prev) => [...prev, ...newFiles]);

        const urls = newFiles.map((file) => URL.createObjectURL(file));
        setPreviewImages((prev) => [...prev, ...urls]);

        e.target.value = "";
    };

    const removeImage = (index: number) => {
        setPreviewImages((prev) => prev.filter((_, i) => i !== index));
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const clearFiles = () => {
        setSelectedFiles([]);
        setPreviewImages([]);
    };

    return {
        previewImages,
        selectedFiles,
        handleImageChange,
        removeImage,
        clearFiles,
    };
}
