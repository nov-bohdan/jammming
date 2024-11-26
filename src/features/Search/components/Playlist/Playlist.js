import React from "react"
import styles from "./Playlist.module.css";
import TrackList from "../TrackList/TrackList";

function Playlist({ playlistTracks }) {
    return (
        <div className={styles.playlist}>
            <h2>Playlist</h2>
            <TrackList trackList={playlistTracks} />
        </div>
    )
}

export default Playlist