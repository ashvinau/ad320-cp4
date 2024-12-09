// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import Header from './components/Header';
import Login from './components/Login';
import NewEntryForm from './components/NewEntryForm';
import EntryList from './components/EntryList';
import Footer from "./components/Footer.jsx";

const contentStyle = {
    padding: '20px',
    paddingBottom: '30px'
};

const App = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div>
            <Header />
            {currentUser ? (
                <div style={contentStyle}>
                    <NewEntryForm />
                    <EntryList isAuthenticated={!!currentUser} />
                </div>
            ) : (
                <div style={contentStyle}>
                    <Login />
                    <EntryList isAuthenticated={false} />
                </div>
            )}
            <Footer />
        </div>
    );
};

export default App;


