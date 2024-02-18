import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer py-3" style={{ paddingBottom: '20px' }}>
            <div className="container text-center chalk-font">
                <span className="text-muted">&copy; {new Date().getFullYear()} CampuzCons</span>
            </div>
        </footer>
    );
};

export default Footer;
