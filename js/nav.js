// Dynamic navigation based on authentication status
function getNavigationHTML(isLoggedIn) {
  if (isLoggedIn) {
    return `
<div class="container nav-container">

    <div class="logo-area">
        <a href="/">
            <img width="180" height="48" loading="lazy" decoding="async" src="/images/logo.svg" alt="ExcelKidsHub Phonics Academy Logo">
        </a>
    </div>

    <div class="call-button">
        <a href="tel:+918793135679" aria-label="Call us">
            <img width="40" height="40" loading="lazy" decoding="async" src="/images/icon/icon-phone-round.svg" alt="Call ExcelKidsHub" class="call-icon-img">
        </a>
    </div>

    <div class="hamburger" id="hamburger">
        <span id="hamburger-icon">☰</span>
        <span id="close-icon" style="display:none">&#10005;</span>
    </div>

    <nav class="nav-links" id="navLinks">
        <a href="/">Home</a>
        <a href="/courses.html">Courses</a>
        <a href="/schedule.html">Schedule</a>
        <a href="/pricing.html">Pricing</a>
        <a href="/about.html">About</a>
        <a href="/contact.html">Contact</a>
        <div class="dropdown">
            <a href="/dashboard/index.html" class="dropdown-toggle">Dashboard ▼</a>
            <div class="dropdown-menu">
                <a href="/dashboard/index.html">Dashboard</a>
                <a href="/dashboard/index.html#courses">My Courses</a>
                <a href="/dashboard/index.html#subscription">Subscription</a>
                <a href="/dashboard/profile.html">Profile</a>
                <a href="#" id="logout-link">Logout</a>
            </div>
        </div>
    </nav>

</div>
`;
  } else {
    return `
<div class="container nav-container">

    <div class="logo-area">
        <a href="/">
            <img width="180" height="48" loading="lazy" decoding="async" src="/images/logo.svg" alt="ExcelKidsHub Phonics Academy Logo">
        </a>
    </div>

    <div class="call-button">
        <a href="tel:+918793135679" aria-label="Call us">
            <img width="40" height="40" loading="lazy" decoding="async" src="/images/icon/icon-phone-round.svg" alt="Call ExcelKidsHub" class="call-icon-img">
        </a>
    </div>

    <div class="hamburger" id="hamburger">
        <span id="hamburger-icon">☰</span>
        <span id="close-icon" style="display:none">&#10005;</span>
    </div>

    <nav class="nav-links" id="navLinks">
        <a href="/">Home</a>
        <a href="/courses.html">Courses</a>
        <a href="/schedule.html">Schedule</a>
        <a href="/pricing.html">Pricing</a>
        <a href="/about.html">About</a>
        <a href="/contact.html">Contact</a>
        <a href="/login.html" class="btn-nav-login">Login</a>
        <a href="/register.html" class="btn-nav-register">Register</a>
    </nav>

</div>
`;
  }
}

const footerHTML = `
<footer class="ekh-footer" aria-label="ExcelKidsHub footer">
    <div class="ekh-footer__cta">
        <div>
            <span class="ekh-footer__eyebrow">Admissions open</span>
            <strong>Book a free phonics demo for your child.</strong>
        </div>
        <a href="/contact.html" class="ekh-footer__cta-link">Book Free Demo</a>
    </div>

    <div class="ekh-footer__inner">
        <div class="ekh-footer__brand-card">
            <a href="/" class="ekh-footer__logo-link" aria-label="ExcelKidsHub home">
                <img loading="lazy" decoding="async" src="/images/logo.svg" alt="ExcelKidsHub Phonics Academy" class="ekh-footer__logo">
            </a>
            <p>Structured phonics, reading, grammar, and teacher training programs from Dhanori, Pune.</p>
            <div class="ekh-footer__badges" aria-label="Trust badges">
                <span>Govt. Registered</span>
                <span>ISO 9001:2015</span>
            </div>
            <a href="https://www.google.com/search?q=excelkidshub+phonics+academy+dhanori+pune+reviews" target="_blank" rel="noreferrer" class="ekh-footer__review">
                <img width="160" height="38" src="/images/icon/Five-Star-Review-Google-Business-Rating-PNG.png" alt="Google 5 star reviews" loading="lazy" decoding="async">
            </a>
        </div>

        <nav class="ekh-footer__col" aria-label="Footer navigation">
            <h2>Explore</h2>
            <a href="/">Home</a>
            <a href="/about.html">About Us</a>
            <a href="/schedule.html">Schedule</a>
            <a href="/admissions.html">Admissions</a>
            <a href="/gallery.html">Gallery</a>
            <a href="/contact.html">Contact</a>
        </nav>

        <nav class="ekh-footer__col" aria-label="Programs">
            <h2>Programs</h2>
            <a href="/courses.html">Phonics Courses</a>
            <a href="/teacher-training-admission.html">Teacher Training</a>
            <a href="/english-grammar-classes-dhanori.html">English Grammar</a>
            <a href="/phonics-classes-dhanori-pune.html">Dhanori Classes</a>
            <a href="/phonics-classes-vishrantwadi.html">Vishrantwadi Classes</a>
        </nav>

        <div class="ekh-footer__col ekh-footer__contact">
            <h2>Visit & Contact</h2>
            <a href="tel:+918793135679">+91 8793135679</a>
            <a href="mailto:excelkidshub.edu@gmail.com">excelkidshub.edu@gmail.com</a>
            <p>Inside Lakewood Preschool, Dhanori, Pune 411015</p>
            <div class="ekh-footer__social" aria-label="Social links">
                <a href="https://www.facebook.com/excelkidshubphonics/" target="_blank" rel="noreferrer" aria-label="Facebook">
                    <img width="22" height="22" loading="lazy" decoding="async" src="/images/icon/icon-facebook.svg" alt="">
                </a>
                <a href="https://www.instagram.com/excelkidshub/" target="_blank" rel="noreferrer" aria-label="Instagram">
                    <img width="22" height="22" loading="lazy" decoding="async" src="/images/icon/instagram.svg" alt="">
                </a>
                <a href="https://www.pinterest.com/excelkidshub/" target="_blank" rel="noreferrer" aria-label="Pinterest">
                    <img width="22" height="22" loading="lazy" decoding="async" src="/images/icon/pinterest.svg" alt="">
                </a>
            </div>
        </div>
    </div>

    <div class="ekh-footer__bottom">
        <span>&copy; 2026 ExcelKidsHub Phonics Academy</span>
        <span>Dhanori, Pune</span>
    </div>
</footer>
`;

document.addEventListener("DOMContentLoaded", function() {
    // Check authentication status
    const isLoggedIn = localStorage.getItem('jwt_token') !== null;
    
    // Render appropriate navigation
    document.getElementById("nav-placeholder").innerHTML = getNavigationHTML(isLoggedIn);
    
    if (document.getElementById("footer-placeholder")) {
        document.getElementById("footer-placeholder").innerHTML = footerHTML;
    }

    // Handle logout link
    const logoutLink = document.getElementById("logout-link");
    if (logoutLink) {
        logoutLink.addEventListener("click", function(e) {
            e.preventDefault();
            localStorage.removeItem('jwt_token');
            localStorage.removeItem('user_data');
            localStorage.removeItem('subscription_data');
            localStorage.removeItem('courses_data');
            window.location.href = '/';
        });
    }

    // Active Menu Highlight
    const currentPage = window.location.pathname.replace(/\/$/, '').split("/").pop();
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
        let href = link.getAttribute("href").replace(/\/$/, '');
        href = href.replace(/^\//, '');
        if ((currentPage === "" && href === "") || href === currentPage) {
            link.classList.add("active-link");
        }
    });

    // Hamburger Toggle with Cross
    const hamburger = document.getElementById("hamburger");
    const nav = document.getElementById("navLinks");
    const hamburgerIcon = document.getElementById("hamburger-icon");
    const closeIcon = document.getElementById("close-icon");

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            nav.classList.toggle("show-menu");
            if(nav.classList.contains("show-menu")) {
                hamburgerIcon.style.display = "none";
                closeIcon.style.display = "inline";
            } else {
                hamburgerIcon.style.display = "inline";
                closeIcon.style.display = "none";
            }
        });
    }

    // Close menu when clicking a link (mobile UX)
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if(window.innerWidth <= 900 && nav.classList.contains("show-menu")) {
                nav.classList.remove("show-menu");
                hamburgerIcon.style.display = "inline";
                closeIcon.style.display = "none";
            }
        });
    });
});

(function loadChatbase() {
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
        window.chatbase = (...args) => {
            if (!window.chatbase.q) {
                window.chatbase.q = [];
            }
            window.chatbase.q.push(args);
        };
        window.chatbase = new Proxy(window.chatbase, {
            get(target, prop) {
                if (prop === "q") {
                    return target.q;
                }
                return (...args) => target(prop, ...args);
            }
        });
    }

    const onLoad = function() {
        if (document.getElementById("RVl2fwyqcmW-c5qfoEEND")) return;

        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "RVl2fwyqcmW-c5qfoEEND";
        script.domain = "www.chatbase.co";
        document.body.appendChild(script);
    };

    if (document.readyState === "complete") {
        onLoad();
    } else {
        window.addEventListener("load", onLoad);
    }
})();
