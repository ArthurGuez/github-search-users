import { createContext } from "react";

interface EditModeContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
}

export const EditModeContext = createContext<EditModeContextType | undefined>(
  undefined
);
