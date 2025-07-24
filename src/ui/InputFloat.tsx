type InputProps = {
    label: string;
    name: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputFloat = ({ label, name, type = "text", value, onChange }: InputProps) => {
    return (
        <div className="form-field">
            <input
                type={type}
                id={name}
                name={name}
                required
                value={value}
                onChange={onChange}
                className="form-input"
            />
            <label htmlFor={name} className="candidate-form-label">{label}<span>*</span></label>
        </div>
    );
};

export default InputFloat;
