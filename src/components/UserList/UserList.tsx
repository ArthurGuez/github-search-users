import { useEditMode } from "../../hooks/useEditMode";
import { useGithubUsers } from "../../hooks/useGithubUsers";
import useSearchGithubUsers from "../../hooks/useSearchGithubUsers";
import UserCard from "../UserCard/UserCard";

import styles from "./UserList.module.css";

interface Props {
  query: string;
}

export default function UserList({ query }: Props) {
  const { isEditMode } = useEditMode();
  const { githubUsers, isLoading, error } = useSearchGithubUsers(query);
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
    return <p>No user found</p>;
  }

  return (
    <div className={styles.userList}>
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
