import React from "react"
import styles from "./Playlist.module.css";
import Track from "../Track/Track";

function Playlist({ playlistTracks }) {
    function onClick(event) {
        event.preventDefault();
        // onAddHandle(event.target);
    }

    return (
        <div className={styles.playlist}>
            <h2>Playlist</h2>
            {playlistTracks.map(trackObject => (
                <div className={styles.track} key={trackObject.id}>
                    <Track trackObject={trackObject} />
                    <button className={styles.removeButton} data-trackid={trackObject.id} onClick={onClick}>X</button>
                </div>
            ))}
        </div>
    )
}

export default Playlist