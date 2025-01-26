import { useGitHubUserContext } from "../../contexts/GitHubUserContext";
import useSearchGitHubUsers from "../../hooks/useSearchGitHubUsers";
import UserCard from "../UserCard/UserCard";

import styles from "./UserList.module.css";

interface Props {
  query: string;
}

export default function UserList({ query }: Props) {
  const { gitHubUsers, isLoading, error } = useSearchGitHubUsers(query);
  const { areAllSelected } = useGitHubUserContext();

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
          key={gitHubUser.id}
          user={gitHubUser}
          isSelected={areAllSelected}
        />
      ))}
    </div>
  );
}
