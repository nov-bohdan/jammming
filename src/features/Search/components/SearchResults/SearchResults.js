import React from 'react';
import TrackList from '../TrackList/TrackList';
import styles from './SearchResults.module.css';

function SearchResults({ trackList, onAddHandle }) {
    return (
        <div className={styles.searchResults}>
            <h2>Results</h2>
            <TrackList trackList={trackList} onAddHandle={onAddHandle} />
        </div>
    );
}

export default SearchResults;