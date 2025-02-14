import { FC, useEffect, useRef } from "react";
import ThreeScene from "../../ThreeScene";
const About: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

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
    <section id="about" className="section" ref={sectionRef}>
      <div className="about-container">
        {/* <div
          style={{
            width: "100%",
            height: "100%",
            position: "fixed",
            zIndex: 100,
          }}
        >
          <ThreeScene
            // Basic model settings
            modelPath="/models/cat/scene.gltf"
            containerStyle={{
              width: "100%",
              height: "100%",
              background: "transparent",
            }}
            modelSize={5}
            // Camera settings
            fov={60}
            near={0.5}
            far={2000}
            cameraPosition={{ x: 0, y: 0, z: 8 }}
            // Renderer background color
            backgroundColor={undefined}
            // Lighting options
            ambientLightIntensity={1.0}
            directionalLightIntensity={0.8}
            directionalLightPosition={{ x: 10, y: 10, z: 10 }}
            // OrbitControls settings
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
            minDistance={5}
            maxDistance={50}
            // Scroll rotation settings
            rotateOnScroll={true}
            scrollRotationSpeed={0.001}
            speedupRotate={true}
            speedupFactor={1.4}
            // Auto rotation & animation
            autoRotate={true}
            autoRotateSpeed={3.0}
            playAnimation={false}
            animationSpeed={1.0}
            // Damping settings for OrbitControls
            damping={true}
            dampingFactor={0.1}
            // Callbacks
            // onLoad={handleLoad}
            // onError={handleError}
            // onModelLoaded={handleModelLoaded}
            // onClick={handleClick}
            // onHover={handleHover}
          />
        </div> */}
        <div className="about-content">
          <h1>About Me</h1>
          <div></div>
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
