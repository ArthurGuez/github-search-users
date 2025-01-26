import type { GitHubUser } from "../../services/search-users";

import styles from "./UserCard.module.css";

interface Props {
  user: GitHubUser;
  isSelected: boolean;
}

export default function UserCard({ user, isSelected }: Props) {
  return (
    <div className={styles.userCard}>
      <div className={styles.userCardLayout}>
        <label htmlFor={`profile-${user.id.toString()}`}></label>
        <input
          aria-label={`Select profile of ${user.login}`}
          className={styles.userCardCheckbox}
          type="checkbox"
          name="profile"
          id={`profile-${user.id.toString()}`}
          checked={isSelected}
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
