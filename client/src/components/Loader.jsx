import React from 'react';
import '../styles/Loader.css';

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="loader-symbol"></div>
            <div className="loader-text">Content getting loaded</div>
        </div>
    );
};

export default Loader;
