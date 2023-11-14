import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

// SignOutButton component
export default function SignOutButton() {
    // Hook to get the navigate function from react-router-dom
    const navigate = useNavigate();

    // Function to sign out the user
    async function signOut() {
        const auth = getAuth();
        await auth.signOut().then(() => {
            // Sign-out successful.
            navigate('/signin'); // Navigate to sign-in page after sign out
        }).catch((error) => {
            // An error happened.
            console.error(error);
        });
    }

    // Render a button that signs out the user when clicked
    return (
        <button className="btn btn-form" onClick={signOut}>Sign Out</button>
    );
}