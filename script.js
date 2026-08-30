// ========================================
// Muqaddas Zaheer Ahmad — Portfolio
// Main JavaScript
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    // Mobile navigation
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        // Close menu after clicking a navigation link
        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            });
        });

        // Close menu when clicking outside it
        document.addEventListener("click", (event) => {
            const clickedInsideMenu = navLinks.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                navLinks.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            }
        });
    }

    // Update the active navigation link while scrolling
    const sections = document.querySelectorAll("main section[id]");
    const navigationLinks = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );

    if (sections.length && navigationLinks.length) {
        const updateActiveLink = () => {
            let currentSection = "";

            sections.forEach((section) => {
                const sectionTop = section.offsetTop - 120;

                if (window.scrollY >= sectionTop) {
                    currentSection = section.getAttribute("id");
                }
            });

            navigationLinks.forEach((link) => {
                const isActive =
                    link.getAttribute("href") === `#${currentSection}`;

                link.classList.toggle("active", isActive);
            });
        };

        window.addEventListener("scroll", updateActiveLink, {
            passive: true
        });

        updateActiveLink();
    }
});
