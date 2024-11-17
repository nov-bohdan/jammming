// import './App.css';
import Header from './components/Header/Header';
import SearchBarContainer from './components/Search/SearchBarContainer';
import styles from './App.module.css'
import Spotify from './spotify/spotify';
import React, {useState, useEffect} from 'react';

function App() {
  let spotify;

  useEffect(() => {
      async function createSpotify() {
          let accessToken = localStorage.getItem('access_token');
          if (!accessToken || accessToken === 'undefined') {
            console.log('New spotify');
            const codeChallenge = await Spotify.encrypt_codes();
            spotify = new Spotify();
            spotify.authorize(codeChallenge);
            const urlParams = new URLSearchParams(window.location.search);
            let code = urlParams.get('code');
            await spotify.updateToken(code);
          } else {
            console.log('Old spotify');
            spotify = new Spotify(accessToken);
          }
      };
      console.log('Use effect');

      createSpotify();
      console.log(spotify);
  }, []);

  return (
    <div className={styles.App}>
      <Header />
      <SearchBarContainer />
    </div>
  );
}

export default App;
