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

export async function searchUsers(query: string): Promise<GitHubUser[] | null> {
  const url = `https://api.github.com/search/users?q=${encodeURIComponent(
    query
  )}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 403) {
        const resetTime = response.headers.get("X-RateLimit-Reset");
        const date = new Date(Number(resetTime) * 1000);
        console.warn(
          `Rate limit exceeded. Try again at: ${date.toLocaleString()}`
        );
      }

      throw new Error("Failed to fetch data from GitHub API");
    }

    const data = (await response.json()) as GitHubSearchResponse;

    return data.items;
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
}
