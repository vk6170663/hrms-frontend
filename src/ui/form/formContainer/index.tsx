import "../../../styles/form.css";
import FormLeftPanel from "../formLeftPanel";

const FormContainer = ({ children }: { children: React.ReactNode; }) => {
    return (
        <div className="form-container">
            <FormLeftPanel />
            {children}
        </div>
    );
};

export default FormContainer;