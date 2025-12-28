import type { DetailedFrameResponseDto } from "@/api";
import { create } from "zustand";

interface FrameStore {
    frames: DetailedFrameResponseDto[];
    selectedFrame: DetailedFrameResponseDto | null;
    setFrames: (frames: DetailedFrameResponseDto[]) => void;
    setSelectedFrame: (frame: DetailedFrameResponseDto) => void;
}

export const useFrameStore = create<FrameStore>((set) => ({
    frames: [],
    selectedFrame: null,
    setFrames: (frames) => set({ frames }),
    setSelectedFrame: (frame) => set({ selectedFrame: frame }),
}));