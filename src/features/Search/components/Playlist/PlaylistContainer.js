import React from "react";
import Playlist from "./Playlist";
import Spotify from "../../../../spotify/Spotify";

function PlaylistContainer({ playlistTracks, playlistName, userId, setPlaylistTracks, setSearchResults, setPlaylistName, setSpotifyPlaylistID, setSpotifySnapshotID, openModal }) {
    function handleRemoveFromPlaylist(target) {
        const targetingId = target.dataset.trackid;
        console.log(`Removing: ${targetingId}`);
        setSearchResults(prevSearchResults => [playlistTracks.find(track => track.id === targetingId), ...prevSearchResults]);
        setPlaylistTracks(prevPlayList => prevPlayList.filter(track => track.id !== targetingId));
    }

    function handlePlaylistNameChange({target}) {
        setPlaylistName(target.value);
    }

    async function handleSaveToSpotify() {
        // Saving playlist to spotify
        try {
            const playlistId = await Spotify.createPlaylist(userId, playlistName)
            setSpotifyPlaylistID(playlistId);
            const snapshotId = await Spotify.addTracksToPlaylist(playlistId, playlistTracks.map(track => track.uri))
            setSpotifySnapshotID(snapshotId);
            openModal(`New playlist created!\nPlaylistID: ${playlistId}\nSnapshotID: ${snapshotId}`);
        } catch (error) {
            console.log(error.message);
            console.log(error.status);
            console.log(error.data);
            openModal(error.message + "\n" + error.status + "\n" + error.data);
        }
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