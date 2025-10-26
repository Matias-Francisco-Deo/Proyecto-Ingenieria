interface FormInputProps {
    id: string;
    name: string;
    type: string;
    label: string;
    error?: boolean;
    required?: boolean;
    min?: string;
    step?: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    className?: string;
}

export default function FormInput({
    id,
    name,
    type,
    label,
    error,
    required = true,
    min,
    step,
    onKeyDown,
    className = "",
}: FormInputProps) {
    const preventScientificNotation = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (["e", "E", "+", "-"].includes(e.key)) {
            e.preventDefault();
        }
    };

    return (
        <div>
            <label
                htmlFor={id}
                className="block font-medium text-sm/6"
            >
                {label}
            </label>
            <div className="mt-2">
                <input
                    id={id}
                    name={name}
                    type={type}
                    required={required}
                    min={min}
                    step={step}
                    autoComplete={name}
                    onKeyDown={
                        type === "number"
                            ? preventScientificNotation
                            : onKeyDown
                    }
                    className={`${type === "number" ? "no-spin " : ""}${
                        error ? "inputError " : ""
                    }${className} loginInput -outline-offset-1 focus:-outline-offset-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6`}
                />
            </div>
        </div>
    );
}
