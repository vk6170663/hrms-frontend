type InputProps = {
    label: string;
    name: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const InputFloat = ({ label, name, type = "text", value, onChange, onClick }: InputProps) => {
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
                onClick={onClick}
            />
            <label htmlFor={name} className="candidate-form-label">{label}<span>*</span></label>
        </div>
    );
};

export default InputFloat;
