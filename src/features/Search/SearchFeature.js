import React, { useState } from "react";
import SearchBarContainer from "./components/SearchBar/SearchBarContainer";
import Spotify from "../../spotify/Spotify";
import SearchResults from "./components/SearchResults/SearchResults";
import Playlist from "./components/Playlist/Playlist";
import styles from './SearchFuture.module.css';
import PlaylistContainer from "./components/Playlist/PlaylistContainer";

function SearchFuture({ userId }) {
    const [ searchResults, setSearchResults ] = useState([]);
    const [ playlistTracks, setPlaylistTracks ] = useState([]);
    const [ playlistName, setPlaylistName ] = useState('Playlist name');
    const [ spotifyPlaylistID, setSpotifyPlaylistID ] = useState(null);
    const [ spotifySnapshotID, setSpotifySnapshotID ] = useState(null);

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

    return (
        <>
            <SearchBarContainer onSearch={handleSearch} />
            <div className={styles.mainContent}>
                <SearchResults 
                    searchResults={searchResults} 
                    setPlaylistTracks={setPlaylistTracks}
                    setSearchResults={setSearchResults}
                />
                <PlaylistContainer
                    playlistTracks={playlistTracks}
                    playlistName={playlistName}
                    userId={userId}
                    setPlaylistTracks={setPlaylistTracks}
                    setSearchResults={setSearchResults}
                    setPlaylistName={setPlaylistName}
                    setSpotifyPlaylistID={setSpotifyPlaylistID}
                    setSpotifySnapshotID={setSpotifySnapshotID}
                />
            </div>
            <button onClick={getSearchResults}>Get results</button>
            <p style={{color: 'white'}}>Playlist ID: {spotifyPlaylistID}</p>
            <p style={{color: 'white'}}>Snapshot ID: {spotifySnapshotID}</p>
        </>
    );
}

export default SearchFuture;