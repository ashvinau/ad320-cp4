// App.jsx by Joe Wigdor
// AD300 Fall 2024
// The content presented by index.jsx, describes the overall layout of the Login, NewEntryForm, Header,
// EntryList, and Footer components. Routes and the About page contents are also described here.

// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import {Routes, Route, Navigate, Link} from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import NewEntryForm from './components/NewEntryForm';
import EntryList from './components/EntryList';
import Login from './components/Login';
import styles from "./components/Footer.module.css";

const contentStyle = {
    padding: '20px',
    paddingBottom: '30px'
};

// About page
const About = () => (
    <div style={{ padding: '20px' }}>
        <h2>About Mini-Wiki</h2>
        <p>A simple user-submitted wiki application.</p>
        <p>Created as part of AD320 Web Development at North Seattle College, Fall 2024.</p>
        <Link to="/" className={styles.footerLink}>
            Back to Home
        </Link>
    </div>
);

const App = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div>
            <Header />
            <div style={contentStyle}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            currentUser ? (
                                <>
                                    <NewEntryForm />
                                    <EntryList isAuthenticated={!!currentUser} />
                                </>
                            ) : (
                                <>
                                    <Login />
                                    <EntryList isAuthenticated={false} />
                                </>
                            )
                        }
                    />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

export default App;



