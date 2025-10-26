import { toast } from "react-toastify";

interface ValidationResult {
    isValid: boolean;
    errors: Record<string, boolean>;
}

export function validatePropertyForm(formData: FormData): ValidationResult {
    const errors: Record<string, boolean> = {};

    // Campos requeridos
    const requiredFields = [
        "nombre",
        "description",
        "ubication",
        "street",
        "number",
        "price",
        "start-event",
        "end-event",
        "capacity",
        "conditions",
        "cancellation-policy",
    ];

    let hasErrors = false;
    const missingFields: string[] = [];

    requiredFields.forEach((field) => {
        if (!formData.get(field)) {
            errors[field] = true;
            hasErrors = true;
            missingFields.push(field);
        }
    });

    if (hasErrors) {
        // Mostrar toasts en tandas de 3
        showToastsInBatches(missingFields, 3);
        return { isValid: false, errors };
    }

    const startTime = formData.get("start-event") as string;
    const endTime = formData.get("end-event") as string;

    if (startTime && endTime) {
        const startDate = new Date(`1970-01-01T${startTime}`);
        const endDate = new Date(`1970-01-01T${endTime}`);

        if (startDate >= endDate) {
            errors["start-event"] = true;
            errors["end-event"] = true;
            toast.error(
                "El horario de inicio no puede ser mayor o igual al horario de fin"
            );
            return { isValid: false, errors };
        }
    }

    // Validaciones numéricas
    const price = Number(formData.get("price"));
    const capacity = Number(formData.get("capacity"));
    const number = Number(formData.get("number"));

    if (price <= 0) {
        errors.price = true;
        toast.error("El precio no puede ser menor a 0");
        return { isValid: false, errors };
    }

    if (capacity < 1) {
        errors.capacity = true;
        toast.error("La capacidad no puede ser menor a 1");
        return { isValid: false, errors };
    }

    if (!Number.isInteger(capacity)) {
        errors.capacity = true;
        toast.error("La capacidad no puede ser decimal");
        return { isValid: false, errors };
    }

    if (number <= 0) {
        errors.number = true;
        toast.error("La altura no puede ser menor a 0");
        return { isValid: false, errors };
    }

    if (!Number.isInteger(number)) {
        errors.number = true;
        toast.error("La altura no puede ser decimal");
        return { isValid: false, errors };
    }

    return { isValid: true, errors: {} };
}

// Función para mostrar toasts en tandas
function showToastsInBatches(
    missingFields: string[],
    batchSize: number = 3
): void {
    const fieldNames: Record<string, string> = {
        nombre: "Nombre",
        description: "Descripción",
        ubication: "Ubicación",
        street: "Calle",
        number: "Número",
        price: "Precio",
        "start-event": "Horario de inicio",
        "end-event": "Horario de fin",
        capacity: "Capacidad",
        conditions: "Condiciones",
        "cancellation-policy": "Política de cancelación",
    };

    // Dividir los campos en tandas
    for (let i = 0; i < missingFields.length; i += batchSize) {
        const batch = missingFields.slice(i, i + batchSize);

        // Mostrar mensaje para la tanda actual
        if (batch.length === 1) {
            const fieldName = fieldNames[batch[0]] || batch[0];
            toast.error(`El campo "${fieldName}" es requerido`);
        } else {
            const fieldNamesList = batch
                .map((field) => fieldNames[field] || field)
                .join(", ");
            toast.error(`Complete los campos: ${fieldNamesList}`);
        }
    }
}
