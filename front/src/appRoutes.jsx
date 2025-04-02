import { Route, Routes } from "react-router-dom";
import { routes } from "./Routes";

export const AppRoutes = () => {
  return (
    <Routes>
      {routes.map(({ Elm, path, ...props }, i) => {
        return (
          <Route key={i} path={path} {...props} element={<Elm {...props} />} />
        );
      })}
    </Routes>
  );
};
