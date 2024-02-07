import {create} from 'zustand';
import { getTrackRecommendations } from '../api/spotify';
import { IFollowingData, useUserDataStore } from './user_data';
import { favoriteTracksStore } from './favorite_tracks';
const C_DEFAULT_ARTIST_SEED = '7opp16lU7VM3l2WBdGMYHP';

export interface IDisplayedTracksStore
{
    displayed: any[];
    set(tracks: any[]): void;
    remove(id: any): void;
}

export interface ITrack
{
    name: string;
    artist_name: string | undefined;
    artist_id: string | undefined;
    preview_url: string;
    img_src: string | undefined;
    id: string;
}

export const parseTrack = (track: any) => {
    return {
        name: track.name,
        artist_name: track.artists?.[0]?.name,
        artist_id: track.artists?.[0]?.id,
        preview_url: track.preview_url,
        img_src: track.album?.images?.[0],
        id: track.id
    };
}

const parseTracks = ({tracks}: any): ITrack[] => {
    const result = tracks.map((track: any) => (parseTrack(track)));
    return result;
}

export const displayedTracksStore = create<IDisplayedTracksStore>(set => ({
    displayed: [],
    set: (tracks: any[]) => set({displayed: parseTracks(tracks)}),
    remove: (id: string) => set(state => ({displayed: state.displayed.filter((track: any) => {
        return track.id != id
    })}))
}));

export const getNewRecommendations = async () => {
    const { token } = useUserDataStore.getState();
    if (!token) return;
    const { set } = displayedTracksStore.getState();
    const { favorite_artists } = useUserDataStore.getState();
    const favorites = favoriteTracksStore.getState().favorites;
    let artist_seeds: string[] = favorites.reduce((arr, track) => {
        if (track.artist_id)
            arr.push(track.artist_id);
        return (arr);
    }, []);
    if (favorite_artists)
        artist_seeds = favorite_artists.reduce(
            (arr: string[], artist: IFollowingData) => { arr.push(artist.id); return (arr); },
            artist_seeds
        );
    if (artist_seeds.length == 0)
        artist_seeds = [C_DEFAULT_ARTIST_SEED];
    set(await getTrackRecommendations(token, artist_seeds));
}

export const removeDisplayedTrack = async (id: string) => {
    const {remove} = displayedTracksStore.getState();
    remove(id);
    if (displayedTracksStore.getState().displayed.length === 0)
        getNewRecommendations();
}