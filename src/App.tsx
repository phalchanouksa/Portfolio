import { FC } from "react";
import Layout from "./components/Layout";
import About from "./components/sections/About";
import Work from "./components/sections/Work";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";
import "./App.css";
import { AppProvider } from "./context/AppContext";

const App: FC = () => {
  return (
    <AppProvider>
      <Layout>
        <About />
        <Work />
        <Skills />
        <Contact />
      </Layout>
    </AppProvider>
  );
};

export default App;
