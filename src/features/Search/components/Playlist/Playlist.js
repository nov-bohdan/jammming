import React from "react"
import styles from "./Playlist.module.css";
import Track from "../Track/Track";
import SavePlaylist from "./SavePlaylist";

function Playlist({ playlistTracks, onRemoveHandle, playlistName, onInputChange, onSaveHandle }) {
    function onClick(event) {
        event.preventDefault();
        onRemoveHandle(event.target);
    }

    return (
        <div className={styles.playlist}>
            <form>
                <div className={styles.inputContainer}>
                    <span style={{marginRight: 10}}>✏️</span>
                    <input type="text" name="playlistName" value={playlistName} id={styles.playlistName} onChange={onInputChange} />
                </div>
            </form>

            {playlistTracks.map(trackObject => (
                <div className={styles.track} key={trackObject.id}>
                    <Track trackObject={trackObject} />
                    <button className={styles.removeButton} data-trackid={trackObject.id} onClick={onClick}>X</button>
                </div>
            ))}

            <SavePlaylist onSaveHandle={onSaveHandle} />
        </div>
    )
}

export default Playlist