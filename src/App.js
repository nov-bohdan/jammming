// import './App.css';
import Header from './components/Header/Header';
import styles from './App.module.css'
import Spotify from './spotify/Spotify';
import React, {useState, useEffect} from 'react';
import AuthToken from './spotify/AuthToken';
import ResetLocal from './features/ResetLocal';
import SearchFuture from './features/Search/SearchFeature';

function App() {

    useEffect(() => {
        async function authSpotify() {
            const urlParams = new URLSearchParams(window.location.search);
            let code = urlParams.get('code');
            if (code) {
            await Spotify.updateToken(code);
            const url = new URL(window.location.href);
            url.searchParams.delete("code");

            const updatedUrl = url.search ? url.href : url.href.replace('?', '');
            window.history.replaceState({}, document.title, updatedUrl);
            } else {
            await Spotify.authorize();
            }
        };
        console.log('Use effect');

        if (!AuthToken.accessToken) {
            authSpotify();
        } else {
            console.log(`Token: ${AuthToken.accessToken}`);
            console.log(`Expires: ${AuthToken.expires}`);
        }
    }, []);

    return (
        <div className={styles.App}>
            <Header />
            <ResetLocal />
            <SearchFuture />
        </div>
    );
}

export default App;
