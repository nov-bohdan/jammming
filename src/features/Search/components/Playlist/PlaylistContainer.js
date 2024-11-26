import React, {useState} from "react";
import Playlist from "./Playlist";

function PlaylistContainer({ playlistTracks }) {

    return (
        <Playlist playlistTracks={playlistTracks} />
    );
}

export default PlaylistContainer