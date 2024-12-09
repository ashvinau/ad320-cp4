// Login.jsx by Joe Wigdor
// AD300 Fall 2024
// The Login component is presented to any users who are logged out, in the place of the NewEntryForm. It simply
// contains a button which calls the signInWithPopup method provided by FireBase auth, providing the credentials from
// firebase.js.

import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';

const Login = () => {
    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error signing in: ", error);
        }
    };

    return (
        <div>
            <button onClick={handleLogin}>Sign in with Google</button>
        </div>
    );
};

export default Login;
