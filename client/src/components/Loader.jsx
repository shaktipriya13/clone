import React from 'react';
import '../styles/Loader.css';

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="loader-symbol"></div>
            <div className="loader-text">Hang On, Loading Content</div>
        </div>
    );
};

export default Loader;
