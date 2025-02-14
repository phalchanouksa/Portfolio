import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";

// Types
interface Particle {
  id: number;
  left: string;
  delay: number;
  size: number;
}

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const glowPulse = keyframes`
  0%, 100% { filter: brightness(1) blur(10px); }
  50% { filter: brightness(1.5) blur(15px); }
`;

const particleFloat = keyframes`
  0% { transform: translateY(0) rotate(0deg); opacity: 0; }
  20% { opacity: 1; }
  100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
`;

const AboutContainer = styled.div`
  width: 100vw;
  background: #0a0a2a;
  color: #fff;
  overflow: hidden;
  position: relative;

  .parallax-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;

    .particle {
      position: absolute;
      width: 3px;
      height: 3px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      animation: ${particleFloat} 15s infinite linear;
    }
  }
`;

const HeroSection = styled(motion.section)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 2rem;

  .hero-content {
    z-index: 2;
    text-align: center;

    h1 {
      font-size: 8rem;
      font-weight: 900;
      margin: 0;
      line-height: 1;
      background: linear-gradient(45deg, #ff3366, #ff9933, #33ff99, #3366ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 300% 300%;
      animation: gradient 8s ease infinite;
    }

    p {
      font-size: 2rem;
      margin-top: 2rem;
      color: rgba(255, 255, 255, 0.8);
      text-transform: uppercase;
      letter-spacing: 8px;
    }
  }

  .floating-shapes {
    position: absolute;
    inset: 0;
    z-index: 1;

    .shape {
      position: absolute;
      border-radius: 50%;
      animation: ${float} 6s infinite ease-in-out;

      &::before {
        content: "";
        position: absolute;
        inset: -20px;
        background: inherit;
        border-radius: inherit;
        animation: ${glowPulse} 4s infinite;
      }
    }

    .shape1 {
      top: 20%;
      left: 20%;
      width: 200px;
      height: 200px;
      background: rgba(255, 51, 102, 0.2);
      animation-delay: 0s;
    }

    .shape2 {
      top: 60%;
      right: 20%;
      width: 300px;
      height: 300px;
      background: rgba(51, 102, 255, 0.2);
      animation-delay: -2s;
    }

    .shape3 {
      bottom: 10%;
      left: 30%;
      width: 150px;
      height: 150px;
      background: rgba(51, 255, 153, 0.2);
      animation-delay: -4s;
    }
  }
`;

const AboutSection = styled(motion.section)`
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  padding: 4rem;
  background: rgba(10, 10, 42, 0.8);
  backdrop-filter: blur(10px);

  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    max-width: 1400px;
    margin: 0 auto;

    .about-content {
      h2 {
        font-size: 4rem;
        margin-bottom: 2rem;
        background: linear-gradient(45deg, #ff3366, #ff9933);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      p {
        font-size: 1.2rem;
        line-height: 1.8;
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 1.5rem;
      }
    }

    .about-image {
      position: relative;

      &::before {
        content: "";
        position: absolute;
        inset: -20px;
        background: linear-gradient(45deg, #ff3366, #ff9933);
        border-radius: 30px;
        z-index: 0;
        opacity: 0.5;
        filter: blur(20px);
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 20px;
        position: relative;
        z-index: 1;
      }
    }
  }
`;

const SkillsSection = styled(motion.section)`
  min-height: 100vh;
  padding: 4rem;
  background: rgba(10, 10, 42, 0.9);
  position: relative;

  .skills-container {
    max-width: 1400px;
    margin: 0 auto;

    h2 {
      font-size: 4rem;
      text-align: center;
      margin-bottom: 4rem;
      background: linear-gradient(45deg, #33ff99, #3366ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;

      .skill-card {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 20px;
        padding: 2rem;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: transform 0.3s ease;

        &:hover {
          transform: translateY(-10px);

          .skill-icon {
            transform: scale(1.2) rotate(10deg);
          }
        }

        .skill-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          transition: transform 0.3s ease;
        }

        h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #fff;
        }

        .skill-bar {
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;

          .progress {
            height: 100%;
            background: linear-gradient(90deg, #33ff99, #3366ff);
            width: 0;
            transition: width 1.5s ease;
          }
        }
      }
    }
  }
`;

// Component implementation
const AboutDetails = () => {
  const { scrollYProgress } = useScroll();
  const [particles, setParticles] = useState<Particle[]>([]);

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // Create particles
    const newParticles: Particle[] = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 15,
      size: Math.random() * 3 + 1,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <AboutContainer>
      <div className="parallax-bg">
        {particles.map((particle: Particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: particle.left,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      <HeroSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div className="hero-content" style={{ y: y1, opacity }}>
          <h1>Creative Developer</h1>
          <p>Bringing Ideas to Life</p>
        </motion.div>
        <div className="floating-shapes">
          <div className="shape shape1" />
          <div className="shape shape2" />
          <div className="shape shape3" />
        </div>
      </HeroSection>

      <AboutSection>
        <div className="about-grid">
          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>About Me</h2>
            <p>
              I'm a creative developer passionate about building extraordinary
              digital experiences. With a keen eye for design and strong
              technical skills, I bring ideas to life through code.
            </p>
          </motion.div>
          <motion.div
            className="about-image"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img src="/your-image.jpg" alt="Profile" />
          </motion.div>
        </div>
      </AboutSection>

      <SkillsSection>
        <div className="skills-container">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Skills
          </motion.h2>
          <div className="skills-grid">
            {[
              { name: "Frontend Development", icon: "🎨", progress: 90 },
              { name: "React & TypeScript", icon: "⚛️", progress: 85 },
              { name: "UI/UX Design", icon: "✨", progress: 80 },
            ].map((skill, index) => (
              <motion.div
                key={skill.name}
                className="skill-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="skill-icon">{skill.icon}</div>
                <h3>{skill.name}</h3>
                <div className="skill-bar">
                  <motion.div
                    className="progress"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.progress}%` }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SkillsSection>
    </AboutContainer>
  );
};

export default AboutDetails;
