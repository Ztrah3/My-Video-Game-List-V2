import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

export default function SignOutButton() {
    const navigate = useNavigate();

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

    return (
        <button className="btn btn-form" onClick={signOut}>Sign Out</button>
    );
}