import { lazy } from "react";
import { urls } from "../Configs/constants";
import WithSuspense from "../Utils/HOC/withSuspense";

const { GAMES } = urls;

export const routes = [
  {
    path: GAMES,
    name: "Games",
    Elm: WithSuspense(lazy(() => import("../Pages/Games"))),
  },
];
