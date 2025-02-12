import { FC } from "react";
import { useApp } from "../../context/AppContext";

const Sidebar: FC = () => {
  const { activeSection, setActiveSection } = useApp();

  const menuItems = ["about", "work", "skills", "contacts"];
  const socialLinks = [
    { icon: "fa-instagram", url: "https://www.instagram.com/chan.ouksa/" },
    { icon: "fa-github", url: "https://github.com/phalchanouksa" },
    { icon: "fa-facebook", url: "https://web.facebook.com/chan.ouksa.16/" },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">&lt;Chan Ouksa/&gt;</div>
      <nav className="menu">
        {menuItems.map((item) => (
          <a
            key={item}
            href={`#${item}`}
            className={activeSection === item ? "active" : ""}
            onClick={() => setActiveSection(item)}
          >
            {item.toUpperCase()}
          </a>
        ))}
      </nav>
      <div className="social-links">
        {socialLinks.map(({ icon, url }) => (
          <a key={icon} href={url} target="_blank" rel="noopener noreferrer">
            <i className={`fa-brands ${icon}`}></i>
          </a>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
