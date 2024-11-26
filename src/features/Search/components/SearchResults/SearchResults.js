import React from 'react';
import TrackList from '../TrackList/TrackList';

function ResultsContainer({ trackListObject }) {
    let trackList = [];
    if (trackListObject) {
        trackList = trackListObject.trackList || [];
    }
    return (
        <div>
            <h2>Results</h2>
            <TrackList trackList={trackList} />
        </div>
    );
}

export default ResultsContainer;