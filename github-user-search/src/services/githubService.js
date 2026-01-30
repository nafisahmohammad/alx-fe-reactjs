import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: import.meta.env.VITE_APP_GITHUB_API_KEY
      ? `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
      : undefined,
  },
});

export const fetchUserData = (username) => {
  return api.get(`/users/${username}`);
};
