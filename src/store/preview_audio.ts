import {create} from 'zustand';

export interface IPreviewAudio
{
    preview_url: string | undefined;
    force_toggle: boolean;
    paused: boolean;
    force_current_time: number | null;
    setCurrentTime(ct: number|null): void;
    set(preview_url: string): void;
    setForceToggle(b: boolean): void;
    setPaused(p: boolean): void;
}

export const previewAudioStore = create<IPreviewAudio>(set => ({
    preview_url: undefined,
    force_toggle: false,
    paused: true,
    force_current_time: null,
    set: (url: string) => set(state => (
        state.preview_url == url ? {...state, force_toggle: true} : {preview_url: url, force_toggle: false}
    )),
    setForceToggle: (b) => set(state => ({...state, force_toggle: b})),
    setPaused: (p: boolean) => set(state => ({...state, paused: p})),
    setCurrentTime: (ct) => set(state => ({...state, force_current_time: ct})),
}));