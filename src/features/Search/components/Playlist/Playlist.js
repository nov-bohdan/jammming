import React from "react"
import styles from "./Playlist.module.css";
import TrackList from "../TrackList/TrackList";

function Playlist({ playlistSongs }) {
    return (
        <div className={styles.playlist}>
            <h2>Playlist</h2>
            <TrackList trackList={playlistSongs} />
        </div>
    )
}

export default Playlist