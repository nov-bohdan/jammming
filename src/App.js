// import './App.css';
import Header from './globalComponents/Header/Header';
import styles from './App.module.css'
import Spotify from './spotify/Spotify';
import React, {useState, useEffect} from 'react';
import AuthToken from './spotify/AuthToken';
import ResetLocal from './features/ResetLocal';
import SearchFuture from './features/Search/SearchFeature';
import Modal from './globalComponents/Modal/Modal';

function App() {
    const [ userId, setUserId ] = useState(null);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ modalMessage, setModalMessage ] = useState('');

    function openModal(message) {
        setModalMessage(message);
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    useEffect(() => {
        async function getUserId() {
            const id = await Spotify.getUserId();
            setUserId(id);
        }

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
            await getUserId();
        };

        console.log('Use effect');

        try {
            if (!AuthToken.accessToken) {
                authSpotify();
            } else {
                console.log(`Token: ${AuthToken.accessToken}`);
                console.log(`Expires: ${AuthToken.expires}`);
                getUserId();
            }
        } catch (error) {
            openModal(error.message);
        }

    }, []);

    return (
        <div className={styles.App}>
            <Header />
            <p style={{color: 'white'}}>userId: {userId}</p>
            <ResetLocal />
            <SearchFuture userId={userId} openModal={openModal} />
            <Modal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} type="success" />
        </div>
    );
}

export default App;
