const navigationHTML = `
<div class="container nav-container">

    <div class="logo-area">
        <a href="/">
            <img width="180" height="48" loading="lazy" decoding="async" src="images/logo.svg" alt="ExcelKidsHub Phonics Academy Logo">
        </a>
    </div>

    <div class="call-button">
        <a href="tel:+918793135679" aria-label="Call us">
            <img width="40" height="40" loading="lazy" decoding="async" src="images/icon/icon-phone-round.svg" alt="Call ExcelKidsHub" class="call-icon-img">
        </a>
    </div>

    <div class="hamburger" id="hamburger">
        <span id="hamburger-icon">☰</span>
        <span id="close-icon" style="display:none">&#10005;</span>
    </div>

    <nav class="nav-links" id="navLinks">
        <a href="/">Home</a>
        <a href="schedule">Schedule</a>
        <a href="admissions">Admissions</a>
        <a href="teacher-training-admission">Teacher Training</a>
        <a href="courses">Courses</a>
        <a href="gallery">Gallery</a>
        <a href="contact">Contact</a>
    </nav>

</div>
`;

const footerHTML = `
<footer class="site-footer">
    <div class="site-footer__inner">
        <div class="site-footer__top">
            <div class="site-footer__brand">
                <img loading="lazy" decoding="async" src="images/logo.svg" alt="ExcelKidsHub Logo" class="site-footer__logo">
                <p class="site-footer__tagline">Structured phonics classes for children in Dhanori, Pune.</p>
                <div class="site-footer__trust">
                    <a href="https://www.google.com/search?q=excelkidshub+phonics+academy+dhanori+pune+reviews" target="_blank" rel="noreferrer" class="site-footer__review">
                        <img width="160" height="38" src="images/icon/Five-Star-Review-Google-Business-Rating-PNG.png" alt="Google reviews 5 star" loading="lazy" decoding="async">
                    </a>
                    <span class="site-footer__badge">Govt. Registered</span>
                    <span class="site-footer__badge">ISO 9001:2015</span>
                </div>
            </div>
            <div class="site-footer__meta">
                <div class="site-footer__links">
                    <h3>Quick Links</h3>
                    <div class="site-footer__link-grid">
                        <a href="/">Home</a>
                        <a href="about">About Us</a>
                        <a href="courses">Courses</a>
                        <a href="schedule">Schedule</a>
                        <a href="teacher-training-admission">Teacher Training</a>
                        <a href="gallery">Gallery</a>
                        <a href="contact">Contact</a>
                    </div>
                </div>
                <div class="site-footer__contact">
                    <h3>Contact & Follow</h3>
                    <p><a href="tel:+918793135679">+91 8793135679</a></p>
                    <p><a href="mailto:excelkidshub.edu@gmail.com">excelkidshub.edu@gmail.com</a></p>
                    <p>Inside Lakewood Preschool, Dhanori, Pune</p>
                    <div class="site-footer__social">
                        <a href="https://www.facebook.com/excelkidshubphonics/" target="_blank" aria-label="Facebook"><img width="32" height="32" loading="lazy" decoding="async" src="images/icon/icon-facebook.svg" alt="Facebook"></a>
                        <a href="https://www.instagram.com/excelkidshub/" target="_blank" aria-label="Instagram"><img width="32" height="32" loading="lazy" decoding="async" src="images/icon/instagram.svg" alt="Instagram"></a>
                        <a href="https://www.pinterest.com/excelkidshub/" target="_blank" aria-label="Pinterest"><img width="32" height="32" loading="lazy" decoding="async" src="images/icon/pinterest.svg" alt="Pinterest"></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="site-footer__bottom">
            © 2026 ExcelKidsHub Phonics Academy | Dhanori Pune
        </div>
    </div>
</footer>
`;

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("nav-placeholder").innerHTML = navigationHTML;
    if (document.getElementById("footer-placeholder")) {
        document.getElementById("footer-placeholder").innerHTML = footerHTML;
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
