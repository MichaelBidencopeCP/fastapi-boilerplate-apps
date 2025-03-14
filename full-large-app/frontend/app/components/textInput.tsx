

export default function TextInput({ label, value, onChange, required, placeholder, className, id, type, endDecorator }: Readonly<{
    label: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    placeholder?: string;
    className?: string;
    id?: string;
    type?: string;
    endDecorator?: React.ReactNode;
}>) {
    return (
        <div className="relative">
            {label && <label className="block mb-2">{label}</label>}
            <div className="relative flex items-center">
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    required={required}
                    placeholder={placeholder}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {endDecorator && (
                    <div className="absolute right-0 inset-y-0 flex items-center">
                        {endDecorator}
                    </div>
                )}
            </div>
        </div>
    );
}