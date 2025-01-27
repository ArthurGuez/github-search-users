import type { Dispatch, SetStateAction } from "react";
import { createContext } from "react";
import type { SelectableGithubUser } from "./GithubUsersProvider";

interface GithubUsersContextType {
  duplicateSelectedUsers: () => void;
  githubUsers: SelectableGithubUser[] | null;
  removeSelectedUsers: () => void;
  setGithubUsers: Dispatch<SetStateAction<SelectableGithubUser[] | null>>;
  toggleGithubUserSelection: (userId: number | string) => void;
  toggleSelectAllGithubUsers: () => void;
}

export const GithubUsersContext = createContext<
  GithubUsersContextType | undefined
>(undefined);
