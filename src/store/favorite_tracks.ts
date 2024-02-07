import {create} from 'zustand';
import { getNextOrPreviousFavoritePage, getUserFavoriteTracks, removeTrackFromFavorites, saveTrackAsFavorite } from '../api/spotify';
import { useUserDataStore } from './user_data';
import { ITrack, parseTrack } from './displayed_tracks';

export interface IFavoriteTracksStore
{
    favorites: any[];
    limit: number;
    next: string | null;
    prev: string | null;
    page: number;
    populated: boolean;
    setPage(
        data: any,
        increment: number|null
    ): void;
    add(data: any): void;
    remove(id: any): void;
    reset(): void;
}

const default_value = {
    favorites: [],
    limit: 15,
    next: null,
    prev: null,
    page: 1,
    populated: false
}

const parseFavorites = (data: any) => {
    const items = data.items;
    const result: ITrack[] = items.map(({track}: any) => (parseTrack(track)));
    return result;
}

export const favoriteTracksStore = create<IFavoriteTracksStore>(set => ({
    ...default_value,
    add: (track) => set(state => ({favorites: [
        track,
        ...state.favorites
    ]})),
    setPage: (data: any, increment: number|null) => set(state => {
        const favorites = parseFavorites(data);
        const next = data.next;
        const prev = data.previous;
        const limit = data.limit;
        const page = increment ? state.page + increment : 1;
        const result = {
            favorites,
            next,
            prev,
            limit,
            page,
            populated: true
        };
        return (result);
    }),
    remove: (id) => set(state => ({ favorites: state.favorites.filter(track => track.id != id)})),
    reset: () => set({...default_value, favorites: []})
}));

export const populateFavorites = async () => {
    const {setPage, limit, favorites:current_favorites} = favoriteTracksStore.getState();
    const token = useUserDataStore.getState().token;
    if (!token || current_favorites.length != 0) return;
    const favorites = await getUserFavoriteTracks(token, limit);
    setPage(favorites, null);
}

export const getNextFavorites = async () => {
    const token = useUserDataStore.getState().token;
    const {next, setPage} = favoriteTracksStore.getState();
    if (!token || !next) return;
    const favorites = await getNextOrPreviousFavoritePage(token, next);
    setPage(favorites, 1);
}

export const getPreviousFavorites = async () => {
    const token = useUserDataStore.getState().token;
    const {prev, setPage} = favoriteTracksStore.getState();
    if (!token || !prev) return;
    const favorites = await getNextOrPreviousFavoritePage(token, prev);
    setPage(favorites, -1);
}

export const addTrack = async (track: ITrack) =>
{
    const token = useUserDataStore.getState().token;
    if (!token) return;
    saveTrackAsFavorite(token, track.id);
    favoriteTracksStore.getState().add(track);
}

export const removeTrack = async (id: string) => {
    const token = useUserDataStore.getState().token;
    if (!token) return;
    removeTrackFromFavorites(token, id);
    favoriteTracksStore.getState().remove(id);
}