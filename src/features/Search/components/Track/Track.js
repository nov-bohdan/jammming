import React from 'react';
import styles from './Track.module.css';

function Track({ trackObject, onAddHandle }) {
    function onClick(event) {
        event.preventDefault();
        onAddHandle(event.target);
    }
    return (
        <div className={styles.track}>
            <div className={styles.trackData}>
                <span id="track-id" style={{display: 'none'}}>{trackObject.id}</span>
                <p id="track-name">{trackObject.name}</p>
                <span id={styles.artistNames}>{trackObject.artistsName.join(', ')}</span> | <span id={styles.albumName}>{trackObject.albumName}</span>
            </div>
            <button className={styles.addButton} data-trackid={trackObject.id} onClick={onClick}>+</button>
        </div>
    );
}

export default Track;