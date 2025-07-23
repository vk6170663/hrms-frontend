import '../../styles/form.css';
import Logo from '../../ui/logo';
import FormContainer from '../../ui/form/formContainer';
import SignupForm from '../../ui/sign-up';

const Signup = () => {
    return (
        <div className="form-page">
            <Logo />
            <FormContainer>
                <SignupForm />
            </FormContainer>

        </div>
    );
};

export default Signup;