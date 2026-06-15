import { useEffect, useState } from "react";
import type { Project } from "../config/portfolio";

// Subset of the GitHub REST repo object we care about.
type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
};

type State = {
  projects: Project[];
  loading: boolean;
  error: string | null;
};

const mapRepoToProject = (repo: GitHubRepo): Project => ({
  id: String(repo.id),
  title: repo.name,
  description: repo.description?.trim() || "No description provided yet.",
  technologies: [repo.language, ...(repo.topics ?? [])].filter(
    (t): t is string => Boolean(t)
  ),
  demoUrl: repo.homepage ? repo.homepage.trim() || undefined : undefined,
  sourceUrl: repo.html_url,
  stars: repo.stargazers_count,
});

/**
 * Fetches public repositories for `username` from the GitHub API and maps them
 * to the Project shape. When `featuredRepos` is provided, only those repos are
 * returned, in the given order. Otherwise the most recently pushed non-fork,
 * non-archived repos are returned (capped at `autoLimit`).
 */
export function useGitHubProjects(
  username: string,
  featuredRepos: string[] = [],
  autoLimit = 6
): State {
  const [state, setState] = useState<State>({
    projects: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`,
          {
            signal: controller.signal,
            headers: { Accept: "application/vnd.github+json" },
          }
        );

        if (!res.ok) {
          throw new Error(
            res.status === 403
              ? "GitHub API rate limit reached"
              : `GitHub API error (${res.status})`
          );
        }

        const repos: GitHubRepo[] = await res.json();

        let selected: GitHubRepo[];
        if (featuredRepos.length > 0) {
          const byName = new Map(
            repos.map((repo) => [repo.name.toLowerCase(), repo])
          );
          selected = featuredRepos
            .map((name) => byName.get(name.toLowerCase()))
            .filter((repo): repo is GitHubRepo => Boolean(repo));
        } else {
          selected = repos
            .filter((repo) => !repo.fork && !repo.archived)
            .slice(0, autoLimit);
        }

        setState({
          projects: selected.map(mapRepoToProject),
          loading: false,
          error: null,
        });
      } catch (err) {
        if (controller.signal.aborted) return;
        setState({
          projects: [],
          loading: false,
          error: err instanceof Error ? err.message : "Failed to load projects",
        });
      }
    }

    load();
    return () => controller.abort();
    // featuredRepos is a static config array; join for a stable dep.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, autoLimit, featuredRepos.join("|")]);

  return state;
}
