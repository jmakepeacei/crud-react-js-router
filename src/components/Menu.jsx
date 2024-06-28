import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Index</Link>
                </li>
                <li>
                    <Link to="/list">Pages</Link>
                </li>
                <li>
                    <Link to="/other">Other</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;