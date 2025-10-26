import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";

export function usePropertyForm() {
    const { isAuthenticated } = useAuth();
    const { getId } = useUser();

    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [generalErrorMessage, setGeneralErrorMessage] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    const days = new Set([
        "DOMINGO",
        "LUNES",
        "MARTES",
        "MIERCOLES",
        "JUEVES",
        "VIERNES",
        "SABADO",
    ]);

    const [selectedDays, setSelectedDays] = useState<Set<string>>(days);

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

    const setError = (field: string, value: boolean) => {
        setErrors((prev) => ({ ...prev, [field]: value }));
    };

    const resetErrors = () => {
        setTimeout(() => {
            setErrors({});
            setGeneralErrorMessage("");
        }, 3000);
    };

    return {
        isAuthenticated,
        getId,
        errors,
        setError,
        generalErrorMessage,
        setGeneralErrorMessage,
        selectedFiles,
        previewImages,
        handleImageChange,
        removeImage,
        selectedDays,
        setSelectedDays,
        resetErrors,
    };
}
