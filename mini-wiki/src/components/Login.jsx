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
