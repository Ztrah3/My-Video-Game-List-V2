import { useState } from "react";
import FormInput from "./FormInput";
import Button from "./Button";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "./AuthGoogle";
import '../styles/signInFormStyle.scss'

// // Declare default form fields
const deafualtFormFields = {
    email: '',
    password: '',
}

// Set form fields state to default form fields
const SignInForm = () => {
    // State variable for the form fields
    const [formFields, setFormFields] = useState(deafualtFormFields);
    const { email, password } = formFields;
    // Function to reset the form fields
    const resetFormFields = () => {
        setFormFields(deafualtFormFields)
    }

     // Function to sign in with Google
    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    // Function to handle the form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Attempt to sign in the user with the provided email and password
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();
        } catch (error) {
             // If the error code indicates invalid login credentials, alert the user
            if (error.code === 'auth/invalid-login-credentials') {
                alert('Incorrect user credentials')
            }
            console.log(error);
        }
    }

    // Function to handle the change event of the input elements
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value })
    }
    // Render the sign in form
    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label='Password' type="password" required onChange={handleChange} name="password" value={password} />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button buttonType="google" onClick={signInWithGoogle} >Google sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm