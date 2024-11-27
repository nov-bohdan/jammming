import React, {useState} from "react";
import Playlist from "./Playlist";

function PlaylistContainer({ playlistTracks, onRemoveHandle }) {
    const [ playlistName, setPlaylistName ] = useState('Playlist name');
    function onInputChange({target}) {
        setPlaylistName(target.value);
    }

    return (
        <>
            <Playlist playlistTracks={playlistTracks} onRemoveHandle={onRemoveHandle} onInputChange={onInputChange} playlistName={playlistName} />
        </>
    );
}

export default PlaylistContainer