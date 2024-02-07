import { useEffect, useState } from 'react';
import { ITrack } from "../../store/displayed_tracks";
import { previewAudioStore } from "../../store/preview_audio";
import PauseIcon from "../svg_icons/PauseIcon/PauseIcon";
import PlayIcon from "../svg_icons/PlayIcon/PlayIcon";

const TrackItem = ({data, Button = null}: any) => {
    const [is_playing, setIsPlaying] = useState(false);
    const {set, paused, preview_url} = previewAudioStore();
    const handleTogglePreview = () => {
        const track: ITrack = data;
        if (!track.preview_url) return;
        set(track.preview_url);
    }
    useEffect(() => {
        setIsPlaying(data.preview_url == preview_url && !paused);
    }, [paused, preview_url]);
    return <div className="relative flex justify-between items-center pr-2 mb-4 rounded-md bg-white bg-opacity-25 overflow-hidden">
        <div className="flex">
            <div>
                <span onMouseDown={handleTogglePreview} className={'relative toggle_preview block overflow-hidden w-16 h-16 ' + (data.preview_url ? 'cursor-pointer ' : '') + (is_playing ? 'border-4 border-green-500' : '')}>
                    {
                        data.img_src && <img className='w-max' src={data.img_src.url}/>
                    }
                    {
                        data.preview_url && 
                        <span className="hidden">
                            {
                                is_playing ? <PauseIcon style={{
                                    left: '.75rem',
                                    top: '.75rem'
                                }}/> : <PlayIcon/>
                            }
                        </span>
                    }
                </span>
            </div>
            <div className="flex flex-col justify-start pl-4 pt-2">
                <span className="text-md font-medium max-w-xs truncate">{data.name}</span>
                <span className="text-sm max-w-xs truncate">{data.artist_name}</span>
            </div>
        </div>
        {Button && <Button data={data}/>}
    </div>
}

export default TrackItem;