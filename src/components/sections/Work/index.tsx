import { FC, useEffect, useRef } from "react";
import { IMAGES } from "../../../constants/images";

interface Project {
  image: string;
  title: string;
  description: string;
  tech: string[];
  liveLink?: string;
}

const Work: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const projects: Project[] = [
    {
      image: IMAGES.portfolio3,
      title: "Google clone",
      description: "My first ever front-end project as a complete beginner",
      tech: ["HTML", "CSS", "JavaScript"],
    },
    {
      image: IMAGES.portfolio2,
      title: "Responsive Navbar",
      description: "Another mini project created by me",
      tech: ["HTML", "CSS", "JS"],
    },
    {
      image: IMAGES.portfolio1,
      title: "Youtube Downloader",
      description: "A basic working Youtube Downloader desktop app",
      tech: ["HTML", "CSS", "JS", "Electron", "Node.js", "Python"],
    },
    {
      image: IMAGES.portfolio4,
      title: "AI Chatbot",
      description: "ChatBot with Gemini API.",
      tech: ["React"],
      liveLink: "https://gemini-api-ui-b8vq.vercel.app/",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="work" className="section" ref={sectionRef}>
      <div className="section-content">
        <h1>My Projects</h1>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-content">
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay" />
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                {project.liveLink && (
                  <div className="project-links">
                    <a
                      href={project.liveLink}
                      className="project-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-solid fa-arrow-up-right-from-square" />
                      Live
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
