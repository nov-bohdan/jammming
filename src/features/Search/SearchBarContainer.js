import React, {useState} from 'react';
import SearchBar from './components/SearchBar/SearchBar';

function SearchBarContainer({ onSearch }) {
    const [ input, setInput ] = useState('');

    function onInputChangeHandler({target}) {
        setInput(target.value);
    };

    async function onSubmitHandler(event) {
        event.preventDefault();
        console.log('Submitting');
        await onSearch(input);
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