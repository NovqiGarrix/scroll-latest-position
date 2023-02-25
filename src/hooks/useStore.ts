import { create } from 'zustand';
import { IResponse } from '../types';

interface IStore {
    photos: IResponse;
    setPhotos: (photos: IResponse) => void;

    scrollPosition: number;
    setScrollPosition: (scrollPosition: number) => void;
}

const useStore = create<IStore>((set) => ({
    photos: {
        next_page: "",
        page: 1,
        per_page: 18,
        photos: [],
        total_results: 0
    },

    setPhotos(photos) {
        set((state) => ({ photos: { ...state.photos, ...photos, photos: [...state.photos.photos, ...photos.photos] } }));
    },

    scrollPosition: 0,

    setScrollPosition(scrollPosition) {
        set({ scrollPosition });
    },
}));

export default useStore;