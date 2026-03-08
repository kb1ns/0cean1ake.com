document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Animation with Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // 2. Glitch Text Effect
    const glitchElement = document.querySelector('.glitch');
    if (glitchElement) {
        const originalText = glitchElement.getAttribute('data-text');
        const chars = '!<>-_\\/[]{}—=+*^?#________';
        
        setInterval(() => {
            if (Math.random() > 0.95) { // Occasional glitch
                let glitchedText = originalText.split('').map(char => {
                    if (Math.random() > 0.9) {
                        return chars[Math.floor(Math.random() * chars.length)];
                    }
                    return char;
                }).join('');
                
                glitchElement.innerText = glitchedText;
                glitchElement.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
                glitchElement.style.color = Math.random() > 0.5 ? 'var(--primary-color)' : 'var(--accent-color)';
                
                setTimeout(() => {
                    glitchElement.innerText = originalText;
                    glitchElement.style.transform = 'translate(0, 0)';
                    glitchElement.style.color = '#fff';
                }, 100);
            }
        }, 200);
    }

    // 3. Simple Particles Background
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        
        // Random properties
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100; // vw
        const y = Math.random() * 100; // vh
        const opacity = Math.random() * 0.5 + 0.1;
        const duration = Math.random() * 20 + 10; // 10-30s
        const delay = Math.random() * 5;

        // Styling
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = 'rgba(0, 229, 255, ' + opacity + ')';
        particle.style.borderRadius = '50%';
        particle.style.left = `${x}vw`;
        particle.style.top = `${y}vh`;
        particle.style.boxShadow = `0 0 ${size * 2}px rgba(0, 229, 255, 0.5)`;
        
        // Simple float animation logic via CSS transition or manual update
        // We'll just use a small CSS animation injected
        particle.style.animation = `float ${duration}s linear infinite ${delay}s alternate`;
        
        particlesContainer.appendChild(particle);
    }

    // Inject float keyframes
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes float {
            0% { transform: translateY(0) translateX(0); opacity: 0.1; }
            50% { opacity: 0.8; }
            100% { transform: translateY(-100px) translateX(50px); opacity: 0.1; }
        }
    `;
    document.head.appendChild(styleSheet);
});