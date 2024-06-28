import React from 'react';
import { Link } from 'react-router-dom';

const MenuHeader = () =>{
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/add">Add New</Link>
                </li>
            </ul>
        </nav>
    );
};

export default MenuHeader;