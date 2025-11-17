// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  // Animate hamburger icon
  const spans = hamburger.querySelectorAll("span");
  spans[0].style.transform = navLinks.classList.contains("active")
    ? "rotate(45deg) translate(5px, 5px)"
    : "rotate(0) translate(0, 0)";
  spans[1].style.opacity = navLinks.classList.contains("active") ? "0" : "1";
  spans[2].style.transform = navLinks.classList.contains("active")
    ? "rotate(-45deg) translate(7px, -6px)"
    : "rotate(0) translate(0, 0)";
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    const spans = hamburger.querySelectorAll("span");
    spans[0].style.transform = "rotate(0) translate(0, 0)";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "rotate(0) translate(0, 0)";
  });
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Navbar background change on scroll
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.backdropFilter = "blur(10px)";
  } else {
    navbar.style.background = "#FFFFFF";
    navbar.style.backdropFilter = "none";
  }

  lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe feature cards
document.querySelectorAll(".feature-card").forEach((card, index) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = `all 0.6s ease ${index * 0.1}s`;
  observer.observe(card);
});

// Observe stats
document.querySelectorAll(".stat").forEach((stat, index) => {
  stat.style.opacity = "0";
  stat.style.transform = "translateY(30px)";
  stat.style.transition = `all 0.6s ease ${index * 0.15}s`;
  observer.observe(stat);
});

// Counter animation for stats
const animateCounter = (element, target) => {
  let current = 0;
  const increment = target / 100;
  const duration = 2000;
  const stepTime = duration / 100;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, stepTime);
};

// Counter animation for stats
document.addEventListener("DOMContentLoaded", () => {
  const stats = document.querySelectorAll(".stat h3");
  stats.forEach((stat) => {
    const text = stat.textContent;
    if (text.includes("K")) {
      const target = parseFloat(text);
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        stat.textContent = Math.min(current, target) + "K+";
        if (current >= target) {
          clearInterval(interval);
        }
      }, 20);
    } else if (text.includes("M")) {
      const target = parseFloat(text);
      let current = 0;
      const interval = setInterval(() => {
        current += 0.1;
        stat.textContent = Math.min(current, target).toFixed(1) + "M+";
        if (current >= target) {
          clearInterval(interval);
        }
      }, 20);
    } else if (text.includes("%")) {
      const target = parseFloat(text);
      let current = 0;
      const interval = setInterval(() => {
        current += 0.1;
        stat.textContent = Math.min(current, target).toFixed(1) + "%";
        if (current >= target) {
          clearInterval(interval);
        }
      }, 2);
    }
  });
});

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero-content");
  const heroImage = document.querySelector(".hero-image");

  if (hero && scrolled < 600) {
    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    if (heroImage) {
      heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
  }
});

// Add floating animation variation to chat bubbles
const chatBubbles = document.querySelectorAll(".chat-bubble");
chatBubbles.forEach((bubble, index) => {
  setInterval(() => {
    const randomY = Math.random() * 10 - 5;
    const randomX = Math.random() * 10 - 5;
    bubble.style.transform = `translate(${randomX}px, ${randomY}px)`;
  }, 3000 + index * 1000);
});

// Prevent default behavior for demo links
document.querySelectorAll('a[href="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

console.log("ChatFlow Home Page Loaded Successfully! 🚀");
