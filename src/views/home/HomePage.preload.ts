import { IFollowingData, useUserDataStore } from '../../store/user_data';
import { fetchProfile, getAccessToken, getFollowingArtists } from "../../api/spotify";
import { redirect } from 'react-router-dom';



const parseFollowingData = (following: any): IFollowingData[] => {
    const result:IFollowingData[] = [];
    following?.artists?.items?.forEach(({name, id}: any) => result.push({name, id}));
    return (result);
}

export const homePreload = async (code: string) => {
    const {login, setError, setFavoriteArtists, setToken} = useUserDataStore.getState();
    try
    {
        let token = await getAccessToken(code);
        const [profile, following] = await Promise.all([fetchProfile(token), getFollowingArtists(token)]);
        login(profile, code);
        setFavoriteArtists(parseFollowingData(following));
        setToken(token);
        return (null);
    }
    catch(err: any)
    {
        setError(err.toString());
        return redirect('/');
    }
}