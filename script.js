// =========================================================
// Muqaddas Zaheer Ahmad — Portfolio
// Main JavaScript
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navigationLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("main section[id]");
    const contactForm = document.querySelector("#contact-form");
    const formNote = document.querySelector("#form-note");


    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const closeMenu = () => {

        if (!menuToggle || !navLinks) {
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
    };


    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", (event) => {

            event.stopPropagation();

            const isOpen =
                navLinks.classList.toggle("active");

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

            const clickedInsideMenu =
                navLinks.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedToggle
            ) {
                closeMenu();
            }

        });


        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION LINK
       ===================================================== */

    const updateActiveLink = () => {

        if (
            !sections.length ||
            !navigationLinks.length
        ) {
            return;
        }

        const scrollPosition =
            window.scrollY + 170;

        let currentSection =
            sections[0].id;

        sections.forEach((section) => {

            if (
                scrollPosition >=
                section.offsetTop
            ) {
                currentSection =
                    section.id;
            }

        });


        navigationLinks.forEach((link) => {

            const target =
                link.getAttribute("href");

            link.classList.toggle(
                "active",
                target === `#${currentSection}`
            );

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveLink,
        {
            passive: true
        }
    );

    window.addEventListener(
        "resize",
        updateActiveLink
    );

    updateActiveLink();


    /* =====================================================
       CONTACT FORM
       ===================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                const name =
                    document.querySelector("#name").value.trim();

                const email =
                    document.querySelector("#email").value.trim();

                const message =
                    document.querySelector("#message").value.trim();


                if (
                    !name ||
                    !email ||
                    !message
                ) {

                    if (formNote) {
                        formNote.textContent =
                            "Please complete all fields.";
                    }

                    return;
                }


                const subject =
                    encodeURIComponent(
                        `Portfolio message from ${name}`
                    );

                const body =
                    encodeURIComponent(
                        `Name: ${name}\n\n` +
                        `Email: ${email}\n\n` +
                        `Message:\n${message}`
                    );


                const mailto =
                    `mailto:muqaddaszaheer76@gmail.com` +
                    `?subject=${subject}` +
                    `&body=${body}`;


                if (formNote) {

                    formNote.textContent =
                        "Opening your email app...";

                }


                window.location.href =
                    mailto;

            }
        );

    }


    /* =====================================================
       CLOSE MENU AFTER RESIZING TO DESKTOP
       ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 850
            ) {
                closeMenu();
            }

        }
    );

});
