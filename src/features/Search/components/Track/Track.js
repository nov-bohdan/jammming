import React from 'react';

function Track({ trackObject }) {
    return (
        <div>
            <p id="track-name">{trackObject.name}</p>
            <p id="album-name">Album: {trackObject.albumName}</p>
            <p id="artist-names">{trackObject.artistsName.join(', ')}</p>
        </div>
    );
}

export default Track;