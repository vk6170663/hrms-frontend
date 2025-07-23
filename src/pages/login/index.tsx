import "../../styles/form.css";
import Logo from "../../ui/logo";
import FormContainer from "../../ui/form/formContainer";
import LoginForm from "../../ui/login";

const Login = () => {
    return (
        <div className="form-page">
            <Logo />
            <FormContainer>
                <LoginForm />
            </FormContainer>
        </div>

    );
};

export default Login;
