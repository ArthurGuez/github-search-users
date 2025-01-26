import type { GitHubUser } from "../../services/search-users";
import Checkbox from "../Checkbox/Checkbox";

import styles from "./UserCard.module.css";

interface Props {
  isSelected: boolean;
  toggleSelect: () => void;
  user: GitHubUser;
}

export default function UserCard({ user, isSelected, toggleSelect }: Props) {
  return (
    <div className={styles.userCard}>
      <div className={styles.userCardLayout}>
        <Checkbox
          ariaLabel={`Select profile of ${user.login}`}
          checked={isSelected}
          id={`profile-${user.id.toString()}`}
          isInTopLeftCorner
          onChange={toggleSelect}
        />
        <div className={styles.userCardContent}>
          <img
            className={styles.userCardAvatar}
            src={user.avatar_url}
            alt={user.login}
          />
          <div className={styles.userCardTextContainer}>
            <p>{user.id}</p>
            <p>{user.login}</p>
          </div>
          <a
            className={styles.userCardButton}
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View profile
          </a>
        </div>
      </div>
    </div>
  );
}
