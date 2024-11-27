import React from "react";
import Playlist from "./Playlist";
import Spotify from "../../../../spotify/Spotify";

function PlaylistContainer({ playlistTracks, playlistName, userId, setPlaylistTracks, setSearchResults, setPlaylistName, setSpotifyPlaylistID, setSpotifySnapshotID }) {
    function handleRemoveFromPlaylist(target) {
        const targetingId = target.dataset.trackid;
        console.log(`Removing: ${targetingId}`);
        setSearchResults(prevSearchResults => [playlistTracks.find(track => track.id === targetingId), ...prevSearchResults]);
        setPlaylistTracks(prevPlayList => prevPlayList.filter(track => track.id !== targetingId));
    }

    function handlePlaylistNameChange({target}) {
        setPlaylistName(target.value);
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
        <Playlist
            playlistName={playlistName} 
            playlistTracks={playlistTracks} 
            onRemoveHandle={handleRemoveFromPlaylist} 
            onInputChange={handlePlaylistNameChange}
            onSaveHandle={handleSaveToSpotify}
        />
    )
}

export default PlaylistContainer;