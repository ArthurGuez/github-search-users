import duplicateIcon from "../../assets/duplicate.svg";
import binIcon from "../../assets/bin.svg";

import styles from "./Actions.module.css";
import { useEffect, useRef } from "react";
import Checkbox from "../checkbox/Checkbox";
import { useActions } from "./useActions";

interface Props {
  onResetUsers: () => void;
}

/**
 * Displays actions such as duplicating and deleting selected users, and selecting all users.
 */
export default function Actions({ onResetUsers }: Props) {
  const {
    areActionsDisabled,
    areAllUsersSelected,
    selectedGithubUsersCount,
    handleDeleteUsers,
    toggleSelectAllGithubUsers,
    duplicateSelectedUsers,
  } = useActions(onResetUsers);

  const checkboxRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate =
        selectedGithubUsersCount > 0 && !areAllUsersSelected;
    }
  }, [areAllUsersSelected, selectedGithubUsersCount]);

  return (
    <div className={styles.actions} data-testid="actions">
      <div className={styles.actionsCheckboxContainer}>
        <Checkbox
          ariaLabel="Select all profiles"
          checked={areAllUsersSelected}
          data-testid="select-all-checkbox"
          disabled={areActionsDisabled}
          id="select-all"
          onChange={toggleSelectAllGithubUsers}
          ref={checkboxRef}
        />
        <span data-testid="selected-users-count">
          {selectedGithubUsersCount}&nbsp;
        </span>
        element
        {selectedGithubUsersCount > 1 ? "s" : ""} selected
      </div>
      <div className={styles.actionButtons}>
        <button
          aria-label="Duplicate selected users"
          className={styles.actionButton}
          data-testid="duplicate-button"
          disabled={areActionsDisabled || !selectedGithubUsersCount}
          onClick={duplicateSelectedUsers}
        >
          <img alt="" height={23} src={duplicateIcon} width={23} />
        </button>
        <button
          aria-label="Delete selected users"
          className={styles.actionButton}
          data-testid="delete-button"
          disabled={areActionsDisabled || !selectedGithubUsersCount}
          onClick={handleDeleteUsers}
        >
          <img alt="" height={23} src={binIcon} width={23} />
        </button>
      </div>
    </div>
  );
}
