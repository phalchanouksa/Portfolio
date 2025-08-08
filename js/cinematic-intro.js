document.addEventListener('DOMContentLoaded', () => {
    const introContainer = document.getElementById('cinematic-intro');
    const skipButton = document.getElementById('skip-intro');
    const mainContent = document.getElementById('main-content');

    if (!introContainer || !skipButton || !mainContent) {
        // If elements are not on the page, just ensure content is visible and exit.
        if(mainContent) {
            mainContent.style.opacity = '1';
            mainContent.style.visibility = 'visible';
            document.body.style.overflow = 'auto';
        }
        console.log('Cinematic intro elements not found, skipping intro.');
        return;
    }

    // Only show the intro once per session
    const hasSeenIntro = sessionStorage.getItem('introSeen') === 'true';
    if (hasSeenIntro) {
        introContainer.style.display = 'none';
        skipButton.style.display = 'none';
        mainContent.style.transition = 'none';
        mainContent.style.opacity = '1';
        mainContent.style.visibility = 'visible';
        document.body.style.overflow = 'auto';
        return;
    }

    // Setup background video (muted, looped, inline) if available
    try {
        const video = document.createElement('video');
        video.className = 'intro-bg-video';
        video.src = 'public/introbg.mp4';
        video.muted = true; // must set property as well for iOS
        video.setAttribute('muted', '');
        video.autoplay = true;
        video.loop = true;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        // Lighter preload for performance
        video.preload = 'metadata';

        // Add a subtle overlay above the video for readability
        const overlay = document.createElement('div');
        overlay.className = 'intro-overlay';

        // Insert as first children so slides render above
        introContainer.appendChild(video);
        introContainer.appendChild(overlay);

        // Attempt to play (some browsers block without user gesture)
        const playPromise = video.play();
        if (playPromise && typeof playPromise.then === 'function') {
            playPromise.catch(() => {
                // If autoplay is blocked, keep it muted and wait for any interaction (skip button)
                // No-op: the video will start once allowed
            });
        }

        // Pause video when tab is hidden to save resources; resume when visible
        document.addEventListener('visibilitychange', () => {
            try {
                if (document.hidden) {
                    if (!video.paused) video.pause();
                } else {
                    const p = video.play();
                    if (p && typeof p.catch === 'function') p.catch(() => {});
                }
            } catch {}
        });
    } catch (e) {
        console.warn('Intro background video could not be initialized:', e);
    }

    // Define the slides with placeholder content
    const slides = [
        {
            text: "Hello...",
            subText: "Welcome to my world.",
            duration: 4000
        },
        {
            text: "My name is Phal Chanouksa.",
            subText: "A developer, a creator.",

            duration: 5000
        },
        {
            text: "I believe in building a strong foundation.",
            subText: "In code, and in life.",

            duration: 5000
        },
        {
            text: "And cherishing the moments that matter.",
            subText: "Family, friends, and personal growth.",

            duration: 5000
        },
        {
            text: "Let's create something amazing together.",
            subText: "",
            duration: 4000
        }
    ];

    let currentSlideIndex = 0;

    function showSlide(index) {
        if (!slides[index]) return;
        
        const slideData = slides[index];
        const slideElement = document.createElement('div');
        slideElement.className = 'intro-slide';

        let content = '';
        if (slideData.image) {
            content += `<img src="${slideData.image}" class="slide-image" alt="Cinematic slide background">`;
        }
        content += `<div class="slide-text"><span>${slideData.text}</span></div>`;
        if (slideData.subText) {
            content += `<div class="sub-text"><span>${slideData.subText}</span></div>`;
        }
        
        slideElement.innerHTML = content;
        
        // Remove only the previous slide (keep background video and overlay)
        const previousSlide = introContainer.querySelector('.intro-slide');
        if (previousSlide) previousSlide.remove();
        introContainer.appendChild(slideElement);

        // Force reflow to restart animation
        void slideElement.offsetWidth;
        slideElement.classList.add('active');

        // Move to next slide or end
        setTimeout(() => {
            currentSlideIndex++;
            if (currentSlideIndex < slides.length) {
                showSlide(currentSlideIndex);
            } else {
                endIntro();
            }
        }, slideData.duration);
    }

    function endIntro() {
        introContainer.style.transition = 'opacity 1s ease-out';
        introContainer.style.opacity = '0';
        skipButton.style.transition = 'opacity 1s ease-out';
        skipButton.style.opacity = '0';

        setTimeout(() => {
            // Pause video to save resources
            const vid = introContainer.querySelector('video.intro-bg-video');
            if (vid && !vid.paused) {
                try { vid.pause(); } catch {}
            }
            introContainer.style.display = 'none';
            skipButton.style.display = 'none';
            // Prepare fade-in and reveal smoothly without layout shifts
            mainContent.style.visibility = 'visible';
            // ensure the transition is set only once
            mainContent.style.transition = 'opacity 650ms ease';
            // allow visibility to apply before changing opacity
            requestAnimationFrame(() => {
                mainContent.style.opacity = '1';
            });
            document.body.style.overflow = 'auto';
            // Mark intro as seen for this session
            sessionStorage.setItem('introSeen', 'true');
        }, 1000);
    }

    // Hide main content initially (opacity only to avoid layout/responsiveness issues)
    mainContent.style.opacity = '0';
    mainContent.style.visibility = 'hidden';
    mainContent.style.transition = 'opacity 650ms ease';
    document.body.style.overflow = 'hidden';

    // Skip button functionality
    skipButton.addEventListener('click', endIntro);

    // Start the intro
    showSlide(currentSlideIndex);
});
