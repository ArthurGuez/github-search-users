import duplicateIcon from "../../assets/duplicate.svg";
import binIcon from "../../assets/bin.svg";

import styles from "./Actions.module.css";
import { useEffect, useRef } from "react";
import Checkbox from "../Checkbox/Checkbox";
import { useGithubUsers } from "../../hooks/useGithubUsers";

interface Props {
  onResetUsers: () => void;
}

/**
 * Displays actions such as duplicating and deleting selected users, and selecting all users.
 */
export default function Actions({ onResetUsers }: Props) {
  const {
    duplicateSelectedUsers,
    githubUsers,
    removeSelectedUsers,
    toggleSelectAllGithubUsers,
  } = useGithubUsers();

  const selectedGithubUsersCount =
    githubUsers?.filter((user) => user.isSelected).length ?? 0;

  const areActionsDisabled = !githubUsers || githubUsers.length === 0;
  const areActionButtonsDisabled =
    areActionsDisabled || selectedGithubUsersCount === 0;

  const areSomeGithubUsersSelected = githubUsers
    ? selectedGithubUsersCount > 0 &&
      selectedGithubUsersCount < githubUsers.length
    : false;

  const checkboxRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = areSomeGithubUsersSelected;
    }
  }, [areSomeGithubUsersSelected]);

  function handleDeleteUsers() {
    removeSelectedUsers();

    if (githubUsers?.length === selectedGithubUsersCount) {
      onResetUsers();
    }
  }

  return (
    <div className={styles.actions} data-testid="actions">
      <div className={styles.actionsCheckboxContainer}>
        <Checkbox
          ariaLabel="Select all profiles"
          checked={
            githubUsers?.length === selectedGithubUsersCount &&
            githubUsers.length !== 0
          }
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
          disabled={areActionButtonsDisabled}
          onClick={duplicateSelectedUsers}
        >
          <img alt="Duplicate" height={23} src={duplicateIcon} width={23} />
        </button>
        <button
          aria-label="Delete selected users"
          className={styles.actionButton}
          data-testid="delete-button"
          disabled={areActionButtonsDisabled}
          onClick={handleDeleteUsers}
        >
          <img alt="Delete" height={23} src={binIcon} width={23} />
        </button>
      </div>
    </div>
  );
}
