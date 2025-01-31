import type { SelectableGithubUser } from "../../contexts/github-users/GithubUsersProvider";
import Checkbox from "../checkbox/Checkbox";

import styles from "./UserCard.module.css";

interface Props {
  canSelect: boolean;
  toggleSelect: () => void;
  user: SelectableGithubUser;
}

/**
 * Displays the details for a specific user, with option to select it if in edit mode.
 */
export default function UserCard({ canSelect, user, toggleSelect }: Props) {
  return (
    <div className={styles.userCard} data-testid="user-card">
      <div className={styles.userCardLayout}>
        {canSelect && (
          <Checkbox
            ariaLabel={`Select profile of ${user.login}`}
            checked={user.isSelected}
            data-testid="user-checkbox"
            id={`user-${user.id.toString()}`}
            isInTopLeftCorner
            onChange={toggleSelect}
          />
        )}
        <div className={styles.userCardContent}>
          <img
            alt={`${user.login} avatar`}
            className={styles.userCardAvatar}
            src={user.avatar_url}
          />
          <div className={styles.userCardTextContainer}>
            <p>{user.id}</p>
            <p>{user.login}</p>
          </div>
          <a
            className={styles.userCardButton}
            href={user.html_url}
            rel="noopener noreferrer"
            target="_blank"
          >
            View profile
          </a>
        </div>
      </div>
    </div>
  );
}
