import { FC, useEffect, useRef } from "react";

const About: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

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
    <section id="about" className="section" ref={sectionRef}>
      <div className="about-container">
        <div className="about-content">
          <h1>About Me</h1>
          <div className="role">Front-end Developer</div>
          <p className="intro">
            Hello, I'm <span className="highlight">Ouksa</span>
          </p>
          <p className="description">
            My ultimate goal is to grow and learn something new every day,
            consistently enhancing both my knowledge and skills.
            {/* ...rest of the description... */}
          </p>
        </div>
        <div className="about-decorative">
          {[1, 2, 3].map((i) => (
            <div key={i} className="circle" />
          ))}
          {[20, 60, 80].map((top) => (
            <div
              key={top}
              className="particle"
              style={{ top: `${top}%`, left: `${30 + (top % 40)}%` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
