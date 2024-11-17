import React from 'react';

function ResetLocal() {
    function onClick() {
        localStorage.clear();
        console.log('Reset');
    };
    return (
        <button onClick={onClick}>reset local storage</button>
    );
}

export default ResetLocal;