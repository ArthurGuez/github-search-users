import { useEffect, useState } from "react";
import { searchUsers } from "../services/search-users";
import { useDebounce } from "./useDebounce";
import { useGithubUsers } from "./useGithubUsers";

export default function useSearchGithubUsers(query: string) {
  const { githubUsers, setGithubUsers } = useGithubUsers();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setGithubUsers(null);
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
          setGithubUsers(
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
        setGithubUsers(null);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchData();
  }, [debouncedQuery, setGithubUsers]);

  return { githubUsers, isLoading, error };
}
