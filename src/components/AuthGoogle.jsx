import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAB9YGXWn7sMAqk2sL1WPmc70gY5kXxYQo",
    authDomain: "my-video-game-list-v2.firebaseapp.com",
    projectId: "my-video-game-list-v2",
    storageBucket: "my-video-game-list-v2.appspot.com",
    messagingSenderId: "239188039567",
    appId: "1:239188039567:web:430de05d45466eb5895dfa"
  };

// Initialize Firebase  
const firebaseApp = initializeApp(firebaseConfig);

// Create a new GoogleAuthProvider instance
const googleprovider = new GoogleAuthProvider();

// Set custom parameters for the Google sign-in popup
googleprovider.setCustomParameters({
    prompt: "select_account"
});

// Export the auth instance
export const auth = getAuth();
// Export the function to sign in with Google popup
export const signInWithGooglePopup = () => signInWithPopup(auth, googleprovider);

// Export the Firestore instance
export const db = getFirestore();

// Function to create a user document from auth
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;
    //Create a reference to a doc in the users collection on Firestore
    const userDocRef = doc(db, 'users', userAuth.uid);
    // Retrieve a snapshot of the doc referred to by the userDocRef that contains the current state of the doc 
    const userSnapshot = await getDoc(userDocRef);

    // check if doc exists in Firestore and if not create one
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        // Create timestamp of when the doc is created
        const createdAt = new Date();

        try {
            // Set data in the doc referred by the userDocRef 
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    // Return the reference for the user doc for later read or update
    return userDocRef;
};

// Function to create a user with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {

    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
};

// Function to sign in a user with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {

    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}