// Footer.jsx by Joe Wigdor
// AD300 Fall 2024
// The Footer component contains the html structure of the footer at the bottom of the viewport. It also contains the
// logic for the search feature. The link to the about page is in the bottom right.

// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import styles from './Footer.module.css';
import {Link} from "react-router-dom";

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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
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
                    onKeyDown={handleKeyDown}
                    className={styles.searchInput}
                />
                <button onClick={handleSearch} className={styles.searchButton}>Search</button>
            </div>
            <div className={styles.copyright}>
                &copy; {new Date().getFullYear()}
                <Link to="/about" className={styles.footerLink}>
                    mini-wiki
                </Link>
                by Joe Wigdor
            </div>
        </footer>
    );
};

export default Footer;
