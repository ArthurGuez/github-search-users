import copyIcon from "../../assets/copy.svg";
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
    gitHubUsers,
    selectedGitHubUsers,
    setGitHubUsers,
    toggleSelectAllGitHubUsers,
  } = useGitHubUsersContext();
  const selectedGitHubUsersCount = selectedGitHubUsers.length;
  const checkboxRef = useRef<HTMLInputElement | null>(null);

  const areSomeGitHubUsersSelected =
    (gitHubUsers &&
      selectedGitHubUsers.length > 0 &&
      gitHubUsers.length > selectedGitHubUsers.length) ??
    false;

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = areSomeGitHubUsersSelected;
    }
  }, [areSomeGitHubUsersSelected]);

  return (
    <div className={styles.actions}>
      <div className={styles.actionsCheckboxContainer}>
        <Checkbox
          ariaLabel="Select all profiles"
          checked={gitHubUsers?.length === selectedGitHubUsers.length}
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
        <img src={copyIcon} alt="Copy" width={23} height={23} />
        <img
          onClick={() => {
            setGitHubUsers(null);
            onResetUsers();
          }}
          src={binIcon}
          alt="Delete"
          width={23}
          height={23}
        />
      </div>
    </div>
  );
}
