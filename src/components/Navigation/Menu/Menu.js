import React from 'react';
import { Link } from 'react-router-dom';

import './Menu.css';

const Menu = () => {
    return (

        <div className="menu-list">
            <ul>
                <li><Link className="btn btn-default" to="/">Recipes</Link></li>
                <li><Link className="btn btn-default" to="/add-new">Add New</Link></li>
            </ul>
        </div>

    );
}

export default Menu;
