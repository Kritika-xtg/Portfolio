document.addEventListener('DOMContentLoaded', function() {

    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-links li a'); // Get all nav links

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('open'); // For changing hamburger to X icon

            // Toggle ARIA attributes for accessibility
            const isExpanded = navLinks.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);

            // Change icon based on state (assuming Font Awesome icons)
            const icon = menuToggle.querySelector('i');
            if (isExpanded) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when a link is clicked
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }


    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight || 70; // Get header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });


    // Active Navigation Link Highlighting on Scroll
    const sections = document.querySelectorAll('main section[id]'); // Only sections in main with an ID
    const header = document.querySelector('header');

    function changeNavActiveState() {
        let currentSectionId = '';
        const headerHeight = header ? header.offsetHeight : 0;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50; // Adjusted offset
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Special case for hero section when at the very top
        if (window.scrollY < (sections[0].offsetTop - headerHeight - 50)) {
            currentSectionId = sections[0].getAttribute('id');
        }

        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // Header Style Change on Scroll
    function handleHeaderScroll() {
        if (header) {
            if (window.scrollY > 50) { // Add 'scrolled' class after scrolling 50px
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    // Add scroll event listener for active nav and header style
    window.addEventListener('scroll', () => {
        changeNavActiveState();
        handleHeaderScroll();
    });
    // Initial check on page load
    changeNavActiveState();
    handleHeaderScroll();


    // Dynamic Year in Footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Simple Fade-in Animation for elements on scroll (can be expanded)
    // This is a basic version. For more complex animations, Intersection Observer API is better.
    const animatedElements = document.querySelectorAll('.education-item, .skill-item, .project-card');

    function checkElementsInView() {
        animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            // If element is partially in viewport
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                // You might want to add a class here instead of direct style manipulation
                // e.g., element.classList.add('in-view');
                // And then define .in-view in CSS for the animation
            }
        });
    }

    // Initial styling for animation (set in CSS for elements that will animate)
    // For example, in your CSS:
    // .education-item, .skill-item, .project-card {
    //    opacity: 0;
    //    transform: translateY(20px);
    //    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    // }

    // Call checkElementsInView on scroll and load
    window.addEventListener('scroll', checkElementsInView);
    window.addEventListener('resize', checkElementsInView); // Also check on resize
    // Initial check
    // setTimeout(checkElementsInView, 300); // Slight delay to ensure content is loaded

    // Note: The primary section fade-in is handled by CSS keyframes.
    // This JS part is for individual elements within sections if you want more granular control.
    // For now, I'll rely on the CSS keyframes for main sections and the hover effects we added.
    // The above `checkElementsInView` can be activated if you want more scroll-triggered animations for these items.
    // To activate it, uncomment the initial styles in CSS and the setTimeout call.
});