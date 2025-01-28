import type { ReactNode } from "react";
import { useState } from "react";
import { EditModeContext } from "./editModeContext";

export default function EditModeProvider({
  children,
  isEnabled = false,
}: {
  children: ReactNode;
  isEnabled?: boolean;
}) {
  const [isEditMode, setIsEditMode] = useState(isEnabled);

  const toggleEditMode = () => {
    setIsEditMode((prevState) => !prevState);
  };

  return (
    <EditModeContext.Provider value={{ isEditMode, toggleEditMode }}>
      {children}
    </EditModeContext.Provider>
  );
}
