import Track from "../Track/Track";

function TrackList({ trackList }) {
    return (
        <div className="results-list">
            {trackList.map(trackObject => (
                <Track trackObject={trackObject} key={trackObject.id}/>
            ))}
        </div>
    )
}

export default TrackList;