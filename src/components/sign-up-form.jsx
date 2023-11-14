import { useState } from "react";
import FormInput from "./FormInput";
import Button from "./Button";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "./AuthGoogle";
import '../styles/signUpFormStyle.scss'

// Default form fields
const deafualtFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

// SignUpForm component
const SignUpForm = () => {
    // State variable for the form fields
    const [formFields, setFormFields] = useState(deafualtFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    console.log(formFields);

    // Function to reset the form fields
    const resetFormFields = () => {
        setFormFields(deafualtFormFields)
    }

    // Function to handle the form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if the password and confirm password fields match
        if (password != confirmPassword) {
            alert("passwords do not match")
            return;
        }

        try {
            // Create a new user with the email and password
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            // Create a new user document in the database
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                console.log('user creation encountered an error', error)
            }

        }
    }

    // Function to handle the change event of the input elements
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value })
    }

    // Render the sign up form
    return (
        <div className="sign-up-container">
            <h2>No account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name' type="text" required onChange={handleChange} name="displayName" value={displayName} />

                <FormInput label='Email' type="email" required onChange={handleChange} name="email" value={email} />

                <FormInput label='Password' type="password" required onChange={handleChange} name="password" value={password} />

                <FormInput label='Confirm Password' type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm