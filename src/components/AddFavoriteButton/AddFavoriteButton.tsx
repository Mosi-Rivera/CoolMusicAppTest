import { removeDisplayedTrack } from "../../store/displayed_tracks";
import { addTrack } from "../../store/favorite_tracks";
import AddIcon from "../svg_icons/AddIcon/AddIcon";

const AddFavoriteButton = ({data}: any) => {
    const handleAddButton = () => {
        addTrack(data);
        removeDisplayedTrack(data.id);
    }
    return <div className="w-16 text-center green-svg">
        {<button onMouseDown={handleAddButton} type="button" className="absolute rounded-none bottom-0 top-0 right-0 button w-16 self-center text-base text-black font-medium hover:bg-white hover:bg-opacity-20">
            <AddIcon style={{
                position: 'absolute',
                width: '1.2rem',
                left: '1.4rem',
                top: '1.4rem'
            }}/>
        </button>}
    </div>
}

export default AddFavoriteButton;