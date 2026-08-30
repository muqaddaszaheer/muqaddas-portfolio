// ========================================
// Muqaddas Zaheer Ahmad — Portfolio
// Main JavaScript
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navigationLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("main section[id]");

    // ----------------------------------------
    // Mobile Navigation
    // ----------------------------------------

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", (event) => {
            event.stopPropagation();

            const isOpen = navLinks.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        // Close mobile menu after clicking a navigation link
        navigationLinks.forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener("click", (event) => {
            if (
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                navLinks.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            }
        });

        // Close menu when pressing Escape
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                navLinks.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                menuToggle.focus();
            }
        });
    }

    // ----------------------------------------
    // Active Navigation Link While Scrolling
    // ----------------------------------------

    if (sections.length && navigationLinks.length) {
        const updateActiveLink = () => {
            const scrollPosition = window.scrollY + 160;
            let currentSection = sections[0].id;

            sections.forEach((section) => {
                if (scrollPosition >= section.offsetTop) {
                    currentSection = section.id;
                }
            });

            navigationLinks.forEach((link) => {
                const target = link.getAttribute("href");

                if (target === `#${currentSection}`) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            });
        };

        window.addEventListener("scroll", updateActiveLink, {
            passive: true
        });

        window.addEventListener("resize", updateActiveLink);

        updateActiveLink();
    }

    // ----------------------------------------
    // Close Mobile Menu When Resizing
    // ----------------------------------------

    window.addEventListener("resize", () => {
        if (window.innerWidth > 760 && menuToggle && navLinks) {
            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        }
    });
});
