import { useContext } from "react";
import { EditModeContext } from "../contexts/edit-mode/editModeContext";

export function useEditMode() {
  const context = useContext(EditModeContext);
  if (!context) {
    throw new Error("useEditMode must be used within an EditModeProvider");
  }

  return context;
}
