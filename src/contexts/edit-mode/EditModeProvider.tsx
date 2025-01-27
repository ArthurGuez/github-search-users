import type { ReactNode } from "react";
import { useState } from "react";
import { EditModeContext } from "./editModeContext";

export default function EditModeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  return (
    <EditModeContext.Provider value={{ isEditMode, toggleEditMode }}>
      {children}
    </EditModeContext.Provider>
  );
}
