import copyIcon from "../../assets/copy.svg";
import binIcon from "../../assets/bin.svg";

import styles from "./Actions.module.css";
import { useGitHubUserContext } from "../../contexts/GitHubUserContext";

interface Props {
  onResetUsers: () => void;
}

export default function Actions({ onResetUsers }: Props) {
  const { toggleSelectAll, setGitHubUsers } = useGitHubUserContext();

  return (
    <div className={styles.actions}>
      <div>
        <label htmlFor="select-all"></label>
        <input
          aria-label="Select all profiles"
          type="checkbox"
          name="profile"
          id="select-all"
          onClick={toggleSelectAll}
        />
        X elements selected
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
