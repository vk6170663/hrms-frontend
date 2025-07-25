import '../../styles/form.css';
import type { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from "react";

type ButtonType = 'default' | 'default-md' | 'sign-up' | 'login' | 'password-toggle' | 'candidate-action' | 'add-candidate';

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
        case 'add-candidate':
            style = 'add-btn';
            break;
        case 'password-toggle':
            style = 'password-toggle-btn';
            break;
        case 'candidate-action':
            style = 'candidate-act';
            break;
        case 'default':
            break;
        default:
            style = '';
            break;
    }

    return (
        <button
            type={type}
            className={`${style} ${containerClass} default-btn`}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;