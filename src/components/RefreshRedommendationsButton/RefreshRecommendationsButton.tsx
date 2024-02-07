import { getNewRecommendations } from "../../store/displayed_tracks";

const RefreshRecommendationsButton = () => {
    const handleClick = async () => {
        getNewRecommendations();
    }
    return <>
        <button className="w-full font-semibold bg-green-500 px-4 py-2 text-black" onClick={handleClick} type="button">New Recommendations</button>
    </>
}

export default RefreshRecommendationsButton;