import { useEditMode } from "../../contexts/edit-mode/useEditMode";
import Checkbox from "../checkbox/Checkbox";
import styles from "./Header.module.css";

/**
 * Displays page title and switch to toggle the edit mode
 */
export default function Header() {
  const { isEditMode, toggleEditMode } = useEditMode();

  return (
    <header className={styles.header} data-testid="header">
      <h1 className={styles.headerTitle}>Github Search</h1>
      <div className={styles.headerCheckbox}>
        <Checkbox
          ariaLabel="Toggle edit mode"
          checked={isEditMode}
          data-testid="edit-mode-toggle"
          id="edit-mode"
          isSwitch
          label="Edit mode"
          onChange={toggleEditMode}
        />
      </div>
    </header>
  );
}
