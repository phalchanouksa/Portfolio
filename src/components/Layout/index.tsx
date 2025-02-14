import { FC, ReactNode } from "react";
import Sidebar from "../Sidebar";
import { useApp } from "../../context/AppContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { activeSection } = useApp();

  return (
    <div className="container">
      <Sidebar />
      <main className="main">{children}</main>
    </div>
  );
};

export default Layout;
