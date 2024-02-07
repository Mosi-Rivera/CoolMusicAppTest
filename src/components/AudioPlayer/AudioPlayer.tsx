import { useRef, useEffect } from 'react';
import { previewAudioStore } from "../../store/preview_audio"

const AudioPlayer = () => {
    const ref: any = useRef();
    const {
        preview_url,
        force_toggle,
        setForceToggle,
        setPaused
    } = previewAudioStore();
    const handleOnPlay = () => setPaused(false);
    const handleOnPause = () => setPaused(true);
    useEffect(() => {
        if (force_toggle)
        {
            setForceToggle(false);
            if (ref.current.paused)
                ref.current.play();
            else
                ref.current.pause();
        }
    },[force_toggle]);
    return <>
        <audio className='bg-black' src={preview_url} controls controlsList='noplaybackrate' autoPlay ref={ref} onPlay={handleOnPlay} onPause={handleOnPause}/>
    </>;
}


export default AudioPlayer;