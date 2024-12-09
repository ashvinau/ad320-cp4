// eslint-disable-next-line no-unused-vars
import React, {createContext, useEffect, useState} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../firebase';

// Create login context
export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};