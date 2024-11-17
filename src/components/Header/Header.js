import React from 'react';
import logo from '../../assets/logo.png';
import styles from './Header.module.css';

function Header() {
    return (
        <header className={styles.header}>
            <img src={logo} alt="logo" />
        </header>
    );
}

export default Header;