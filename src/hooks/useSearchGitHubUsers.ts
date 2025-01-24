import { useEffect, useState } from "react";
import type { GitHubUser } from "../services/search-users";
import { searchUsers } from "../services/search-users";

export default function useSearchGitHubUsers(query: string) {
  const [users, setUsers] = useState<GitHubUser[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const foundUsers = await searchUsers(query);
        setUsers(foundUsers);
      } catch {
        setError("Failed to fetch users");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData().catch(console.error);
  }, [query]);

  return { users, isLoading, error };
}
