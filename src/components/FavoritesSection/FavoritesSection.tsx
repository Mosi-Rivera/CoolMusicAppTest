import {useState, useEffect} from 'react';
import FavoritesTrackList from "../FavoritesTrackList/FavoritesTrackList";
import LeftIcon from "../svg_icons/LeftIcon/LeftIcon";
import RightIcon from "../svg_icons/RightIcon/RightIcon";
import { favoriteTracksStore, getNextFavorites, getPreviousFavorites } from '../../store/favorite_tracks';
const icon_style = {
    width: '2rem',
    height: '2rem',
    cursor: 'pointer',
    position: 'relative',
    bottom: '.1rem'
};

const Pagination = () => {
    const {page, next, prev} = favoriteTracksStore();
    const [current_page, setPage] = useState(page);
    useEffect(() => setPage(page), [page]);
    return <div className='flex flex-row pr-4 py-2'>
        <span onClick={getPreviousFavorites} className={prev ? 'green-svg' : 'black-svg'}>
            <LeftIcon style={icon_style}/>
        </span>
        <span className='mx-2 font-semibold text-xl'>{current_page}</span>
        <span onClick={getNextFavorites} className={next ? 'green-svg' : 'black-svg'}>
            <RightIcon style={icon_style}/>
        </span>
    </div>
}

const FavoritesSection = ({hide = null}: any) => {
    return (<section className={'max-w-lg w-full ' + (hide ? `hidden lg:block` : '')}>
        <div className="flex justify-between">
            <h2 className='px-4 py-2 text-xl text-green-500'>FAVORITES</h2>
            <Pagination/>
        </div>
        <FavoritesTrackList/>
    </section>)
};

export default FavoritesSection;