import duplicateIcon from "../../assets/duplicate.svg";
import binIcon from "../../assets/bin.svg";

import styles from "./Actions.module.css";
import { useGitHubUsersContext } from "../../contexts/GitHubUsersContext";
import { useEffect, useRef } from "react";
import Checkbox from "../Checkbox/Checkbox";

interface Props {
  onResetUsers: () => void;
}

export default function Actions({ onResetUsers }: Props) {
  const {
    duplicateSelectedUsers,
    gitHubUsers,
    removeSelectedUsers,
    toggleSelectAllGitHubUsers,
  } = useGitHubUsersContext();

  const selectedGitHubUsersCount =
    gitHubUsers?.filter((user) => user.isSelected).length ?? 0;

  const checkboxRef = useRef<HTMLInputElement | null>(null);

  const areSomeGitHubUsersSelected = gitHubUsers
    ? selectedGitHubUsersCount > 0 &&
      selectedGitHubUsersCount < gitHubUsers.length
    : false;

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = areSomeGitHubUsersSelected;
    }
  }, [areSomeGitHubUsersSelected]);

  function handleDeleteUsers() {
    removeSelectedUsers();

    if (gitHubUsers?.length === selectedGitHubUsersCount) {
      onResetUsers();
    }
  }

  return (
    <div className={styles.actions}>
      <div className={styles.actionsCheckboxContainer}>
        <Checkbox
          ariaLabel="Select all profiles"
          checked={gitHubUsers?.length === selectedGitHubUsersCount}
          disabled={!gitHubUsers}
          id="select-all"
          onChange={toggleSelectAllGitHubUsers}
          ref={checkboxRef}
        />
        <span>{selectedGitHubUsersCount}&nbsp;</span>
        element
        {selectedGitHubUsersCount > 1 ? "s" : ""} selected
      </div>
      <div className={styles.actionButtons}>
        <button
          onClick={() => {
            duplicateSelectedUsers();
          }}
          className={styles.actionButton}
          aria-label="Duplicate selected users"
        >
          <img src={duplicateIcon} alt="Duplicate" width={23} height={23} />
        </button>
        <button
          onClick={handleDeleteUsers}
          className={styles.actionButton}
          aria-label="Delete selected users"
        >
          <img src={binIcon} alt="Delete" width={23} height={23} />
        </button>
      </div>
    </div>
  );
}
