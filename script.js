// ========================================
// Muqaddas Zaheer Ahmad — Portfolio
// Main JavaScript
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navigationLinks = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );
    const sections = document.querySelectorAll("main section[id]");

    // ----------------------------------------
    // Mobile Navigation
    // ----------------------------------------

    if (menuToggle && navLinks) {
        const closeMenu = () => {
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        };

        menuToggle.addEventListener("click", (event) => {
            event.stopPropagation();

            const isOpen = navLinks.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );
        });

        navigationLinks.forEach((link) => {
            link.addEventListener("click", () => {
                closeMenu();
            });
        });

        document.addEventListener("click", (event) => {
            if (
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) {
                closeMenu();
            }
        });
    }

    // ----------------------------------------
    // Active Navigation Link
    // ----------------------------------------

    if (sections.length && navigationLinks.length) {
        const updateActiveLink = () => {
            const scrollPosition = window.scrollY + 160;
            let currentSection = "home";

            sections.forEach((section) => {
                if (scrollPosition >= section.offsetTop) {
                    currentSection = section.id;
                }
            });

            navigationLinks.forEach((link) => {
                const href = link.getAttribute("href");
                const isActive = href === `#${currentSection}`;

                link.classList.toggle("active", isActive);
            });
        };

        window.addEventListener("scroll", updateActiveLink, {
            passive: true
        });

        window.addEventListener("resize", updateActiveLink);

        updateActiveLink();
    }
});
