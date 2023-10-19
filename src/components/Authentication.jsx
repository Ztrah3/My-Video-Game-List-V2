import SignUpForm from './sign-up-form';
import SignInForm from './SignInForm';
import '../styles/authentication.scss'

const Authentication = () => {
    return (
        <div className='authentication-container'>
            <SignInForm />
            <SignUpForm />
        </div>

    );
};

export default Authentication;