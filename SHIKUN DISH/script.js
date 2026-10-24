
/* =========================================
   SHIKUN'S DISH
   Main JavaScript
========================================= */


/* ========== 1. ENABLE JAVASCRIPT STYLES ========== */

// Lets the CSS know JavaScript is available.
document.documentElement.classList.add("js-enabled");


/* ========== 2. MOBILE NAVIGATION ========== */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    // Open and close the mobile navigation.
    menuToggle.addEventListener("click", function () {

        const isOpen = navLinks.classList.toggle("active");

        // Update accessibility information.
        menuToggle.setAttribute("aria-expanded", isOpen);

        // Change the menu icon.
        menuToggle.innerHTML = isOpen
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

    });


    // Close the mobile menu after a navigation link is clicked.
    navLinks.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';

        });

    });


    // Close the menu when clicking outside it.
    document.addEventListener("click", function (event) {

        const clickedInsideMenu = navLinks.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';

        }

    });


    // Close the mobile menu when the Escape key is pressed.
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';

            menuToggle.focus();

        }

    });

}


/* ========== 3. SCROLL REVEAL ANIMATIONS ========== */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(function (entry) {

                // Check whether the element is entering the screen.
                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    // Stop observing after the animation runs.
                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12,
            rootMargin: "0px 0px -30px 0px"
        }

    );


    // Observe every element with the reveal class.
    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });

} else {

    // Fallback for browsers without IntersectionObserver.
    revealElements.forEach(function (element) {

        element.classList.add("active");

    });

}


/* ========== 4. AUTOMATIC COPYRIGHT YEAR ========== */

const currentYear = document.getElementById("current-year");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


/* ========== 5. WHATSAPP FOOD ORDERING ========== */

// Your WhatsApp number in international format.
// Do not include the leading zero or the plus sign.
const whatsappNumber = "2347062955515";


// Build a WhatsApp URL using an order message.
function createWhatsAppLink(message) {

    const encodedMessage = encodeURIComponent(message);

    return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

}


// Add ordering functionality to elements with data-item attributes.
//
// Example HTML:
// <button class="order-button" data-item="Jollof Rice">
//     Order Now
// </button>

const orderButtons = document.querySelectorAll("[data-item]");

orderButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {

        // Only handle buttons and links intended for ordering.
        const isOrderButton =
            button.classList.contains("order-button") ||
            button.classList.contains("food-order");

        if (!isOrderButton) {
            return;
        }

        const foodName = button.dataset.item;

        if (!foodName) {
            return;
        }

        event.preventDefault();

        const message =
            `Hello Shikun's Dish! I would like to order ${foodName}.`;

        window.open(
            createWhatsAppLink(message),
            "_blank",
            "noopener,noreferrer"
        );

    });

});


/* ========== 6. VIDEO SUPPORT ========== */

const sandwichVideo = document.querySelector(".sandwich-video video");

if (sandwichVideo) {

    // Pause the video when the browser tab is hidden.
    document.addEventListener("visibilitychange", function () {

        if (document.hidden && !sandwichVideo.paused) {

            sandwichVideo.pause();

        }

    });

}


/* ========== 7. BACK-TO-TOP FUNCTIONALITY ========== */

const backToTop = document.querySelector(".back-to-top");

if (backToTop) {

    backToTop.addEventListener("click", function (event) {

        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* ========== 8. IMAGE LOADING FALLBACK ========== */

// Add a class to images that fail to load.
// This helps identify missing or incorrectly named files.

const images = document.querySelectorAll("img");

images.forEach(function (image) {

    image.addEventListener("error", function () {

        image.classList.add("image-error");

        console.warn(
            "Image could not be loaded:",
            image.getAttribute("src")
        );

    });

});


/* ========== 9. ACTIVE NAVIGATION LINK ========== */

// Highlight the navigation link for the current section.

const pageSections = document.querySelectorAll(
    "main section[id], header[id]"
);

const sectionLinks = document.querySelectorAll(
    '.nav-links a[href^="#"]'
);

if ("IntersectionObserver" in window && pageSections.length > 0) {

    const sectionObserver = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    const sectionId = entry.target.id;

                    sectionLinks.forEach(function (link) {

                        const isCurrent =
                            link.getAttribute("href") === `#${sectionId}`;

                        if (isCurrent) {

                            link.setAttribute("aria-current", "location");

                        } else {

                            link.removeAttribute("aria-current");

                        }

                    });

                }

            });

        },

        {
            rootMargin: "-25% 0px -65% 0px",
            threshold: 0
        }

    );


    pageSections.forEach(function (section) {

        sectionObserver.observe(section);

    });

}


/* ========== 10. PAGE INITIALIZATION ========== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Shikun's Dish website is ready!");

});

