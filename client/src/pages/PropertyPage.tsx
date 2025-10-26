import { type FormEvent } from "react";
import { toast } from "react-toastify";
import { usePropertyForm } from "@/hooks/usePropertyForm";
import { validatePropertyForm } from "@/utils/propertyValidation";
import FormInput from "@/components/property-form/FormInput";
import ImageUploadSection from "@/components/property-form/ImageUploadSection";
import TimeRangeInput from "@/components/property-form/TimeRangeInput";
import AddressInputs from "@/components/property-form/AddressInputs";
import CancellationPolicySelect from "@/components/property-form/CancellationPolicySelect";
import Dias from "@/components/Dias";

export default function CreatePropertyPage() {
    const {
        isAuthenticated,
        getId,
        errors,
        generalErrorMessage,
        selectedFiles,
        previewImages,
        handleImageChange,
        removeImage,
        selectedDays,
        setSelectedDays,
        resetErrors,
    } = usePropertyForm();

    const apiUrl = import.meta.env.VITE_API_URL;

    async function handleProperty(
        event: FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault();

        if (!isAuthenticated || !getId()) {
            toast.error("Debes iniciar sesión para dar de alta un inmueble.");
            return;
        }

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        // Validar imágenes
        if (selectedFiles.length === 0) {
            toast.error("Debe agregar al menos una imagen");
            resetErrors();
            return;
        }

        // Validar formulario
        const validation = validatePropertyForm(formData);
        if (!validation.isValid) {
            resetErrors();
            return;
        }

        // Preparar datos para envío
        const propertyJson = {
            name: formData.get("nombre"),
            description: formData.get("description"),
            price: formData.get("price"),
            start: formData.get("start-event"),
            end: formData.get("end-event"),
            days: Array.from(selectedDays),
            ubication: formData.get("ubication"),
            capacity: formData.get("capacity"),
            condition: formData.get("conditions"),
            cancellation: formData.get("cancellation-policy"),
            userId: getId(),
            street: formData.get("street"),
            number: formData.get("number"),
        };

        const submitFormData = new FormData();
        submitFormData.append(
            "property",
            new Blob([JSON.stringify(propertyJson)], {
                type: "application/json",
            })
        );

        selectedFiles.forEach((file) => {
            submitFormData.append("images", file);
        });

        try {
            const res = await fetch(`${apiUrl}/property`, {
                method: "POST",
                body: submitFormData,
            });

            if (res.ok) {
                toast.success("Inmueble creado con éxito");
                setTimeout(() => {
                    location.href = "/home";
                }, 2500);
            } else {
                toast.error("Error al crear el inmueble");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("Hubo un error inesperado.");
        }
    }

    return (
        <div className="text-white">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <title>RESERVO - Create property</title>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        method="POST"
                        className="space-y-6"
                        onSubmit={handleProperty}
                        noValidate
                    >
                        <FormInput
                            id="nombre"
                            name="nombre"
                            type="text"
                            label="Nombre"
                            error={errors.nombre}
                        />

                        <FormInput
                            id="description"
                            name="description"
                            type="text"
                            label="Descripción"
                            error={errors.description}
                        />

                        <FormInput
                            id="ubication"
                            name="ubication"
                            type="text"
                            label="Localidad"
                            error={errors.ubication}
                        />

                        <AddressInputs
                            streetError={errors.street}
                            numberError={errors.number}
                        />

                        <ImageUploadSection
                            error={errors.images}
                            previewImages={previewImages}
                            onImageChange={handleImageChange}
                            onRemoveImage={removeImage}
                        />

                        <FormInput
                            id="price"
                            name="price"
                            type="number"
                            label="Precio"
                            min="0"
                            error={errors.price}
                        />

                        <TimeRangeInput
                            startError={errors["start-event"]}
                            endError={errors["end-event"]}
                        />

                        <Dias
                            selectedDays={selectedDays}
                            setSelectedDays={setSelectedDays}
                        />

                        <FormInput
                            id="capacity"
                            name="capacity"
                            type="number"
                            label="Capacidad"
                            min="1"
                            error={errors.capacity}
                        />

                        <FormInput
                            id="conditions"
                            name="conditions"
                            type="text"
                            label="Condiciones de la propiedad"
                            error={errors.conditions}
                        />

                        <CancellationPolicySelect
                            error={errors["cancellation-policy"]}
                        />

                        {generalErrorMessage && (
                            <p className="mt-2 text-sm text-red-600">
                                {generalErrorMessage}
                            </p>
                        )}

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 font-semibold text-sm/6 text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 cursor-pointer"
                            >
                                Dar de Alta
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
