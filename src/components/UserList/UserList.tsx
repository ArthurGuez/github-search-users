import useSearchGitHubUsers from "../../hooks/useSearchGitHubUsers";
import Card from "../Card/Card";

import styles from "./UserList.module.css";

interface Props {
  query: string;
}

export default function UserList({ query }: Props) {
  const { users, isLoading, error } = useSearchGitHubUsers(query);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!users || users.length === 0) {
    return <p>No user found</p>;
  }

  return (
    <div className={styles.cards}>
      {users.map((user) => (
        <Card key={user.id} user={user} />
      ))}
    </div>
  );
}
