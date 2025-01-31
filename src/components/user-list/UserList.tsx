import { useEditMode } from "../../contexts/edit-mode/useEditMode";
import { useGithubUsers } from "../../contexts/github-users/useGithubUsers";
import useSearchGithubUsers from "./useSearchGithubUsers";
import UserCard from "../user-card/UserCard";

import styles from "./UserList.module.css";

interface Props {
  searchTerm: string;
}

/**
 * Displays a list of users based on the search term.
 * Handles loading and error states.
 */
export default function UserList({ searchTerm }: Props) {
  const { isEditMode } = useEditMode();
  const { githubUsers, isLoading, error } = useSearchGithubUsers(searchTerm);
  const { toggleGithubUserSelection } = useGithubUsers();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!githubUsers) {
    return <p>You search results will be displayed here</p>;
  }

  if (githubUsers.length === 0) {
    return <p data-testid="no-user">No user found</p>;
  }

  return (
    <div className={styles.userList} data-testid="user-list">
      {githubUsers.map((githubUser) => (
        <UserCard
          key={githubUser.uniqueId ?? githubUser.id}
          canSelect={isEditMode}
          toggleSelect={() => {
            toggleGithubUserSelection(githubUser.uniqueId ?? githubUser.id);
          }}
          user={githubUser}
        />
      ))}
    </div>
  );
}
