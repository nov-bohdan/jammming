import React, {useState} from "react";
import Playlist from "./Playlist";

function PlaylistContainer({ playlistTracks, onRemoveHandle, onInputChange, playlistName, onSaveHandle }) {
    return (
        <>
            <Playlist 
                playlistTracks={playlistTracks} 
                onRemoveHandle={onRemoveHandle} 
                onInputChange={onInputChange} 
                playlistName={playlistName} 
                onSaveHandle={onSaveHandle}
            />
        </>
    );
}

export default PlaylistContainer