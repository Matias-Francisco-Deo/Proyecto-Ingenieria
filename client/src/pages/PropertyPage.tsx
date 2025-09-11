import type { RegisterError } from "@/types/types";
import { useState, type FormEvent } from "react";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";

export default function createPropertyPage() {
    const { isAuthenticated } = useAuth();
    const { getId } = useUser();
    
    /*
  Constante para usar directamente sobre el <p> definido arriba del input de email
  */
    const [emailErrorMessage, setEmailErrorMessage] = useState("");

    /* Se usa para poner en rojo aquellos campos con errores */
    const [hasNameError, setHasNameError] = useState(false);
    const [hasDescriptionError, setHasDescriptionError] = useState(false);
    const [hasUbicationError, setHasUbicationError] = useState(false);
    const [hasPriceError, setHasPriceError] = useState(false);
    const [hasCapacityError, setHasCapacityError] = useState(false);
    const [hasConditionsError, setHasConditionsError] = useState(false);
    const [hasStartTimeError, setHasStartTimeError] = useState(false);
    const [hasEndTimeError, setHasEndTimeError] = useState(false);
    const [hasImageError, setHasImageError] = useState(false);
    const [hasCancellationError, sethasCancellationError] = useState(false);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    /* Se usa para poner el mensaje de error abajo del último input */
    const [generalErrorMessage, setGeneralErrorMessage] = useState("");

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

    async function handleProperty(
        event: FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault();

        if (!isAuthenticated || !getId()) {
            setGeneralErrorMessage("Debes iniciar sesión para dar de alta un inmueble.");
            return;
        }

        /*
    Toma los datos de los input y los envía al backend a /auth
    También si algo falla muestra el error (en este caso encima del campo de email)
    */

        const form = event.target as HTMLFormElement;

        const propertyName = form.elements.namedItem(
            "nombre"
        ) as HTMLInputElement;
        const propertyDesc = form.elements.namedItem(
            "description"
        ) as HTMLInputElement;
        const propertyUbication = form.elements.namedItem(
            "ubication"
        ) as HTMLInputElement;
        const propertyImage = form.elements.namedItem(
            "images"
        ) as HTMLInputElement;
        const propertyPrice = form.elements.namedItem(
            "price"
        ) as HTMLInputElement;
        const propertyStartTime = form.elements.namedItem(
            "start-event"
        ) as HTMLInputElement;
        const propertyEndTime = form.elements.namedItem(
            "end-event"
        ) as HTMLInputElement;
        const propertyCapacity = form.elements.namedItem(
            "capacity"
        ) as HTMLInputElement;
        const propertyConditions = form.elements.namedItem(
            "conditions"
        ) as HTMLInputElement;
        const propertyCancellation = form.elements.namedItem(
            "cancellation-policy"
        ) as HTMLSelectElement;

        const propertyNameIsBlank = propertyName.value == "";
        const propertyDescIsBlank = propertyDesc.value == "";
        const propertyUbicationIsBlank = propertyUbication.value == "";
        const propertyImageIsBlank = selectedFiles.length === 0;
        const propertyPriceIsBlank = propertyPrice.value == "";
        const propertyStartTimeIsBlank = propertyStartTime.value == "";
        const propertyEndTimeIsBlank = propertyEndTime.value == "";
        const propertyCapacityIsBlank = propertyCapacity.value == "";
        const propertyConditionsIsBlank = propertyConditions.value == "";
        const propertyCancellationIsBlank = propertyCancellation.value == "";

        const userId = getId();

        /* Pone en rojo a los campos que falten  */
        checkHasNoBlanks();

        /* Si faltan campos, tira error */
        if (
            propertyNameIsBlank ||
            propertyDescIsBlank ||
            propertyUbicationIsBlank ||
            propertyImageIsBlank ||
            propertyPriceIsBlank ||
            propertyStartTimeIsBlank ||
            propertyEndTimeIsBlank ||
            propertyCapacityIsBlank ||
            propertyConditionsIsBlank ||
            propertyCancellationIsBlank
        ) {
            setGeneralErrorMessage("Complete los campos faltantes.");
            resetBlankError();
            return;
        }

        const formData = new FormData();

        // Adjuntamos JSON con los datos del inmueble
        const propertyJson = {
            name: propertyName.value,
            description: propertyDesc.value,
            price: propertyPrice.value,
            start: propertyStartTime.value,
            end: propertyEndTime.value,
            ubication: propertyUbication.value,
            capacity: propertyCapacity.value,
            condition: propertyConditions.value,
            cancellation: propertyCancellation.value,
            userId: userId,
        };
        formData.append(
            "property",
            new Blob([JSON.stringify(propertyJson)], {
                type: "application/json",
            })
        );

        // Adjuntamos todas las imágenes
        selectedFiles.forEach((file) => {
            formData.append("images", file);
        });

        const response = await fetch("http://localhost:8081/property", {
            method: "POST",
            body: formData,
        });

        /*
    Manejo de error: Email se encuentra registrado
    */
        if (!response.ok) {
            const { error } = (await response.json()) as RegisterError;

            console.error(error);

            setEmailErrorMessage(error);
            //   setHasEmailError(true);
            resetEmailError();

            return;
        }

        location.href = "/home";

        function checkHasNoBlanks() {
            if (propertyNameIsBlank) {
                setHasNameError(true);
            }
            if (propertyDescIsBlank) {
                setHasDescriptionError(true);
            }
            if (propertyUbicationIsBlank) {
                setHasUbicationError(true);
            }
            if (propertyImageIsBlank) {
                setHasImageError(true);
            }
            if (propertyPriceIsBlank) {
                setHasPriceError(true);
            }
            if (propertyStartTimeIsBlank) {
                setHasStartTimeError(true);
            }
            if (propertyEndTimeIsBlank) {
                setHasEndTimeError(true);
            }
            if (propertyCapacityIsBlank) {
                setHasCapacityError(true);
            }
            if (propertyConditionsIsBlank) {
                setHasConditionsError(true);
            }
            if (propertyCancellationIsBlank) {
                sethasCancellationError(true);
            }
        }
    }

    return (
        <div className="text-white">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="relative flex justify-center">
                        <title>RESERVO - Create property</title>
                    </div>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        method="POST"
                        className="space-y-6"
                        onSubmit={handleProperty}
                        noValidate
                    >
                        <div>
                            <label
                                htmlFor="nombre"
                                className="block font-medium text-sm/6"
                            >
                                Nombre
                            </label>
                            {/* {hasNameError && (
                <p className="mt-2 text-sm text-red-600">{emailErrorMessage}</p> // acá podría cambiar el mensaje de error
              )} */}
                            <div className="mt-2">
                                <input
                                    id="nombre"
                                    name="nombre"
                                    type="text"
                                    required
                                    autoComplete="nombre"
                                    className={`${
                                        hasNameError ? "inputError" : ""
                                    } loginInput -outline-offset-1 focus:-outline-offset-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1  focus:outline-2 focus:outline-indigo-600 sm:text-sm/6`}
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="description"
                                className="block font-medium text-sm/6"
                            >
                                Descripción
                            </label>
                            <div className="mt-2">
                                <input
                                    id="description"
                                    name="description"
                                    type="text"
                                    required
                                    autoComplete="description"
                                    className={`${
                                        hasDescriptionError ? "inputError" : ""
                                    } loginInput -outline-offset-1 focus:-outline-offset-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1  focus:outline-2 focus:outline-indigo-600 sm:text-sm/6`}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="ubication"
                                    className="block font-medium text-sm/6"
                                >
                                    Localidad
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="ubication"
                                    name="ubication"
                                    type="text"
                                    required
                                    autoComplete="ubication"
                                    className={`${
                                        hasUbicationError ? "inputError" : ""
                                    } loginInput -outline-offset-1 focus:-outline-offset-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1  focus:outline-2 focus:outline-indigo-600 sm:text-sm/6`}
                                />
                            </div>
                        </div>

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
                                    onChange={handleImageChange}
                                    className={`${
                                        hasImageError ? "inputError" : ""
                                    } loginInput -outline-offset-1 focus:-outline-offset-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1  focus:outline-2 focus:outline-indigo-600 sm:text-sm/6`}
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
                                            onClick={() => removeImage(idx)}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="price"
                                    className="block font-medium text-sm/6"
                                >
                                    Precio
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="price"
                                    name="price"
                                    type="number"
                                    required
                                    autoComplete="price"
                                    className={`${
                                        hasPriceError ? "inputError" : ""
                                    } loginInput -outline-offset-1 focus:-outline-offset-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1  focus:outline-2 focus:outline-indigo-600 sm:text-sm/6`}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label className="block font-medium text-sm/6">
                                    Ingresar horarios
                                </label>
                            </div>
                            <div className="mt-2 flex gap-4">
                                <div className="flex-1">
                                    <label
                                        htmlFor="start-event"
                                        className="block font-medium text-sm/6"
                                    >
                                        Inicio
                                    </label>
                                    <input
                                        id="start-event"
                                        name="start-event"
                                        type="time"
                                        required
                                        autoComplete="start-event"
                                        className={`${
                                            hasStartTimeError
                                                ? "inputError"
                                                : ""
                                        } loginInput -outline-offset-1 focus:-outline-offset-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1  focus:outline-2 focus:outline-indigo-600 sm:text-sm/6`}
                                    />
                                </div>
                                <div className="flex-1">
                                    <label
                                        htmlFor="end-event"
                                        className="block font-medium text-sm/6"
                                    >
                                        Fin
                                    </label>
                                    <input
                                        id="end-event"
                                        name="end-event"
                                        type="time"
                                        required
                                        autoComplete="end-event"
                                        className={`${
                                            hasEndTimeError ? "inputError" : ""
                                        } loginInput -outline-offset-1 focus:-outline-offset-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1  focus:outline-2 focus:outline-indigo-600 sm:text-sm/6`}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="capacity"
                                    className="block font-medium text-sm/6"
                                >
                                    Capacidad
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="capacity"
                                    name="capacity"
                                    type="number"
                                    required
                                    autoComplete="capacity"
                                    className={`${
                                        hasCapacityError ? "inputError" : ""
                                    } loginInput -outline-offset-1 focus:-outline-offset-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1  focus:outline-2 focus:outline-indigo-600 sm:text-sm/6`}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="conditions"
                                    className="block font-medium text-sm/6"
                                >
                                    Condiciones de la propiedad
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="conditions"
                                    name="conditions"
                                    type="text"
                                    required
                                    autoComplete="conditions"
                                    className={`${
                                        hasConditionsError ? "inputError" : ""
                                    } loginInput -outline-offset-1 focus:-outline-offset-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1  focus:outline-2 focus:outline-indigo-600 sm:text-sm/6`}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="cancellation-policy"
                                    className="block font-medium text-sm/6"
                                >
                                    Políticas de cancelación
                                </label>
                            </div>
                            <div className="mt-2">
                                <select
                                    name="cancellation-policy"
                                    id="cancellation-policy"
                                    required
                                    className={`${
                                        hasCancellationError ? "inputError" : ""
                                    } loginInput -outline-offset-1 focus:-outline-offset-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1  focus:outline-2 focus:outline-indigo-600 sm:text-sm/6`}
                                >
                                    <option value="non-restriction">
                                        Sin restricción
                                    </option>
                                    <option value="Flexible">Flexible</option>
                                    <option value="Severo">Severo</option>
                                </select>
                                {generalErrorMessage && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {generalErrorMessage}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 font-semibold text-sm/6 text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2"
                            >
                                Dar de Alta
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

    function resetBlankError() {
        setTimeout(() => {
            setHasNameError(false);
            setHasDescriptionError(false);
            setHasUbicationError(false);
            setHasImageError(false);
            setHasPriceError(false);
            setHasStartTimeError(false);
            setHasEndTimeError(false);
            setHasCapacityError(false);
            setHasConditionsError(false);
            sethasCancellationError(false);
            setGeneralErrorMessage("");
        }, 3000);
    }

    function resetEmailError() {
        setTimeout(() => {
            //   setHasEmailError(false);
            setEmailErrorMessage("");
        }, 5000);
    }
}
