import React from 'react';
import TrackList from '../TrackList/TrackList';
import styles from './SearchResults.module.css';

function SearchResults({ searchResults, setPlaylistTracks, setSearchResults }) {
    function handleAddToPlaylist(target) {
        const targetingId = target.dataset.trackid;
        console.log(`Adding: ${targetingId}`);
        setPlaylistTracks(prevPlayList => [...prevPlayList, searchResults.find(track => track.id === targetingId)]);
        setSearchResults(prevSearchResults => prevSearchResults.filter(track => track.id !== targetingId));
    }

    return (
        <div className={styles.searchResults}>
            <h2>Results</h2>
            <TrackList trackList={searchResults} onAddHandle={handleAddToPlaylist} />
        </div>
    );
}

export default SearchResults;