import {create} from 'zustand';

export interface IFollowingData
{
    name: string;
    id: string;
}

export interface IUserDataStore
{
    authenticated: boolean;
    code: string | undefined;
    error: string | undefined;
    display_name: string | undefined;
    id: string | undefined;
    profile_img: string | undefined;
    token: string | undefined;
    favorite_artists: IFollowingData[] | undefined;
    login(data: any, code: string): void;
    logout(): void;
    setError(err: string): void;
    setToken(token: string): void;
    setFavoriteArtists(artist_ids: IFollowingData[]): void;
}
const default_state = {
    authenticated: false,
    code: undefined,
    error: undefined,
    display_name: undefined,
    id: undefined,
    profile_img: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
    token: undefined,
    favorite_artists: undefined
};

export const useUserDataStore = create<IUserDataStore>(set => ({
    ...default_state,
    login: (data: any, code: string) => set({
        display_name: data.display_name,
        profile_img: data.images?.[0]?.url || undefined,
        id: data.id,
        authenticated: true,
        code
    }),
    logout: () => set(default_state),
    setError: (err: string) => set(state => ({...state, error: err})),
    setToken: (token: string | undefined) => token && set(state => ({...state, token})),
    setFavoriteArtists: (artist_ids: IFollowingData[]) => set(state => ({...state, favorite_artists: artist_ids}))
}));