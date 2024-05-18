import { create } from "zustand";

type OpenEmbeddedVideoState = {
  link?: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useOpenEmbeddedVideo = create<OpenEmbeddedVideoState>((set) => ({
  link: undefined,
  isOpen: false,
  onOpen: (link: string) => set({ isOpen: true, link: link }),
  onClose: () => set({ isOpen: false, link: undefined }),
}));
