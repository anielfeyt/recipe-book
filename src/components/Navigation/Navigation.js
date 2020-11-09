import React from 'react';
import Menu from './Menu/Menu';
import Logo from './Logo/Logo';
import './Navigation.css';

const Navigation = () => {
    return (
        <div className="Nav-container">
            <Logo />
            <Menu />
        </div>
    );
}

export default Navigation;
