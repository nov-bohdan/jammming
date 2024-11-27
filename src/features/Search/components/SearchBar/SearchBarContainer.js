import React, {useState} from 'react';
import SearchBar from './SearchBar';
import Spotify from '../../../../spotify/Spotify';

function SearchBarContainer({ setSearchResults }) {
    const [ input, setInput ] = useState('');

    function handleSearch(event) {
        event.preventDefault();
        Spotify.search(input)
        .then(spotifyTracks => {
            const trackList = spotifyTracks.items.map(track => {
                const { id, href, name, preview_url, uri, artists, album } = track;
                const artistsName = artists.map(artist => artist.name);
                const albumName = album.name;
                return { id, href, name, preview_url, uri, artistsName, albumName };
            });
            setSearchResults(trackList);
        });
    }

    function onInputChangeHandler({target}) {
        setInput(target.value);
    };

    return (
        <SearchBar 
        onInputChange={onInputChangeHandler}
        onSubmit={handleSearch}
        input={input}
        />
    );
}

export default SearchBarContainer;