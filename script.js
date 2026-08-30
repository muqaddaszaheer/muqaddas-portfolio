// ========================================
// Muqaddas Zaheer Ahmad — Portfolio
// Main JavaScript
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    // ========================================
    // Elements
    // ========================================

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    const navigationLinks = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const contactForm = document.querySelector("#contact-form");
    const formStatus = document.querySelector("#form-status");

    const skillItems = document.querySelectorAll(
        ".skill-orbit-item"
    );

    // ========================================
    // Mobile Navigation
    // ========================================

    const closeMobileMenu = () => {
        if (!navLinks || !menuToggle) {
            return;
        }

        navLinks.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        menuToggle.classList.remove("active");
    };

    const openMobileMenu = () => {
        if (!navLinks || !menuToggle) {
            return;
        }

        navLinks.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        menuToggle.classList.add("active");
    };

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", (event) => {
            event.stopPropagation();

            const isOpen =
                navLinks.classList.contains("active");

            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        navigationLinks.forEach((link) => {
            link.addEventListener("click", () => {
                closeMobileMenu();
            });
        });

        document.addEventListener("click", (event) => {
            const clickedInsideNavigation =
                navLinks.contains(event.target);

            const clickedMenuButton =
                menuToggle.contains(event.target);

            if (
                !clickedInsideNavigation &&
                !clickedMenuButton
            ) {
                closeMobileMenu();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMobileMenu();
            }
        });
    }

    // ========================================
    // Smooth Scrolling
    // ========================================

    navigationLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const header =
                document.querySelector(".site-header");

            const headerHeight =
                header
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

            window.history.replaceState(
                null,
                "",
                targetId
            );
        });
    });

    // ========================================
    // Active Navigation Link
    // ========================================

    if (
        sections.length > 0 &&
        navigationLinks.length > 0
    ) {
        const updateActiveNavigation = () => {
            const scrollPosition =
                window.scrollY + 160;

            let currentSection = "";

            sections.forEach((section) => {
                const sectionTop =
                    section.offsetTop;

                const sectionHeight =
                    section.offsetHeight;

                if (
                    scrollPosition >= sectionTop &&
                    scrollPosition <
                        sectionTop + sectionHeight
                ) {
                    currentSection =
                        section.getAttribute("id");
                }
            });

            if (
                window.innerHeight +
                    window.scrollY >=
                document.documentElement.scrollHeight - 10
            ) {
                const lastSection =
                    sections[sections.length - 1];

                currentSection =
                    lastSection.getAttribute("id");
            }

            navigationLinks.forEach((link) => {
                const href =
                    link.getAttribute("href");

                const isActive =
                    href === `#${currentSection}`;

                link.classList.toggle(
                    "active",
                    isActive
                );
            });
        };

        let scrollTicking = false;

        window.addEventListener(
            "scroll",
            () => {
                if (!scrollTicking) {
                    window.requestAnimationFrame(() => {
                        updateActiveNavigation();
                        scrollTicking = false;
                    });

                    scrollTicking = true;
                }
            },
            { passive: true }
        );

        window.addEventListener(
            "resize",
            updateActiveNavigation
        );

        updateActiveNavigation();
    }

    // ========================================
    // Skills Interaction
    // ========================================
    // The CSS controls the circular rotation.
    // JavaScript adds accessible hover/focus behavior
    // without replacing the CSS animation.

    if (skillItems.length > 0) {
        skillItems.forEach((skill) => {
            const skillName =
                skill.getAttribute("data-skill");

            if (skillName) {
                skill.setAttribute(
                    "title",
                    skillName
                );

                skill.setAttribute(
                    "aria-label",
                    skillName
                );

                skill.setAttribute(
                    "role",
                    "img"
                );
            }

            skill.addEventListener(
                "mouseenter",
                () => {
                    skill.classList.add(
                        "skill-hover"
                    );
                }
            );

            skill.addEventListener(
                "mouseleave",
                () => {
                    skill.classList.remove(
                        "skill-hover"
                    );
                }
            );

            skill.addEventListener(
                "focus",
                () => {
                    skill.classList.add(
                        "skill-hover"
                    );
                }
            );

            skill.addEventListener(
                "blur",
                () => {
                    skill.classList.remove(
                        "skill-hover"
                    );
                }
            );
        });
    }

    // ========================================
    // Contact Form
    // ========================================
    // GitHub Pages cannot process a form by itself.
    // This version validates the form and opens
    // Gmail directly in the browser.

    if (contactForm) {
        contactForm.addEventListener(
            "submit",
            (event) => {
                event.preventDefault();

                const nameInput =
                    document.querySelector("#name");

                const emailInput =
                    document.querySelector("#email");

                const messageInput =
                    document.querySelector("#message");

                if (
                    !nameInput ||
                    !emailInput ||
                    !messageInput
                ) {
                    return;
                }

                const name =
                    nameInput.value.trim();

                const email =
                    emailInput.value.trim();

                const message =
                    messageInput.value.trim();

                if (!name || !email || !message) {
                    showFormStatus(
                        "Please fill in all fields.",
                        "error"
                    );

                    return;
                }

                if (!isValidEmail(email)) {
                    showFormStatus(
                        "Please enter a valid email address.",
                        "error"
                    );

                    emailInput.focus();

                    return;
                }

                const subject =
                    `Portfolio message from ${name}`;

                const body =
                    `Name: ${name}\n` +
                    `Email: ${email}\n\n` +
                    `Message:\n${message}`;

                const gmailUrl =
                    "https://mail.google.com/mail/" +
                    "?view=cm" +
                    "&fs=1" +
                    "&tf=1" +
                    "&to=muqaddaszaheer76@gmail.com" +
                    `&su=${encodeURIComponent(subject)}` +
                    `&body=${encodeURIComponent(body)}`;

                showFormStatus(
                    "Opening Gmail...",
                    "success"
                );

                window.location.href = gmailUrl;
            }
        );
    }

    // ========================================
    // Email Validation
    // ========================================

    function isValidEmail(email) {
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);
    }

    // ========================================
    // Form Status
    // ========================================

    function showFormStatus(message, type) {
        if (!formStatus) {
            return;
        }

        formStatus.textContent = message;

        formStatus.classList.remove(
            "success",
            "error"
        );

        formStatus.classList.add(type);
    }

    // ========================================
    // Close Mobile Menu on Larger Screens
    // ========================================

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            closeMobileMenu();
        }
    });

    // ========================================
    // Prevent Broken Image Appearance
    // ========================================

    const images =
        document.querySelectorAll("img");

    images.forEach((image) => {
        image.addEventListener(
            "error",
            () => {
                image.classList.add(
                    "image-load-error"
                );
            }
        );
    });

    // ========================================
    // Initial Page State
    // ========================================

    closeMobileMenu();
});
