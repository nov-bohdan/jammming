const ENDPOINT = "https://api.spotify.com/v1/";
const SPOTIFY_CLIENT_ID = "140d5ddf148c49c98494fc00b48bf206";
const SPOTIFY_SECRET = "f8fc6e78b1af412da7f7fd7e2ccfa1da";
const redirectUri = 'http://localhost:3000/';
const authUrl = new URL("https://accounts.spotify.com/authorize");
const scope = 'user-read-private user-read-email';


const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomValues = crypto.getRandomValues(new Uint8Array(64));
    const randomString = randomValues.reduce((acc, x) => acc + possible[x % possible.length], "");
    return randomString;
}
  
const sha256 = async (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return await crypto.subtle.digest('SHA-256', data);
}

const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}  

class Spotify {
    constructor(accessToken = null) {
        this._accessToken = accessToken;
    }

    static async encrypt_codes() {
        const codeVerifier  = generateRandomString(64);
        console.log(`codeVerifier: ${codeVerifier}`);
        const hashed = await sha256(codeVerifier)
        console.log(`hashed: ${hashed}`);
        const codeChallenge = base64encode(hashed);
        console.log(`codeChallenge: ${codeChallenge}`);
        
        // generated in the previous step
        window.localStorage.setItem('code_verifier', codeVerifier);
        console.log(`localStorage codeVerifier: ${localStorage.getItem('code_verifier')}`);
        return codeChallenge;
    }

    async updateToken(code) {
        // stored in the previous step
        let codeVerifier = localStorage.getItem('code_verifier');
        const url = "https://accounts.spotify.com/api/token";
        console.log(`Code verifier in updateToken: ${codeVerifier}`);
        console.log(`Code: ${code}`);

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
        alert(1);

        localStorage.setItem('access_token', response.access_token);
        this._accessToken = response.access_token;
    }

    authorize(codeChallenge) {
        const params =  {
            response_type: 'code',
            client_id: SPOTIFY_CLIENT_ID,
            scope,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            redirect_uri: redirectUri,
        }

        console.log(params);

        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString();
    }

    async search(query) {
        const types = ["album", "artist", "playlist", "track", "show", "episode", "audiobook"];
        const url = ENDPOINT + '/search' + '?q=' + query + '&type=' + types.join(',')
        const response = await fetch(url);
        console.log(response);
    }
}

export default Spotify;