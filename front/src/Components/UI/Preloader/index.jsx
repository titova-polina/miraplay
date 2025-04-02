import { StyledPreloader } from "./styled";

export const Preloader = () => {
  return <StyledPreloader></StyledPreloader>;
};

export const Loader = ({ loading, children = null }) => {
  return loading ? <Preloader /> : children;
};
