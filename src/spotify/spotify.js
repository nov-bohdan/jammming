import AuthToken from "./AuthToken";

const ENDPOINT = "https://api.spotify.com/v1/";
const SPOTIFY_CLIENT_ID = "4bf33f8b9bda4fabb80e1bcc510b375f";
const redirectUri = 'http://localhost:3000';
const authUrl = new URL("https://accounts.spotify.com/authorize");
const scope = 'user-read-private user-read-email';

class Spotify {
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
            }),
        }

        const body = await fetch(url, payload);
        const response = await body.json();
        console.log(`Response: ${JSON.stringify(response)}`);
        AuthToken.save(response);
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
          scope: scope,
          code_challenge_method: 'S256',
          code_challenge: code_challenge_base64,
          redirect_uri: redirectUri,
        };
      
        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString(); // Redirect the user to the authorization server for login
    }

    static search(query) {
        const types = ["track"];
        const url = ENDPOINT + 'search' + '?q=' + query + '&type=' + types.join(',')
        return fetch(url, {
            headers: {
                Authorization: 'Bearer ' + AuthToken.accessToken
            }
        })
        .then(response => {
            return response.json()
        })
        .then(jsonResponse => {
            return jsonResponse.tracks;
        })
    }
}

export default Spotify;