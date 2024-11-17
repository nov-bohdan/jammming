import React, {useState, useEffect} from 'react';
import SearchBar from './SearchBar';
import Spotify from './../../spotify/spotify';

function SearchBarContainer() {
    const [ input, setInput ] = useState('');

    function onInputChangeHandler({target}) {
        setInput(target.value);
    };

    function onSubmitHandler() {
        // const response = await Spotify.search(input);
    }

    return (
        <SearchBar 
        onInputChange={onInputChangeHandler}
        input={input}
        onSubmit={onSubmitHandler}
        />
    );
}

export default SearchBarContainer;