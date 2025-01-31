import { useEffect, useState } from "react";
import { searchUsers } from "../../services/search-users";
import { useDebounce } from "../../hooks/useDebounce";
import { useGithubUsers } from "../../contexts/github-users/useGithubUsers";

/**
 * Search Github users with a debounced search term.
 * Returns the list of Github users, loading state, and any error message.
 */
export default function useSearchGithubUsers(searchTerm: string) {
  const { githubUsers, setGithubUsers } = useGithubUsers();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedSearchTerm = useDebounce(searchTerm);

  useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      setGithubUsers(null);
      setError(null);
      setIsLoading(false);

      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await searchUsers(debouncedSearchTerm);

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
  }, [debouncedSearchTerm, setGithubUsers]);

  return { githubUsers, isLoading, error };
}
