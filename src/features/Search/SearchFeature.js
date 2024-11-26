import React, { useState } from "react";
import SearchBarContainer from "./components/SearchBar/SearchBarContainer";
import Spotify from "../../spotify/Spotify";
import ResultsContainer from "./components/SearchResults/SearchResults";
import styles from './SearchFuture.module.css';

function SearchFuture() {
    const [searchResults, setSearchResults] = useState([]);

    function getSearchResults() {
        console.log(searchResults);
    }

    function handleSearch(input) {
        Spotify.search(input)
        .then(spotifyTracks => {
            setSearchResults(spotifyTracks);
        });
    }

    return (
        <>
            <SearchBarContainer onSearch={handleSearch} />
            <div className={styles.mainContent}>
                <ResultsContainer trackListObject={searchResults} />
            </div>
            <button onClick={getSearchResults}>Get results</button>
        </>
    );
}

export default SearchFuture;