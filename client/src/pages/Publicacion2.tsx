import { useState, useEffect } from "react";
import type { Inmueble } from "@/types/types";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-toastify";
import PublicacionHeader from "@/components/inmueble/PublicacionHeader";
import PublicacionViewMode from "@/components/inmueble/PublicacionViewMode";
import PublicacionEditMode from "@/components/inmueble/PublicacionEditMode";
import DeleteConfirmationModal from "@/components/inmueble/DeleteConfirmationModal";
import { useImageUpload } from "@/hooks/useImageUpload";

export default function Publicacion() {
    const [inmueble, setInmueble] = useState<Inmueble | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [editando, setEditando] = useState(false);
    const [eliminando, setEliminando] = useState(false);

    const {
        previewImages,
        selectedFiles,
        handleImageChange,
        removeImage,
        clearFiles,
    } = useImageUpload();

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const { getId } = useUser();
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (!id) return;

        const fetchInmueble = async () => {
            try {
                const res = await fetch(`${apiUrl}/property/${id}`);
                if (!res.ok) throw new Error("publicación no encontrada");
                const data = await res.json();
                setInmueble(data);
            } catch (err) {
                console.error(err);
                setInmueble(null);
            }
        };

        const fetchImages = async () => {
            try {
                const res = await fetch(`${apiUrl}/property/${id}/images`);
                if (!res.ok) throw new Error("imágenes no encontradas");
                const data = await res.json();
                setImages(data);
            } catch (err) {
                console.error(err);
                setImages([]);
            } finally {
                setLoading(false);
            }
        };

        fetchInmueble();
        fetchImages();
    }, [id, apiUrl]);

    const nextImage = () =>
        setCurrentIndex((prev) => (prev + 1) % images.length);
    const prevImage = () =>
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    const handleRemoveImage = async (index: number) => {
        if (!id || images.length <= 1) {
            toast.warning("Debe haber al menos una imagen en la publicación.");
            return;
        }

        try {
            const res = await fetch(`${apiUrl}/property/${id}/removeImages`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ imagesToRemove: [index] }),
            });

            if (!res.ok) throw new Error("Error al eliminar la imagen");

            setImages((prev) => prev.filter((_, i) => i !== index));
            setCurrentIndex((prev) =>
                prev >= images.length - 1 ? Math.max(0, prev - 1) : prev
            );
        } catch (err) {
            toast.error("Error al eliminar imagen: " + err);
        }
    };

    const handleGuardarCambios = async (data: Partial<Inmueble>) => {
        if (!inmueble) return;

        const response = await fetch(`${apiUrl}/property/${inmueble.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).catch(() => {
            toast.error("Hubo un error inesperado.");
            return;
        });

        if (selectedFiles.length > 0) {
            const formData = new FormData();
            selectedFiles.forEach((file) => formData.append("images", file));

            await fetch(`${apiUrl}/property/${inmueble.id}/addImages`, {
                method: "PATCH",
                body: formData,
            });
        }

        if (!response) return;

        if (response.ok) {
            clearFiles();
            setEditando(false);
            location.href = `/publicacion?id=${inmueble.id}`;
            return;
        }

        const updateError = await response.json();
        if (updateError.error) {
            toast.error(updateError.error);
            if (
                updateError.error ===
                "No existe la publicación que quiere modificar"
            ) {
                setTimeout(() => (location.href = "/mis-publicaciones"), 2500);
            }
        }
    };

    const handleEliminarPublicacion = async (
        evt: React.FormEvent<HTMLFormElement>
    ) => {
        evt.preventDefault();
        if (!inmueble) return;

        const response = await fetch(`${apiUrl}/property/${inmueble.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        }).catch(() => {
            toast.error("Hubo un error inesperado.");
            return;
        });

        if (!response) return;

        if (response.ok) {
            toast.success(`Se ha dado de baja el inmueble: ${inmueble.name}`);
            setTimeout(() => (location.href = "/mis-publicaciones"), 2500);
            return;
        }

        const error = await response.json();
        if (error.error) {
            toast.error(error.error);
            setTimeout(() => (location.href = "/mis-publicaciones"), 2500);
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (!inmueble) return <p>Inmueble no encontrado</p>;

    const isOwner = inmueble.ownerId === getId();

    return (
        <div className="p-6 text-white border border-gray-700 rounded-xl">
            <PublicacionHeader
                inmueble={inmueble}
                editando={editando}
                onNameChange={(name) =>
                    setInmueble((prev) => (prev ? { ...prev, name } : prev))
                }
            />

            <DeleteConfirmationModal
                isOpen={eliminando}
                onClose={() => setEliminando(false)}
                onConfirm={handleEliminarPublicacion}
            />

            <div className="flex gap-6">
                {editando ? (
                    <PublicacionEditMode
                        inmueble={inmueble}
                        images={images}
                        currentIndex={currentIndex}
                        nextImage={nextImage}
                        prevImage={prevImage}
                        onRemoveImage={handleRemoveImage}
                        previewImages={previewImages}
                        onImageChange={handleImageChange}
                        onRemovePreview={removeImage}
                        onCancelar={() => setEditando(false)}
                        onGuardar={handleGuardarCambios}
                    />
                ) : (
                    <PublicacionViewMode
                        inmueble={inmueble}
                        images={images}
                        currentIndex={currentIndex}
                        nextImage={nextImage}
                        prevImage={prevImage}
                        isOwner={isOwner}
                        onEditar={() => setEditando(true)}
                        onEliminar={() => setEliminando(true)}
                    />
                )}
            </div>
        </div>
    );
}
