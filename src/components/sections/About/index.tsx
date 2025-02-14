import { FC, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
// import ThreeScene from "../../ThreeScene";

const About: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  // const [showMore, setShowMore] = useState(false); // State for toggling "More" content - REMOVED

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="layout">
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

            {/* Conditionally render the "More" content - REMOVED */}
            {/* {showMore && (
          <div className="more-content">
            <h2>My Story</h2>
            <p>
              I'm passionate about building user-friendly and visually
              appealing web applications. I have experience in... (Add more
              details about your skills, projects, etc.)
            </p>

            <h2>Daily Habits</h2>
            <ul>
              <li>Coding every day</li>
              <li>Learning new technologies</li>
              <li>Reading tech blogs</li>
              {/* Add more habits */}
            {/* </ul>

            <h2>Education History</h2>
            <ul>
              <li>University Name, Degree</li>
              <li>Other relevant education</li>
            </ul>

            <h2>Work Experience</h2>
            <ul>
              <li>Company Name, Role, Dates</li>
              <li>Previous experiences</li>
            </ul>
            {/* Add more sections as needed */}
            {/* </div>
        )} */}

            {/* "More" button - REMOVED */}
            {/* <button onClick={() => setShowMore(!showMore)}>
          {showMore ? "Show Less" : "Show More"}
        </button> */}

            {/* Or a Link to a separate component */}
            <Link to="/about-details">
              <button>Learn More</button>
            </Link>
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
    </div>
  );
};

export default About;
