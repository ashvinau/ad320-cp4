// EntryList.jsx by Joe Wigdor
// AD300 Fall 2024
// The EntryList component represents the content of the application presented as a series of signed and dated entries
// in a list sorted by submission time. This contains the logic for fetching data from the FireStore, as well as
// voting and deletion.

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from 'react';
import { db } from '../firebase';
import {collection, orderBy, query, deleteDoc, doc, updateDoc, getDocs, onSnapshot} from 'firebase/firestore';
import { AuthContext } from '../contexts/AuthContext';
import styles from './EntryList.module.css';

const VOTING_PERIOD_MINUTES = 3;
const CHECK_INTERVAL = 60000; // Fetch data every 60 seconds

// eslint-disable-next-line react/prop-types
const EntryList = ({ isAuthenticated }) => {
    const [entries, setEntries] = useState([]);
    const { currentUser } = useContext(AuthContext);

    const fetchEntries = async () => {
        const q = query(collection(db, 'entries'), orderBy('submissionDate', 'desc'));
        const snapshot = await getDocs(q);

        const newEntries = [];
        const toDelete = [];
        const now = new Date();

        snapshot.forEach((docItem) => {
            const data = docItem.data();
            const submissionDate = data.submissionDate ? data.submissionDate.toDate() : null;
            let expired = false;
            let minutesRemaining = 0;

            if (submissionDate) {
                const diffMs = now - submissionDate;
                const diffMinutes = diffMs / (1000 * 60);
                if (diffMinutes > VOTING_PERIOD_MINUTES) {
                    expired = true;
                } else {
                    // Calculate how many minutes remain
                    minutesRemaining = Math.ceil(VOTING_PERIOD_MINUTES - diffMinutes);
                }
            }

            // If expired and voteCount <= 0, mark for deletion
            if (expired && (data.voteCount || 0) <= 0) {
                toDelete.push(docItem.id);
            } else {
                // Keep the entry and store additional info
                newEntries.push({ id: docItem.id, expired, minutesRemaining, ...data });
            }
        });

        // Delete negative-score expired entries
        for (const id of toDelete) {
            await deleteDoc(doc(db, 'entries', id));
        }

        setEntries(newEntries);
    };

    useEffect(() => {
        // Initial fetch
        fetchEntries();

        // Set up interval to fetch periodically
        const intervalId = setInterval(fetchEntries, CHECK_INTERVAL);

        return () => clearInterval(intervalId);
    }, []);

    // Manual fetch on user interaction
    useEffect(() => {
        const q = query(collection(db, 'entries'), orderBy('submissionDate', 'desc'));
        const unsubscribe = onSnapshot(q, async (snapshot) => {
            const newEntries = [];
            const toDelete = [];

            snapshot.forEach((docItem) => {
                const data = docItem.data();
                const now = new Date();
                const submissionDate = data.submissionDate ? data.submissionDate.toDate() : null;
                let expired = false;
                let minutesRemaining = 0;

                if (submissionDate) {
                    const diffMs = now - submissionDate;
                    const diffMinutes = diffMs / (1000 * 60);
                    if (diffMinutes > VOTING_PERIOD_MINUTES) {
                        expired = true;
                    } else {
                        // Calculate how many minutes remain
                        minutesRemaining = Math.ceil(VOTING_PERIOD_MINUTES - diffMinutes);
                    }
                }

                // If expired and voteCount <= 0, mark for deletion
                if (expired && (data.voteCount || 0) <= 0) {
                    toDelete.push(docItem.id);
                } else {
                    // Keep the entry and store additional info
                    newEntries.push({ id: docItem.id, expired, minutesRemaining, ...data });
                }
            });

            for (const id of toDelete) {
                await deleteDoc(doc(db, 'entries', id));
            }

            setEntries(newEntries);
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'entries', id));
        } catch (error) {
            console.error("Error deleting entry: ", error);
        }
    };

    const handleVote = async (entry, newVote) => {
        if (!currentUser) return; // Must be logged in to vote
        if (entry.expired) return; // No voting after expiration

        const userId = currentUser.uid;
        const entryDocRef = doc(db, 'entries', entry.id);
        const { voters = {}, voteCount = 0 } = entry;
        const oldVote = voters[userId];

        if (oldVote === newVote) {
            return;
        }

        let updatedVoteCount = voteCount;
        let updatedVoters = { ...voters };

        if (!oldVote) {
            // First-time vote
            updatedVoteCount = newVote === 'up' ? voteCount + 1 : voteCount - 1;
            updatedVoters[userId] = newVote;
        } else {
            // Change vote
            if (oldVote === 'up' && newVote === 'down') {
                updatedVoteCount = voteCount - 2;
            } else if (oldVote === 'down' && newVote === 'up') {
                updatedVoteCount = voteCount + 2;
            }
            updatedVoters[userId] = newVote;
        }

        try {
            await updateDoc(entryDocRef, {
                voters: updatedVoters,
                voteCount: updatedVoteCount
            });
        } catch (error) {
            console.error("Error updating vote: ", error);
        }
    };

    return (
        <div className={styles.entryListContainer}>
            <h2>Entries</h2>
            <ul>
                {entries.map((entry) => {
                    const isAuthor = currentUser && currentUser.uid === entry.authorId;
                    const { voteCount = 0, expired, minutesRemaining } = entry;

                    return (
                        <li key={entry.id} className={`${styles.entryItem} entry-item`}>
                            {isAuthenticated && !expired && (
                                <div className={styles.voteButtons}>
                                    <div className={styles.timeRemaining}>
                                        Remaining {minutesRemaining} m
                                    </div>
                                    <div className={styles.voteCount}>
                                        Votes {voteCount}
                                    </div>
                                    <button onClick={() => handleVote(entry, 'up')}>Up</button>
                                    <button onClick={() => handleVote(entry, 'down')}>Down</button>
                                    {isAuthor && (
                                        <button
                                            className={styles.deleteButton}
                                            onClick={() => handleDelete(entry.id)}>
                                            Delete
                                        </button>
                                    )}
                                </div>
                            )}

                            {expired && (
                                <div className={styles.finalTally}>
                                    Score {voteCount}
                                    {isAuthor && (
                                        <button
                                            className={styles.deleteButton}
                                            style={{ marginLeft: '7px' }}
                                            onClick={() => handleDelete(entry.id)}>
                                            Delete
                                        </button>
                                    )}
                                </div>
                            )}

                            <div className={styles.entryContent}>
                                <h3>{entry.title}</h3>
                                <p>{entry.text}</p>
                                <p className={styles.authorName}>{entry.authorName}</p>
                                {entry.submissionDate && (
                                    <p className={styles.submissionDate}>
                                        Submitted: {entry.submissionDate.toDate().toLocaleString()}
                                    </p>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default EntryList;
