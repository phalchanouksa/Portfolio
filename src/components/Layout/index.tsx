import { FC, ReactNode } from "react";
import Sidebar from "../Sidebar";
import { useApp } from "../../context/AppContext";
import "./index.css";
import { div } from "framer-motion/client";
interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { activeSection } = useApp();

  return (
    <div className="layout">
      <div className="container">
        <Sidebar />
        <main className="main">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
