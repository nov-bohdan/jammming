import React, { useState } from "react";
import SearchBarContainer from "./components/SearchBar/SearchBarContainer";
import Spotify from "../../spotify/Spotify";
import SearchResults from "./components/SearchResults/SearchResults";
import PlaylistContainer from "./components/Playlist/PlaylistContainer";
import styles from './SearchFuture.module.css';

function SearchFuture({ userId }) {
    const [ searchResults, setSearchResults ] = useState([]);
    const [ playlistTracks, setPlaylistTracks ] = useState([]);
    const [ playlistName, setPlaylistName ] = useState('Playlist name');
    const [ spotifyPlaylistID, setSpotifyPlaylistID ] = useState(null);
    const [ spotifySnapshotID, setSpotifySnapshotID ] = useState(null);

    function handlePlaylistNameChange({target}) {
        setPlaylistName(target.value);
    }

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

    function handleRemoveFromPlaylist(target) {
        const targetingId = target.dataset.trackid;
        console.log(`Removing: ${targetingId}`);
        setSearchResults(prevSearchResults => [playlistTracks.find(track => track.id === targetingId), ...prevSearchResults]);
        setPlaylistTracks(prevPlayList => prevPlayList.filter(track => track.id !== targetingId));
    }

    function handleSaveToSpotify() {
        // Saving playlist to spotify
        Spotify.createPlaylist(userId, playlistName)
        .then(playlistId => {
            setSpotifyPlaylistID(playlistId);
            return Spotify.addTracksToPlaylist(playlistId, playlistTracks.map(track => track.uri))
        })
        .then(snapshotId => {
            setSpotifySnapshotID(snapshotId);
        });
    }

    return (
        <>
            <SearchBarContainer onSearch={handleSearch} />
            <div className={styles.mainContent}>
                <SearchResults trackList={searchResults} onAddHandle={handleAddToPlaylist} />
                <PlaylistContainer
                    playlistName={playlistName} 
                    playlistTracks={playlistTracks} 
                    onRemoveHandle={handleRemoveFromPlaylist} 
                    onInputChange={handlePlaylistNameChange}
                    onSaveHandle={handleSaveToSpotify}
                />
            </div>
            <button onClick={getSearchResults}>Get results</button>
            <p style={{color: 'white'}}>Playlist ID: {spotifyPlaylistID}</p>
            <p style={{color: 'white'}}>Snapshot ID: {spotifySnapshotID}</p>
        </>
    );
}

export default SearchFuture;