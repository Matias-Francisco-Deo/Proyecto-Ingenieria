interface AddressInputsProps {
    streetError?: boolean;
    numberError?: boolean;
}

export default function AddressInputs({
    streetError,
    numberError,
}: AddressInputsProps) {
    return (
        <div className="mt-2 flex gap-2">
            <div className="flex-[0.7]">
                <label
                    htmlFor="street"
                    className="block font-medium text-sm/6"
                >
                    Calle
                </label>
                <input
                    id="street"
                    name="street"
                    type="text"
                    required
                    autoComplete="street"
                    className={`${
                        streetError ? "inputError" : ""
                    } loginInput -outline-offset-1 focus:-outline-offset-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6`}
                />
            </div>
            <div className="flex-[0.3]">
                <label
                    htmlFor="number"
                    className="block font-medium text-sm/6"
                >
                    Altura
                </label>
                <input
                    id="number"
                    name="number"
                    type="number"
                    required
                    min="0"
                    autoComplete="number"
                    onKeyDown={(e) => {
                        if (["e", "E", "+", "-"].includes(e.key)) {
                            e.preventDefault();
                        }
                    }}
                    className={`no-spin ${
                        numberError ? "inputError" : ""
                    } loginInput -outline-offset-1 focus:-outline-offset-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6`}
                />
            </div>
        </div>
    );
}
