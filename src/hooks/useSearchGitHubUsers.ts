import { useEffect, useState } from "react";
import type { GitHubUser } from "../services/search-users";
import { searchUsers } from "../services/search-users";

export default function useSearchGitHubUsers(query: string) {
  const [users, setUsers] = useState<GitHubUser[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setUsers(null);
      setError(null);
      setIsLoading(false);

      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await searchUsers(query);

        if (result.success) {
          setUsers(result.data);
        } else {
          setError(result.error);
        }
      } catch {
        setError("Failed to fetch users");
        setUsers(null);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchData();
  }, [query]);

  return { users, isLoading, error };
}
