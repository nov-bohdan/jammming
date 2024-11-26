import React, {useState} from "react";
import Playlist from "./Playlist";

function PlaylistContainer() {
    const [ playlistSongs, setPlaylistSongs ] = useState([]);

    return (
        <Playlist playlistSongs={playlistSongs} />
    );
}

export default PlaylistContainer