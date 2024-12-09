// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react';
import { doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { AuthContext } from '../contexts/AuthContext';
import styles from './Header.module.css';

const Header = () => {
    const [title, setTitle] = useState('mini-wiki');
    const [editMode, setEditMode] = useState(false);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const settingsDoc = doc(db, 'appConfig', 'settings');
        const unsubscribe = onSnapshot(settingsDoc, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.data();
                setTitle(data.title || 'mini-wiki');
            } else {
                // If no doc exists, create one with default title
                setDoc(settingsDoc, { title: 'mini-wiki' });
            }
        });

        return () => unsubscribe();
    }, []);

    const handleTitleClick = () => {
        if (!currentUser) return; // Only logged-in users can edit
        setEditMode(true);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleTitleSave = async () => {
        const settingsDoc = doc(db, 'appConfig', 'settings');
        await updateDoc(settingsDoc, { title });
        setEditMode(false);
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleTitleSave();
        }
    };

    const handleBlur = () => {
        handleTitleSave();
    };

    const handleSignOut = async () => {
        await auth.signOut();
    };

    return (
        <header className={styles.headerContainer}>
            <div className={styles.leftSection}>
                {editMode ? (
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        onBlur={handleBlur}
                        onKeyDown={handleInputKeyDown}
                        className={styles.titleInput}
                        autoFocus
                    />
                ) : (
                    <h1
                        className={styles.siteTitle}
                        onClick={handleTitleClick}
                        style={{ cursor: currentUser ? 'pointer' : 'default' }}
                    >
                        {title}
                    </h1>
                )}
            </div>
            <div>
                {currentUser ? (
                    <div className={styles.userInfo}>
                        <img
                            className={styles.userAvatar}
                            src={currentUser.photoURL}
                            alt="User Avatar"
                        />
                        <span>Welcome, {currentUser.displayName}</span>
                        <button className={styles.signOutButton} onClick={handleSignOut}>Sign Out</button>
                    </div>
                ) : (
                    <div className={styles.userInfo}>
                        <span>Please sign in.</span>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
