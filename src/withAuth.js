import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const [token, setToken] = useState(localStorage.getItem('token'));

        useEffect(() => {
            const handleStorageChange = () => {
                setToken(localStorage.getItem('token'));
            };

            // Dodanie nasłuchiwania na zdarzenie storage
            window.addEventListener('storage', handleStorageChange);

            // Usunięcie nasłuchiwania po odmontowaniu komponentu
            return () => {
                window.removeEventListener('storage', handleStorageChange);
            };
        }, []);

        if (!token) {
            return <Navigate to="/login" />;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
