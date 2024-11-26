import React from 'react';
import TrackList from '../TrackList/TrackList';
import styles from './SearchResults.module.css';

function ResultsContainer({ trackListObject }) {
    let trackList = [];
    if (trackListObject) {
        trackList = trackListObject.trackList || [];
    }
    return (
        <div className={styles.searchResults}>
            <h2>Results</h2>
            <TrackList trackList={trackList} />
        </div>
    );
}

export default ResultsContainer;