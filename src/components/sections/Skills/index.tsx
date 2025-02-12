import { FC, useEffect, useRef } from "react";

interface Skill {
  name: string;
  icon: string;
  percentage: number;
}

const Skills: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const skills: Skill[] = [
    { name: "HTML", icon: "fab fa-html5", percentage: 80 },
    { name: "CSS", icon: "fab fa-css3-alt", percentage: 80 },
    { name: "JavaScript", icon: "fab fa-js", percentage: 60 },
    { name: "React.js", icon: "fab fa-react", percentage: 40 },
    { name: "PHP", icon: "fab fa-php", percentage: 40 },
    { name: "Refine JS", icon: "fa-solid fa-r", percentage: 60 },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          animateSkills();
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateSkills = () => {
    const skillCards = document.querySelectorAll(".skill-card");
    skillCards.forEach((card) => {
      const progress = card.querySelector(".skill-progress");
      if (progress) {
        const percentage = card.getAttribute("data-percentage");
        progress.setAttribute("style", `width: ${percentage}%`);
      }
    });
  };

  return (
    <section id="skills" className="section" ref={sectionRef}>
      <div className="section-content">
        <h1>Skills & Expertise</h1>
        <div className="skills-container">
          <div className="skills-group">
            <h3>Development</h3>
            <div className="skills-grid">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="skill-card"
                  data-percentage={skill.percentage}
                >
                  <div className="skill-icon">
                    <i className={skill.icon} />
                  </div>
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-bar">
                      <div className="skill-progress" />
                    </div>
                    <span className="skill-percentage">
                      {skill.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
