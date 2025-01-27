import { useEditMode } from "../../hooks/useEditMode";
import Checkbox from "../Checkbox/Checkbox";
import styles from "./Header.module.css";

export default function Header() {
  const { isEditMode, toggleEditMode } = useEditMode();

  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>Github Search</h1>
      <div className={styles.headerCheckbox}>
        <Checkbox
          ariaLabel="Toggle edit mode"
          checked={isEditMode}
          id="edit-mode"
          isSwitch
          label="Edit mode"
          onChange={toggleEditMode}
        />
      </div>
    </header>
  );
}
