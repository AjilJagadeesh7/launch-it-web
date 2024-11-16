export const alertValues = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "error",
};

export interface StoreState {
  isModalOpen: boolean;
  isIconOnly: boolean;
  showAlert: {
    show: boolean;
    severity: string;
  };
  gamesList: any[];
  setShowAlert: (bool: boolean, alertValue: string) => void;
  setIsModalOpen: (bool: boolean) => void;
  setGamesList: (newGames: any) => void;
  setIsIconOnly: (bool: boolean) => void;
}

export const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-orange-500",
  "bg-teal-500",
  "bg-indigo-500",
  "bg-gray-500",
];
