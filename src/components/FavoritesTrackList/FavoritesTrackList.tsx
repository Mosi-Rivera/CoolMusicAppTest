import { favoriteTracksStore } from "../../store/favorite_tracks";
import RemoveFavoriteButton from "../RemoveFavoriteButton/RemoveFavoriteButton";
import TrackItem from "../TrackItem/TrackItem";

const FavoritesTrackList = () => {
    const {favorites} = favoriteTracksStore();
    return (<div className="mt-4 scroll-list">
        {
            favorites.length > 0 ?
            favorites.map((track: any, i: number) => <TrackItem
            data={track}
            key={'track-item-' + i}
            Button={RemoveFavoriteButton}
            />)
            :
            <span>NO FAVORITES TO SHOW...</span>
        }
    </div>);
}

export default FavoritesTrackList;