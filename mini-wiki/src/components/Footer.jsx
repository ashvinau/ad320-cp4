// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        const entries = document.querySelectorAll('.entry-item h3');
        let found = false;

        for (const titleEl of entries) {
            if (titleEl.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
                titleEl.closest('.entry-item').scrollIntoView({ behavior: 'smooth', block: 'center' });
                found = true;
                break;
            }
        }

        if (!found) {
            alert('No entries found with that title.');
        }
    };

    return (
        <footer className={styles.footerContainer}>
            <div className={styles.searchSection}>
                <input
                    type="text"
                    placeholder="Search entries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <button onClick={handleSearch} className={styles.searchButton}>Search</button>
            </div>
            <div className={styles.copyright}>
                &copy; {new Date().getFullYear()} mini-wiki by Joe Wigdor
            </div>
        </footer>
    );
};

export default Footer;
