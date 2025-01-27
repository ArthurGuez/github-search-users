import { useEditMode } from "../../contexts/EditModeContext";
import { useGitHubUsersContext } from "../../contexts/GitHubUsersContext";
import useSearchGitHubUsers from "../../hooks/useSearchGitHubUsers";
import UserCard from "../UserCard/UserCard";

import styles from "./UserList.module.css";

interface Props {
  query: string;
}

export default function UserList({ query }: Props) {
  const { isEditMode } = useEditMode();
  const { gitHubUsers, isLoading, error } = useSearchGitHubUsers(query);
  const { toggleGitHubUserSelection } = useGitHubUsersContext();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!gitHubUsers) {
    return <p>You search results will be displayed here</p>;
  }

  if (gitHubUsers.length === 0) {
    return <p>No user found</p>;
  }

  return (
    <div className={styles.userList}>
      {gitHubUsers.map((gitHubUser) => (
        <UserCard
          key={gitHubUser.uniqueId ?? gitHubUser.id}
          canSelect={isEditMode}
          user={gitHubUser}
          toggleSelect={() => {
            toggleGitHubUserSelection(gitHubUser.uniqueId ?? gitHubUser.id);
          }}
        />
      ))}
    </div>
  );
}
