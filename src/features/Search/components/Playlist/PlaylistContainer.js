import React, {useState} from "react";
import Playlist from "./Playlist";

function PlaylistContainer({ playlistTracks, onRemoveHandle }) {

    return (
        <Playlist playlistTracks={playlistTracks} onRemoveHandle={onRemoveHandle} />
    );
}

export default PlaylistContainer