import Track from "../Track/Track";
import styles from './TrackList.module.css';

function TrackList({ trackList }) {
    return (
        <div className={styles.trackList}>
            {trackList.map(trackObject => (
                <Track trackObject={trackObject} key={trackObject.id}/>
            ))}
        </div>
    )
}

export default TrackList;