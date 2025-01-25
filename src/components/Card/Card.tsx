import type { GitHubUser } from "../../services/search-users";

import styles from "./Card.module.css";

interface Props {
  user: GitHubUser;
}

export default function Card({ user }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.cardLayout}>
        <input
          className={styles.cardCheckbox}
          type="checkbox"
          name="profile"
          id=""
        />
        <div className={styles.cardContent}>
          <img
            className={styles.cardAvatar}
            src={user.avatar_url}
            alt={user.login}
          />
          <div className={styles.cardTextContainer}>
            <p>{user.id}</p>
            <p>{user.login}</p>
          </div>
          <a
            className={styles.cardButton}
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
