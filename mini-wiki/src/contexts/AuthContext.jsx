// AuthContext.jsx by Joe Wigdor
// AD300 Fall 2024
// Establishes an authorization context which provides user login information to other components. Whether the user's
// state is logged in determines the behavior of that component, such as what is rendered and interactive.

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