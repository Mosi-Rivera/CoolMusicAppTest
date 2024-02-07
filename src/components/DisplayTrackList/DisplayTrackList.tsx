import { displayedTracksStore } from "../../store/displayed_tracks";
import AddFavoriteButton from "../AddFavoriteButton/AddFavoriteButton";
import TrackItem from "../TrackItem/TrackItem";

const DisplayTrackList = () => {
    const {displayed} = displayedTracksStore();
    return (<div className="mt-4 scroll-list">
        {
            displayed.length > 0 ?
            displayed.map((track: any, i: number) => <TrackItem
            data={track} 
            key={'track-item-' + i}
            Button={AddFavoriteButton}
            />)
            :
            <span>NO TRACKS TO SHOW...</span>
        }
    </div>);
}

export default DisplayTrackList;