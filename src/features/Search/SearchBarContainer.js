import React, {useState, useEffect} from 'react';
import SearchBar from './SearchBar';
import Spotify from '../../spotify/Spotify';

function SearchBarContainer() {
    const [ input, setInput ] = useState('');

    function onInputChangeHandler({target}) {
        setInput(target.value);
    };

    async function onSubmitHandler(event) {
        event.preventDefault();
        console.log('Submitting');
        const response = await Spotify.search(input);
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