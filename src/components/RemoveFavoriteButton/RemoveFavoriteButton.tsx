import { removeTrack } from "../../store/favorite_tracks";
import RemoveIcon from "../svg_icons/RemoveIcon/RemoveIcon";
const RemoveFavoriteButton = ({data}: any) => {
    const handleRemoveButton = () => removeTrack(data.id);
    return <div className="w-16 text-center black-svg">
        {<button onMouseDown={handleRemoveButton} type="button" className="absolute rounded-none bottom-0 top-0 right-0 button w-16 self-center text-black font-medium hover:bg-white hover:bg-opacity-20">
            <RemoveIcon style={{
                position: 'absolute',
                width: '1.2rem',
                left: '1.4rem',
                top: '1.4rem'
            }}/>
        </button>}
    </div>
}

export default RemoveFavoriteButton;