import React, { useState } from "react";
import SearchBarContainer from "./SearchBarContainer";
import Spotify from "../../spotify/Spotify";
import SpotifyTracks from "../../spotify/SpotifyTracks";

function SearchFuture() {
    const [searchResults, setSearchResults] = useState('');

    async function handleSearch(input) {
        const response = await Spotify.search(input);
        setSearchResults(response);
    }

    return (
        <SearchBarContainer onSearch={handleSearch} />
    );
}

export default SearchFuture;