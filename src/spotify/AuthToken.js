const AuthToken = {
    get accessToken() { return localStorage.getItem('access_token') || null },
    get expires() { return localStorage.getItem('expires') || null },
    get refreshToken() { return localStorage.getItem('refresh_token') || null },
    
    save: function(response) {
        const { access_token, expires_in, refresh_token } = response;
        const now = new Date();
        const expireDate = new Date(now.getTime() + (expires_in * 1000));
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('expires', expireDate);
        localStorage.setItem('refresh_token', refresh_token);
    }
}

export default AuthToken;