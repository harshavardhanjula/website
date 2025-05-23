document.addEventListener('DOMContentLoaded', function() {
    // Set current date in declaration
    const currentDateElement = document.getElementById('current-date');
    if (currentDateElement) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        currentDateElement.textContent = new Date().toLocaleDateString('en-US', options);
    }

    // Typing Effect
    const typedTextSpan = document.querySelector(".typed-text");
    const cursor = document.querySelector(".cursor");
    const words = ["AI/ML Engineer", "Data Scientist", "Python Developer", "Problem Solver", "Tech Enthusiast"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100; // Typing speed in milliseconds
    let deleteSpeed = 50; // Deleting speed in milliseconds
    let waitTime = 1500; // Wait time before starting to delete

    function type() {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        
        typedTextSpan.textContent = currentChar;
        
        if (!isDeleting && charIndex < currentWord.length) {
            // Typing
            charIndex++;
            typeSpeed = 100;
        } else if (isDeleting && charIndex > 0) {
            // Deleting
            charIndex--;
            typeSpeed = deleteSpeed;
        } else if (isDeleting && charIndex === 0) {
            // Switch to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before typing next word
        } else if (charIndex === currentWord.length) {
            // Start deleting after pause
            isDeleting = true;
            typeSpeed = waitTime;
        }
        
        setTimeout(type, typeSpeed);
    }

    // Start the typing effect
    setTimeout(type, 1000);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    document.querySelector('.hamburger').classList.remove('active');
                }
            }
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Add scroll animation for sections
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // Add parallax effect to background
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth * 20 - 10;
        const y = e.clientY / window.innerHeight * 20 - 10;
        document.querySelector('.background-animation').style.transform = `translate(${x}px, ${y}px)`;
    });

    // Add scroll reveal animation
    const revealElements = document.querySelectorAll('.section, .about-content, .skill-tags, .contact-form');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
