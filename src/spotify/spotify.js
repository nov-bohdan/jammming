import AuthToken from "./AuthToken";

const ENDPOINT = "https://api.spotify.com/v1/";
const SPOTIFY_CLIENT_ID = "4bf33f8b9bda4fabb80e1bcc510b375f";
const redirectUri = 'http://localhost:3000';
const authUrl = new URL("https://accounts.spotify.com/authorize");
const scope = "playlist-read-private, playlist-modify-private, playlist-modify-public, user-read-private, user-read-email";

class SpotifyError extends Error {
    constructor(message, status, data) {
        super(message);
        this.name = 'SpotifyError';
        this.status = status;
        this.data = data;
    }
}

class SpotifyAuthError extends SpotifyError {
    constructor(message, status, data) {
        super(message, status, data);
        this.name = 'SpotifyAuthError';
    }
}

class Spotify {
    static async addTracksToPlaylist(playlistId, uris) {
        const url = ENDPOINT + `playlists/${playlistId}/tracks`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: 'Bearer ' + AuthToken.accessToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uris
            })
        });
        if (!response.ok) {
            const responseText = await response.text();
            throw new SpotifyError('Error adding tracks to playlist', response.status, responseText);
        }
        const responseJson = await response.json();
        return responseJson.snapshot_id;
    }

    static async createPlaylist(userId, name) {
        const url = ENDPOINT + `users/${userId}/playlists`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: 'Bearer ' + AuthToken.accessToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                description: "Test playlist",
                public: false
            })
        });
        if (!response.ok) {
            const responseText = await response.text();
            throw new SpotifyError('Error creating a playlist', response.status, responseText);
        }
        const responseJson = await response.json();
        return responseJson.id;
    }

    static async getUserProfile() {
        const url = ENDPOINT + "me";
        const response = await fetch(url, {
            headers: {
                Authorization: 'Bearer ' + AuthToken.accessToken
            }
        });
        if (!response.ok) {
            const responseText = await response.text();
            throw new SpotifyError('Error getting user\'s profile', response.status, responseText);
        }
        return await response.json();
    }

    static async getUserId() {
        console.log('getting user id');
        const userProfile = await this.getUserProfile();
        const userId = userProfile.id;
        return userId;
    }

    static async updateToken(code) {
        // stored in the previous step
        let codeVerifier = localStorage.getItem('code_verifier');
        const url = "https://accounts.spotify.com/api/token";

        const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: SPOTIFY_CLIENT_ID,
                grant_type: 'authorization_code',
                code,
                redirect_uri: redirectUri,
                code_verifier: codeVerifier,
                scope
            }),
        }

        const response = await fetch(url, payload);
        if (!response.ok) {
            const responseText = await response.text();
            throw new SpotifyAuthError('Error updating token', response.status, responseText);
        }
        const responseJson = await response.json();
        console.log(`Response: ${JSON.stringify(responseJson)}`);
        AuthToken.save(responseJson);
    }

    static async authorize() {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const randomValues = crypto.getRandomValues(new Uint8Array(64));
        const randomString = randomValues.reduce((acc, x) => acc + possible[x % possible.length], "");
      
        const code_verifier = randomString;
        const data = new TextEncoder().encode(code_verifier);
        const hashed = await crypto.subtle.digest('SHA-256', data);
      
        const code_challenge_base64 = btoa(String.fromCharCode(...new Uint8Array(hashed)))
          .replace(/=/g, '')
          .replace(/\+/g, '-')
          .replace(/\//g, '_');
      
        window.localStorage.setItem('code_verifier', code_verifier);
      
        const params = {
          response_type: 'code',
          client_id: SPOTIFY_CLIENT_ID,
          scope,
          code_challenge_method: 'S256',
          code_challenge: code_challenge_base64,
          redirect_uri: redirectUri,
        };
      
        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString(); // Redirect the user to the authorization server for login
    }

    static async search(query) {
        const types = ["track"];
        const url = ENDPOINT + 'search' + '?q=' + query + '&type=' + types.join(',')
        const response = await fetch(url, {
            headers: {
                Authorization: 'Bearer ' + AuthToken.accessToken
            }
        });
        if (!response.ok) {
            const responseText = await response.text();
            throw new SpotifyError('Error performing search', response.status, responseText);
        }
        const responseJson = await response.json();
        return responseJson.tracks;
    }
}

export default Spotify;