import '../../styles/form.css';
import type { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from "react";

type ButtonType = 'default' | 'default-md' | 'sign-up' | 'login' | 'password-toggle';

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    buttonType?: ButtonType;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    containerClass?: string;
    disabled?: boolean;
    children: ReactNode;
}

const Button: FC<ButtonProps> = ({
    buttonType = 'default',
    type = 'button',
    children,
    containerClass = "",
    disabled = false,
    onClick = () => { },
    ...props
}) => {
    let style = '';
    switch (buttonType) {
        case 'sign-up':
            style = 'form-btn';
            break;
        case 'login':
            style = 'form-btn';
            break;
        case 'password-toggle':
            style = 'password-toggle-btn';
            break;
        case 'default':
            break;
        default:
            style = 'default-btn';
            break;
    }

    return (
        <button
            type={type}
            className={`${style} ${containerClass}`}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;