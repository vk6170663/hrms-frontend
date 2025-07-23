import '../../styles/form.css';
import type { FC } from "react";

type LableProps = {
    containerClass?: string;
    children: React.ReactNode;
};

const Label: FC<LableProps> = ({ containerClass = "", children }) => {
    return (
        <label className={`${containerClass} form-label`}>
            {children}
        </label>
    );
};

export default Label;