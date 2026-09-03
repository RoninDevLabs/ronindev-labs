(function () {
  "use strict";

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById("nav-toggle");
  var mobileNav = document.getElementById("mobile-nav");

  function closeMobileNav() {
    if (!navToggle || !mobileNav) return;
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("is-open");
  }

  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMobileNav);
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  var sections = Array.prototype.slice
    .call(document.querySelectorAll("main section[id], header#top"))
    .filter(Boolean);
  var navLinks = document.querySelectorAll(".nav-link");

  function setActiveLink() {
    var scrollPos = window.scrollY + 140;
    var currentId = "top";

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      var href = link.getAttribute("href").replace("#", "");
      link.classList.toggle("is-active", href === currentId);
    });
  }

  /* ---------- Back to top ---------- */
  var backToTop = document.getElementById("back-to-top");

  function onScroll() {
    setActiveLink();
    if (backToTop) {
      backToTop.classList.toggle("is-visible", window.scrollY > 480);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Contact form (client-side only) ---------- */
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");

  if (form && status) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        status.textContent = "Please fill in your name, email, and message before sending.";
        return;
      }

      var name = form.querySelector("#name").value.trim();
      status.textContent =
        "Thanks" + (name ? ", " + name : "") + " — your message is ready to send. Connect a form backend to deliver it to your inbox.";
      form.reset();
    });
  }

  /* ---------- Marquee animation ---------- */
  const marquee = document.querySelector(".ticker-inner");
  marquee.innerHTML += marquee.innerHTML;
  const speed = 1;
  let x = 0;
  const contentWidth = marquee.scrollWidth / 2;

  const animate = () => {
    x -= speed;
    if (x <= -contentWidth) {
      x = 0;
    }
    marquee.style.transform = `translate3d(${x}px, 0, 0)`;
    requestAnimationFrame(animate);
  }

  animate();


})();