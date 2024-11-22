// a clicked
// Get all sections and navigation links
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".menu a");

// Function to wrap text with </> tags
function wrapWithTags(element) {
  const text = element.textContent;
  element.innerHTML = `&lt;${text}/&gt;`;
}

// Function to unwrap text (remove </> tags)
function unwrapText(element) {
  const text = element.textContent.replace(/[</>]/g, "");
  element.textContent = text;
}

// Initialize Intersection Observer
const observerOptions = {
  root: null, // use viewport as root
  rootMargin: "-50% 0px", // trigger when section is halfway in viewport
  threshold: 0, // trigger as soon as even 1px is visible
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // Get the corresponding navigation link
    const targetId = entry.target.getAttribute("id");
    const correspondingLink = document.querySelector(
      `.menu a[href="#${targetId}"]`
    );

    if (entry.isIntersecting) {
      // Section is in view - wrap the corresponding link
      navLinks.forEach((link) => unwrapText(link)); // First unwrap all
      wrapWithTags(correspondingLink);
    }
  });
}, observerOptions);

// Start observing all sections
sections.forEach((section) => {
  observer.observe(section);
});

// Optional: Handle active state on click as well
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    navLinks.forEach((l) => unwrapText(l)); // Unwrap all links
    wrapWithTags(e.currentTarget); // Wrap the clicked link
  });
});
// Add this JavaScript to your existing script
document.addEventListener("DOMContentLoaded", () => {
  // Intersection Observer for sections
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          // Optional: remove 'visible' class when section is out of view
          // entry.target.classList.remove('visible');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "-50px",
    }
  );

  // Observe all sections
  document.querySelectorAll(".section").forEach((section) => {
    sectionObserver.observe(section);
  });

  // Enhanced Navigation Link Animation
  document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".menu a");

    navLinks.forEach((link) => {
      let isTagged = false; // Track if link has tags

      link.addEventListener("mouseover", (e) => {
        // Skip wave animation if link has tags
        if (
          e.target.textContent.includes("<") &&
          e.target.textContent.includes(">")
        ) {
          return;
        }

        const text = e.target.textContent;
        const letters = text.split("");
        e.target.style.transform = "scale(1.05)";
        e.target.style.color = "#63daf9";

        // Create wave effect on hover
        const wave = letters
          .map((letter, i) => {
            return `<span style="animation: wave 0.3s ${
              i * 0.05
            }s">${letter}</span>`;
          })
          .join("");

        e.target.innerHTML = wave;
      });

      link.addEventListener("mouseout", (e) => {
        // If link has tags, preserve them on mouseout
        if (
          e.target.textContent.includes("<") &&
          e.target.textContent.includes(">")
        ) {
          return;
        }

        e.target.style.transform = "scale(1)";
        e.target.style.color = "";
        e.target.textContent = e.target.textContent;
      });
    });
  });

  // Add this to your existing styles
  const style = document.createElement("style");
  style.textContent = `
        @keyframes wave {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
    `;
  document.head.appendChild(style);
});
// Add this JavaScript to handle smooth scrolling and section visibility

document.addEventListener("DOMContentLoaded", () => {
  // Create scroll progress indicators
  const sections = document.querySelectorAll(".section");
  const scrollProgress = document.createElement("div");
  scrollProgress.className = "scroll-progress";

  // Add dots for each section
  sections.forEach(() => {
    const dot = document.createElement("div");
    dot.className = "scroll-dot";
    scrollProgress.appendChild(dot);
  });
  document.body.appendChild(scrollProgress);

  // Intersection Observer for sections
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add visible class to section
          entry.target.classList.add("visible");

          // Update scroll progress indicator
          const index = Array.from(sections).indexOf(entry.target);
          const dots = document.querySelectorAll(".scroll-dot");
          dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
          });

          // Update navigation
          const sectionId = entry.target.id;
          document.querySelectorAll(".menu a").forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${sectionId}`
            );
          });
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  // Observe all sections
  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

  // Smooth scroll handling
  document.querySelectorAll(".menu a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      targetSection.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Optional: Keyboard navigation
  document.addEventListener("keydown", (e) => {
    const currentSection = Array.from(sections).find((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top >= 0 && rect.top <= window.innerHeight / 2;
    });

    if (!currentSection) return;

    const currentIndex = Array.from(sections).indexOf(currentSection);
    let targetSection;

    if (e.key === "ArrowDown" && currentIndex < sections.length - 1) {
      targetSection = sections[currentIndex + 1];
    } else if (e.key === "ArrowUp" && currentIndex > 0) {
      targetSection = sections[currentIndex - 1];
    }

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

function animateSkills() {
  const skillCards = document.querySelectorAll(".skill-card");

  skillCards.forEach((card) => {
    const progress = card.querySelector(".skill-progress");
    const percentage = card.dataset.percentage;

    // Set initial width to 0
    progress.style.width = "0%";

    // Use IntersectionObserver to trigger animation when card is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate to the target percentage
            setTimeout(() => {
              progress.style.width = percentage + "%";
            }, 200);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(card);
  });
}

// Call the function when the document is loaded
document.addEventListener("DOMContentLoaded", animateSkills);
