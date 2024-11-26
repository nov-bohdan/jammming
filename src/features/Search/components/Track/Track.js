import React from 'react';
import styles from './Track.module.css';

function Track({ trackObject }) {
    return (
        <div className={styles.track}>
            <div className={styles.trackData}>
                <p id="track-name">{trackObject.name}</p>
                <span id={styles.artistNames}>{trackObject.artistsName.join(', ')}</span> | <span id={styles.albumName}>{trackObject.albumName}</span>
            </div>
            <button className={styles.addButton}>+</button>
        </div>
    );
}

export default Track;