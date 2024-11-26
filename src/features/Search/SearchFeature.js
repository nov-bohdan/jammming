import React, { useState } from "react";
import SearchBarContainer from "./components/SearchBar/SearchBarContainer";
import Spotify from "../../spotify/Spotify";
import ResultsContainer from "./components/SearchResults/SearchResults";
import PlaylistContainer from "./components/Playlist/PlaylistContainer";
import styles from './SearchFuture.module.css';

function SearchFuture() {
    const [ searchResults, setSearchResults ] = useState(null);
    const [ playlistTracks, setPlaylistTracks ] = useState([]);

    function getSearchResults() {
        console.log(searchResults);
    }

    function handleSearch(input) {
        Spotify.search(input)
        .then(spotifyTracks => {
            setSearchResults(spotifyTracks);
        });
    }

    function handleAddToPlaylist(target) {
        const targetingId = target.dataset.trackid;
        console.log(`Adding: ${targetingId}`);
        setPlaylistTracks(prevPlayList => {
            return [...prevPlayList, searchResults.trackList.find(track => track.id === targetingId)];
        });
        target.innerHTML = '✓';
    }

    return (
        <>
            <SearchBarContainer onSearch={handleSearch} />
            <div className={styles.mainContent}>
                <ResultsContainer trackListObject={searchResults} onAddHandle={handleAddToPlaylist} />
                <PlaylistContainer playlistTracks={playlistTracks} />
            </div>
            <button onClick={getSearchResults}>Get results</button>
        </>
    );
}

export default SearchFuture;