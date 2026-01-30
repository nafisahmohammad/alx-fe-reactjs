import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: import.meta.env.VITE_APP_GITHUB_API_KEY
      ? `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
      : undefined,
  },
});

export const fetchAdvancedUsers = (
  username,
  location,
  minRepos,
  page = 1
) => {
  let query = `${username}`;

  if (location) {
    query += `+location:${location}`;
  }

  if (minRepos) {
    query += `+repos:>=${minRepos}`;
  }

  return api.get(
    `/search/users?q=${query}&page=${page}&per_page=10`
  );
};

