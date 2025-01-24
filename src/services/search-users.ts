interface GitHubSearchResponse {
  incomplete_results: boolean;
  items: GitHubUser[];
  total_count: number;
}

export interface GitHubUser {
  avatar_url: string;
  html_url: string;
  id: number;
  login: string;
  type: string;
}

type SearchUsersResult =
  | { success: true; data: GitHubUser[] }
  | { success: false; error: string };

export async function searchUsers(query: string): Promise<SearchUsersResult> {
  const url = `https://api.github.com/search/users?q=${encodeURIComponent(
    query
  )}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 403) {
        const resetTime = response.headers.get("X-RateLimit-Reset");
        const date = new Date(Number(resetTime) * 1000);

        return {
          success: false,
          error: `Rate limit exceeded. Try again at: ${date.toLocaleString()}`,
        };
      }

      return { success: false, error: "Failed to fetch data from GitHub API" };
    }

    const data = (await response.json()) as GitHubSearchResponse;

    return { success: true, data: data.items };
  } catch (error) {
    console.error("Error fetching users:", error);

    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
