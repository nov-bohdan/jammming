import React from "react";
import styles from './SavePlaylist.module.css';

function SavePlaylist({ onSaveHandle }) {
    function onClick(event) {
        event.preventDefault();
        onSaveHandle(event);
    }

    return (
        <button className={styles.saveButton} onClick={onClick}>Save playlist</button>
    );
}

export default SavePlaylist;