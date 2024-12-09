// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import styles from './NewEntryForm.module.css';

const NewEntryForm = () => {
    const { currentUser } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            alert("You must be logged in to submit an entry.");
            return;
        }

        try {
            await addDoc(collection(db, 'entries'), {
                title,
                text,
                authorId: currentUser.uid,
                authorName: currentUser.displayName,
                submissionDate: serverTimestamp(),
                votes: { up: 0, down: 0 }, // initial votes
                voters: {}, // track voters by userId to prevent multiple votes
            });

            setTitle('');
            setText('');
        } catch (error) {
            console.error("Error adding entry: ", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <h2>Create a New Entry</h2>
            <div>
                <label htmlFor="entryTitle">Title:</label>
                <input
                    id="entryTitle"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="entryText">Text:</label>
                <textarea
                    id="entryText"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                />
            </div>

            <button type="submit">Submit Entry</button>
        </form>
    );
};

export default NewEntryForm;
