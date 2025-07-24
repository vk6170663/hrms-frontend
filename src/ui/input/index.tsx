import '../../styles/form.css';
import type { FC } from "react";

type InputTypeProps = {
    containerClass?: string;
    placeholder?: string;
    type?: string;
    value?: string;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: FC<InputTypeProps> = ({ placeholder = "", containerClass = "", type, value, disabled = false, onChange, ...restProps }) => {
    return (
        <input
            type={type}
            value={value}
            className={`${containerClass}`}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
            {...restProps}
        />
    );
};

export default Input;