import axios from "axios";
import store from "./Redux/store";
import { getTokens } from "./Redux/Actions";

const MIRAPLAY_API = axios.create({
  baseURL: `https://api-test.miraplay.cloud`,
  headers: { "content-type": "application/json", accept: "application/json" },
});

const API = axios.create({
  baseURL: `http://localhost:3002/api`,
  headers: { "content-type": "application/json", accept: "application/json" },
});

export const PER_PAGE = 9;

export const fetchAllGames = async () => {
  const response = await MIRAPLAY_API.get("/games");
  return response.data;
};

export const fetchGamesByPage = async ({ page, isFreshGamesFirst, genre }) => {
  const response = await MIRAPLAY_API.post("/games/by_page", {
    page,
    isFreshGamesFirst: !!isFreshGamesFirst,
    genre: genre || false,
    gamesToShow: PER_PAGE,
  });
  return response.data;
};

export const register = async ({ email, password }) => {
  const response = await API.post("/user/register", { email, password });
  return response;
};

export const login = async ({ email, password }) => {
  const response = await API.post("/user/login", { email, password });
  return response;
};

export const logout = async () => {
  const response = await API.post("/user/logout", {});
  return response;
};

export const refresh = async () => {
  const response = await API.post("/user/refresh", {});

  return response;
};

export const getGameComments = async (gameId) => {
  const response = await API.get(`/comment/${gameId}`);
  return response;
};

export const getGamesCommentsCounts = async () => {
  const response = await API.get(`/comment/counts`);
  return response;
};

export const sendComment = async (text, gameId) => {
  const response = await API.post(`/comment/${gameId}`, { text });
  return response;
};

let refreshing = false;

API.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (
      err.response &&
      err.response.status === 401 &&
      originalConfig.url !== "/user/refresh"
    ) {
      if (!refreshing) {
        refreshing = true;
        try {
          const { tokenAccess } = await refresh();
          originalConfig.headers = {
            ...originalConfig.headers,
            Authorization: "Bearer " + tokenAccess,
          };
          return await API(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        } finally {
          refreshing = false;
        }
      } else
        return new Promise((resolve) => {
          const int = setInterval(() => {
            if (!refreshing) {
              clearInterval(int);
              resolve(API({ ...originalConfig, intercepted: false }));
            }
          }, 500);
        });
    }
    return Promise.reject(err);
  }
);

API.interceptors.request.use((config) => {
  const { tokenAccess, tokenRefresh } = getTokens(store.getState());
  const token = config.url === "/user/refresh" ? tokenRefresh : tokenAccess;
  if (!config.intercepted && token) {
    config.intercepted = true;
    config.headers = {
      ...config.headers,
      Authorization: "Bearer " + token,
    };
  }
  return config;
});
