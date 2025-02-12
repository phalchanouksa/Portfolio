import { FC, useEffect, useRef, FormEvent } from "react";

const Contact: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
  };

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

  const contactMethods = [
    {
      icon: "fas fa-envelope",
      title: "Email",
      link: "mailto:phalchanouksa10@email.com",
      text: "phalchanouksa10@email.com",
    },
    {
      icon: "fab fa-github",
      title: "GitHub",
      link: "https://github.com/phalchanouksa",
      text: "github.com/chanouksa",
    },
    {
      icon: "fab fa-facebook",
      title: "Facebook",
      link: "https://web.facebook.com/chan.ouksa.16/",
      text: "Chan Ouksa",
    },
  ];

  return (
    <section id="contacts" className="section" ref={sectionRef}>
      <div className="contact-wrapper">
        <h1 className="contact-title">Get in Touch</h1>
        <div className="contact-container">
          <div className="contact-info">
            <div className="info-card">
              <h2>Let's Connect</h2>
              <p className="contact-description">
                Have a project in mind? Let's discuss how we can work together.
              </p>
              <div className="contact-methods">
                {contactMethods.map((method) => (
                  <div key={method.title} className="contact-item">
                    <div className="contact-icon">
                      <i className={method.icon} />
                    </div>
                    <div className="contact-details">
                      <h3>{method.title}</h3>
                      <a
                        href={method.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {method.text}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" id="name" required />
                <label htmlFor="name">Name</label>
                <span className="focus-border" />
              </div>

              <div className="form-group">
                <input type="email" id="email" required />
                <label htmlFor="email">Email</label>
                <span className="focus-border" />
              </div>

              <div className="form-group">
                <textarea id="message" required />
                <label htmlFor="message">Message</label>
                <span className="focus-border" />
              </div>

              <button className="submit-btn">
                <span>Send Message</span>
                <i className="fas fa-paper-plane" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
