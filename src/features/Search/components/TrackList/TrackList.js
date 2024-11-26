import Track from "../Track/Track";
import styles from './TrackList.module.css';

function TrackList({ trackList, onAddHandle }) {
    return (
        <div className={styles.trackList}>
            {trackList.map(trackObject => (
                <Track trackObject={trackObject} key={trackObject.id} onAddHandle={onAddHandle} />
            ))}
        </div>
    )
}

export default TrackList;