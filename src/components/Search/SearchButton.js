import React from 'react';
import styles from './SearchButton.module.css';

function SearchButton() {
    return (
        <button type="submit" className={styles.searchButton}>Search</button>
    );
}

export default SearchButton;