import { C_SPOTIFY_ACCOUNT_URL, C_SPOTIFY_API_URL } from "./urls";

export const redirectToAuth = async () => {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", import.meta.env.VITE_client_id);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/home");
    params.append("scope", "user-read-private user-read-email user-follow-read user-library-read user-library-modify");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `${C_SPOTIFY_ACCOUNT_URL}/authorize?${params.toString()}`;
    return (false);
}

const generateCodeVerifier = (length: number) => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export const generateCodeChallenge = async (codeVerifier: string) => {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export const getAccessToken = async (code: string): Promise<string> => {
    const verifier = localStorage.getItem("verifier");
    const params = new URLSearchParams();
    params.append("client_id", import.meta.env.VITE_client_id);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173/home");
    params.append("code_verifier", verifier!);

    const result = await fetch(`${C_SPOTIFY_ACCOUNT_URL}/api/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    if (!result.ok && result.status != 200)
        throw new Error();

    const data = await result.json();
    return data.access_token;
}

export const fetchProfile = async (token: string): Promise<any> => {
    const result = await fetch(`${C_SPOTIFY_API_URL}/v1/me`, {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    if (!result.ok && result.status != 200)
        throw new Error();
    return await result.json();
}

export const getFollowingArtists = async (token: string) => {
    const result = await fetch(`${C_SPOTIFY_API_URL}/v1/me/following?type=artist&limit=3`, {
        method: "GET",
        headers: {Authorization: `Bearer ${token}`}
    });
    if (!result.ok && result.status != 200)
        throw new Error();
    return await result.json();
}

export const getTrackRecommendations = async (token: string, artist_seeds: string[]) => {
    const seed_str = artist_seeds.slice(0, 5).reduce(
        (str: string, id: string, i: number) => i == 0 ? id : str + '%2C' + id,
        ''
    );
    const result = await fetch(`${C_SPOTIFY_API_URL}/v1/recommendations?limit=15&seed_artists=${seed_str}`, {
        method: "GET",
        headers: {Authorization: `Bearer ${token}`}
    });
    if (!result.ok && result.status != 200)
        throw new Error();
    return await result.json();
}

export const getUserFavoriteTracks = async (token: string, limit: number) => {
    const result = await fetch(`${C_SPOTIFY_API_URL}/v1/me/tracks?limit=${limit}`, {
        method: "GET",
        headers: {Authorization: `Bearer ${token}`}
    });
    if (!result.ok && result.status != 200)
        throw new Error();
    return await result.json();
}

export const saveTrackAsFavorite = async (token: string, id: string) => {
    const result = await fetch(`${C_SPOTIFY_API_URL}/v1/me/tracks?ids=${id}`, {
        method: "PUT",
        headers: {Authorization: `Bearer ${token}`}
    });
    if (!result.ok && result.status != 200)
        throw new Error();
}

export const removeTrackFromFavorites = async (token: string, id: string) => {
    const result = await fetch(`${C_SPOTIFY_API_URL}/v1/me/tracks?ids=${id}`, {
        method: "DELETE",
        headers: {Authorization: `Bearer ${token}`}
    });
    if (!result.ok && result.status != 200)
        throw new Error();
}

export const getNextOrPreviousFavoritePage = async (token: string, url: string) => {
    const result = await fetch(url, {
        method: "GET",
        headers: {Authorization: `Bearer ${token}`}
    });
    if (!result.ok && result.status != 200)
        throw new Error();
    return await result.json();
}