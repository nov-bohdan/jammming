import React, { useState } from "react";
import SearchBarContainer from "./components/SearchBar/SearchBarContainer";
import Spotify from "../../spotify/Spotify";
import SearchResults from "./components/SearchResults/SearchResults";
import PlaylistContainer from "./components/Playlist/PlaylistContainer";
import styles from './SearchFuture.module.css';

function SearchFuture() {
    const [ searchResults, setSearchResults ] = useState([]);
    const [ playlistTracks, setPlaylistTracks ] = useState([]);

    function getSearchResults() {
        console.log(searchResults);
    }

    function handleSearch(input) {
        Spotify.search(input)
        .then(spotifyTracks => {
            const trackList = spotifyTracks.items.map(track => {
                const { id, href, name, preview_url, uri, artists, album } = track;
                const artistsName = artists.map(artist => artist.name);
                const albumName = album.name;
                return { id, href, name, preview_url, uri, artistsName, albumName };
            });
            setSearchResults(trackList);
        });
    }

    function handleAddToPlaylist(target) {
        const targetingId = target.dataset.trackid;
        console.log(`Adding: ${targetingId}`);
        setPlaylistTracks(prevPlayList => [...prevPlayList, searchResults.find(track => track.id === targetingId)]);
        setSearchResults(prevSearchResults => prevSearchResults.filter(track => track.id !== targetingId));
    }

    return (
        <>
            <SearchBarContainer onSearch={handleSearch} />
            <div className={styles.mainContent}>
                <SearchResults trackList={searchResults} onAddHandle={handleAddToPlaylist} />
                <PlaylistContainer playlistTracks={playlistTracks} />
            </div>
            <button onClick={getSearchResults}>Get results</button>
        </>
    );
}

export default SearchFuture;