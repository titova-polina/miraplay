import { AppRoutes } from "./appRoutes";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import { Hero } from "./Components/Hero";
import { GlobalStyle } from "./styledApp";
import { useConnectToSocket } from "./Socket";

function App() {
  useConnectToSocket();
  return (
    <>
      <Header />
      <Hero />
      <AppRoutes />
      <Footer />
      <GlobalStyle />
    </>
  );
}

export default App;
