import React from 'react';
import styles from './SearchBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function SearchBar({onInputChange, input, onSubmit}) {
    return (
        <>
        <form className={styles.searchBar} onSubmit={onSubmit}>
            <div className={styles.inputContainer}>
                <input 
                value={input} 
                id="searchInput" 
                name="searchInput"
                type="text"
                onChange={onInputChange}
                />
                <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.faIcon}/>
            </div>
            <button type="submit" className={styles.searchButton}>Search</button>
        </form>
        </>
    );
}

export default SearchBar;