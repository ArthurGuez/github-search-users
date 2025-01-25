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
        const resetTime = new Date(
          Number(response.headers.get("X-RateLimit-Reset")) * 1_000
        );
        const currentTime = new Date();
        const timeRemaining = resetTime.getTime() - currentTime.getTime();
        const secondsLeft = Math.floor(
          (timeRemaining % 60_000) / 1_000
        ).toString();

        return {
          success: false,
          error: `⚠️ Oops! You've hit the rate limit.⏳ Please wait ${secondsLeft} seconds.`,
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
