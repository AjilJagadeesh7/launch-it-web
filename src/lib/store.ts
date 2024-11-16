import { create } from "zustand";
import { alertValues, StoreState } from "./constants";

const useStore = create<StoreState>((set) => ({
  isModalOpen: false,
  isIconOnly: false,
  gamesList: [],
  showAlert: {
    show: false,
    severity: alertValues.info,
  },
  setShowAlert: (bool: boolean, alertValue: string) =>
    set(() => ({
      showAlert: {
        show: bool,
        severity: alertValue,
      },
    })),
  setIsModalOpen: (bool: boolean) =>
    set(() => ({
      isModalOpen: bool,
    })),
  setGamesList: (newGames: any) =>
    set(() => ({
      gamesList: newGames,
    })),
  setIsIconOnly: (bool: boolean) =>
    set(() => ({
      isIconOnly: bool,
    })),
}));

export default useStore;
