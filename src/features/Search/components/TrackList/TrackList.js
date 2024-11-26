import Track from "../Track/Track";
import styles from './TrackList.module.css';

function TrackList({ trackList, onAddHandle }) {
    function onClick(event) {
        event.preventDefault();
        onAddHandle(event.target);
    }

    return (
        <div className={styles.trackList}>
            {trackList.map(trackObject => (
                <div className={styles.track} key={trackObject.id}>
                    <Track trackObject={trackObject} />
                    <button className={styles.addButton} data-trackid={trackObject.id} onClick={onClick}>+</button>
                </div>
            ))}
        </div>
    )
}

export default TrackList;