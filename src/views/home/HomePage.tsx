import Header from '../../components/Header/Header';
import Container from '../../components/Container/Container';
import DisplayTrackList from '../../components/DisplayTrackList/DisplayTrackList';
import RefreshRecommendationsButton from '../../components/RefreshRedommendationsButton/RefreshRecommendationsButton';
import FavoritesSection from '../../components/FavoritesSection/FavoritesSection';
import Footer from '../../components/Footer/Footer';
import { useEffect } from 'react';
import { displayedTracksStore, getNewRecommendations } from '../../store/displayed_tracks';
import { useUserDataStore } from '../../store/user_data';
import { populateFavorites } from '../../store/favorite_tracks';

const HomePage = () => {
    const token = useUserDataStore(state => state.token);
    const {displayed} = displayedTracksStore();
    useEffect(() => {
        if (!token) return;
        populateFavorites().finally(() => {
            if (displayed.length == 0)
                getNewRecommendations();
        });
    },[]);
    return (<Container>
            <Header/>
            <main className='px-2 flex flex-row flex-wrap justify-center'>
                <section className='max-w-lg w-full px-2 box-content'>
                    <RefreshRecommendationsButton/>
                    <DisplayTrackList/>
                </section>
                <FavoritesSection hide="sm"/>
            </main>
            {/* <Footer/> */}
        </Container>);
}

export default HomePage;