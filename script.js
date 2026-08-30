// ========================================
// Muqaddas Zaheer Ahmad — Portfolio
// Main JavaScript
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    // ========================================
    // Mobile Navigation
    // ========================================

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

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
            const clickedInsideNav = navLinks.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideNav && !clickedToggle) {
                closeMenu();
            }
        });

        // Close menu with Escape key
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        // Reset mobile menu when returning to desktop
        window.addEventListener("resize", () => {
            if (window.innerWidth > 900) {
                closeMenu();
            }
        });
    }


    // ========================================
    // Smooth Scrolling
    // ========================================

    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const header = document.querySelector(".site-header");
            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: Math.max(0, targetPosition),
                behavior: "smooth"
            });

            // Update URL without forcing an unwanted page jump
            if (history.pushState) {
                history.pushState(null, "", targetId);
            }
        });
    });


    // ========================================
    // Active Navigation Link on Scroll
    // ========================================

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const navigationLinks = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );

    if (sections.length && navigationLinks.length) {
        const updateActiveLink = () => {
            const scrollPosition =
                window.scrollY +
                window.innerHeight * 0.35;

            let currentSection = "";

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionBottom =
                    sectionTop + section.offsetHeight;

                if (
                    scrollPosition >= sectionTop &&
                    scrollPosition < sectionBottom
                ) {
                    currentSection = section.id;
                }
            });

            // If the user is near the bottom of the page,
            // activate the last visible section.
            if (
                window.innerHeight +
                    window.scrollY >=
                document.documentElement.scrollHeight - 20
            ) {
                const lastSection =
                    sections[sections.length - 1];

                currentSection = lastSection.id;
            }

            navigationLinks.forEach((link) => {
                const linkTarget =
                    link.getAttribute("href");

                const isActive =
                    linkTarget === `#${currentSection}`;

                link.classList.toggle(
                    "active",
                    isActive
                );

                if (isActive) {
                    link.setAttribute(
                        "aria-current",
                        "page"
                    );
                } else {
                    link.removeAttribute(
                        "aria-current"
                    );
                }
            });
        };

        let scrollTicking = false;

        window.addEventListener(
            "scroll",
            () => {
                if (!scrollTicking) {
                    window.requestAnimationFrame(() => {
                        updateActiveLink();
                        scrollTicking = false;
                    });

                    scrollTicking = true;
                }
            },
            { passive: true }
        );

        window.addEventListener(
            "resize",
            updateActiveLink
        );

        updateActiveLink();
    }


    // ========================================
    // Skill Icon Rotation
    // ========================================
    // CSS performs the actual continuous rotation.
    // JavaScript only provides optional pause/resume
    // behavior when the user interacts with the skill area.

    const skillOrbit = document.querySelector(
        ".skills-orbit"
    );

    if (skillOrbit) {
        const pauseRotation = () => {
            skillOrbit.classList.add(
                "rotation-paused"
            );
        };

        const resumeRotation = () => {
            skillOrbit.classList.remove(
                "rotation-paused"
            );
        };

        skillOrbit.addEventListener(
            "mouseenter",
            pauseRotation
        );

        skillOrbit.addEventListener(
            "mouseleave",
            resumeRotation
        );

        skillOrbit.addEventListener(
            "focusin",
            pauseRotation
        );

        skillOrbit.addEventListener(
            "focusout",
            resumeRotation
        );
    }


    // ========================================
    // Current Year
    // ========================================

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );

    yearElements.forEach((element) => {
        element.textContent =
            new Date().getFullYear();
    });


    // ========================================
    // Prevent Broken External Links
    // ========================================
    // External links open safely in a new tab.

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );

    externalLinks.forEach((link) => {
        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );
    });
});
