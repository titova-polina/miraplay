import { Suspense } from "react";
import { Preloader } from "../../Components/UI/Preloader";

// eslint-disable-next-line react/display-name
const WithSuspense = (Component) => (props) => (
  <Suspense fallback={<Preloader />}>
    <Component {...props} />
  </Suspense>
);

export default WithSuspense;
