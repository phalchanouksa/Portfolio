import { FC } from "react";
import Layout from "./components/Layout";
import About from "./components/sections/About";
import Work from "./components/sections/Work";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";

import { AppProvider } from "./context/AppContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutDetails from "./components/sections/About/AboutDetails"; // Correct import

const App: FC = () => {
  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <About />
                <Work />
                <Skills />
                <Contact />
              </Layout>
            }
          />
          <Route path="/about-details" element={<AboutDetails />} />
        </Routes>
      </AppProvider>
    </Router>
  );
};

export default App;
