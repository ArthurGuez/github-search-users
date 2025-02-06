import { isAbortError } from "../utils";

interface GithubSearchResponse {
  incomplete_results: boolean;
  items: GithubUser[];
  total_count: number;
}

export interface GithubUser {
  avatar_url: string;
  html_url: string;
  id: number;
  login: string;
  type: string;
}

type SearchUsersResult =
  | { success: true; data: GithubUser[] }
  | { success: false; error: string };

export async function searchUsers(
  query: string,
  signal: AbortSignal
): Promise<SearchUsersResult> {
  const url = `https://api.github.com/search/users?q=${encodeURIComponent(
    query
  )}`;

  try {
    const response = await fetch(url, { signal });

    if (!response.ok) {
      if (response.status === 403) {
        const resetTime = new Date(
          Number(response.headers.get("X-RateLimit-Reset")) * 1_000
        );
        const currentTime = new Date();
        const timeRemaining = resetTime.getTime() - currentTime.getTime();
        const secondsLeft = Math.floor((timeRemaining % 60_000) / 1_000);

        return {
          success: false,
          error: `⚠️ Oops! You've hit the rate limit.⏳ Please wait ${secondsLeft} seconds.`,
        };
      }

      return { success: false, error: "Failed to fetch data from Github API" };
    }

    const data = (await response.json()) as GithubSearchResponse;

    return { success: true, data: data.items };
  } catch (error) {
    if (isAbortError(error)) {
      return { success: false, error: "Request was aborted" };
    }

    console.error("Error fetching users:", error);

    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
