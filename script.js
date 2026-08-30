// ========================================
// Muqaddas Zaheer Ahmad — Portfolio
// Main JavaScript
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    // ---------- Mobile Navigation ----------
    if (menuToggle && navLinks) {
        const closeMenu = () => {
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        };

        const openMenu = () => {
            navLinks.classList.add("active");
            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute("aria-label", "Close navigation menu");
        };

        menuToggle.addEventListener("click", (event) => {
            event.stopPropagation();

            const isOpen = navLinks.classList.contains("active");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close menu after clicking a navigation link
        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                closeMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", (event) => {
            if (
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }
        });

        // Close menu when pressing Escape
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });
    }

    // ---------- Active Navigation Link ----------
    const sections = document.querySelectorAll("main section[id]");
    const navigationLinks = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );

    if (sections.length && navigationLinks.length) {
        const updateActiveLink = () => {
            let currentSection = "";

            sections.forEach((section) => {
                const sectionTop = section.offsetTop - 130;

                if (window.scrollY >= sectionTop) {
                    currentSection = section.id;
                }
            });

            navigationLinks.forEach((link) => {
                const targetSection = link.getAttribute("href");

                link.classList.toggle(
                    "active",
                    targetSection === `#${currentSection}`
                );
            });
        };

        window.addEventListener("scroll", updateActiveLink, {
            passive: true
        });

        updateActiveLink();
    }
});
