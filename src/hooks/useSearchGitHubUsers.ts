import { useEffect, useState } from "react";
import { searchUsers } from "../services/search-users";
import { useDebounce } from "./useDebounce";
import { useGitHubUsersContext } from "../contexts/GitHubUsersContext";

export default function useSearchGitHubUsers(query: string) {
  const { gitHubUsers, setGitHubUsers } = useGitHubUsersContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setGitHubUsers(null);
      setError(null);
      setIsLoading(false);

      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await searchUsers(debouncedQuery);

        if (result.success) {
          setGitHubUsers(
            result.data.map((user) => ({
              ...user,
              isSelected: false,
            }))
          );
        } else {
          setError(result.error);
        }
      } catch {
        setError("Failed to fetch users");
        setGitHubUsers(null);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchData();
  }, [debouncedQuery, setGitHubUsers]);

  return { gitHubUsers, isLoading, error };
}
