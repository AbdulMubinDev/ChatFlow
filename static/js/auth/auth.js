// Toggle Password Visibility
const togglePasswordButtons = document.querySelectorAll(".toggle-password");

togglePasswordButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const input = this.previousElementSibling;

    if (input.type === "password") {
      input.type = "text";
      this.textContent = "🙈";
    } else {
      input.type = "password";
      this.textContent = "👁️";
    }
  });
});

// Password Strength Checker (Client-side UI only - for user feedback)
const passwordInput = document.getElementById("password");
const strengthBar = document.querySelector(".strength-fill");
const strengthText = document.getElementById("strengthText");

if (passwordInput && strengthBar) {
  passwordInput.addEventListener("input", function () {
    const password = this.value;
    const strength = calculatePasswordStrength(password);

    updatePasswordStrength(strength);
  });
}

function calculatePasswordStrength(password) {
  let strength = 0;

  if (password.length >= 8) strength += 25;
  if (password.length >= 12) strength += 25;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
  if (/\d/.test(password)) strength += 15;
  if (/[^a-zA-Z0-9]/.test(password)) strength += 10;

  return Math.min(strength, 100);
}

function updatePasswordStrength(strength) {
  strengthBar.style.width = strength + "%";

  if (strength < 40) {
    strengthBar.style.background = "#D63031";
    strengthText.textContent = "Weak";
    strengthText.style.color = "#D63031";
  } else if (strength < 70) {
    strengthBar.style.background = "#FDCB6E";
    strengthText.textContent = "Medium";
    strengthText.style.color = "#E67E22";
  } else {
    strengthBar.style.background = "#00B894";
    strengthText.textContent = "Strong";
    strengthText.style.color = "#00B894";
  }
}

// Form Validation (Client-side only - Backend handles authentication)
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// Login Form Validation
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    let isValid = true;

    const username = document.getElementById("username");
    const password = document.getElementById("password");

    // Clear previous errors
    clearErrors();

    // Basic client-side validation only
    // Backend (Django/allauth) will handle actual authentication

    // Validate username
    if (!username.value.trim()) {
      showError("usernameError", "Username is required");
      isValid = false;
    }

    // Validate password
    if (!password.value) {
      showError("passwordError", "Password is required");
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault();
    } else {
      // Show loading state while form is being submitted to backend
      showLoading(this);
      // Form will be submitted normally to Django backend
    }
  });
}

// Register Form Validation
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    let isValid = true;

    const firstName = document.getElementById("first_name");
    const lastName = document.getElementById("last_name");
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const password2 = document.getElementById("password2");

    // Clear previous errors
    clearErrors();

    // Basic client-side validation only
    // Backend (Django/allauth) will handle actual registration and validation

    // Validate first name
    if (!firstName.value.trim()) {
      showError("firstNameError", "First name is required");
      isValid = false;
    }

    // Validate last name
    if (!lastName.value.trim()) {
      showError("lastNameError", "Last name is required");
      isValid = false;
    }

    // Validate username
    if (!username.value.trim()) {
      showError("usernameError", "Username is required");
      isValid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(username.value)) {
      showError(
        "usernameError",
        "Username can only contain letters, numbers, and underscores"
      );
      isValid = false;
    } else if (username.value.length < 3) {
      showError("usernameError", "Username must be at least 3 characters");
      isValid = false;
    }

    // Validate email
    if (!email.value.trim()) {
      showError("emailError", "Email is required");
      isValid = false;
    } else if (!isValidEmail(email.value)) {
      showError("emailError", "Please enter a valid email address");
      isValid = false;
    }

    // Validate password
    if (!password.value) {
      showError("passwordError", "Password is required");
      isValid = false;
    } else if (password.value.length < 8) {
      showError("passwordError", "Password must be at least 8 characters");
      isValid = false;
    }

    // Validate password confirmation
    if (!password2.value) {
      showError("password2Error", "Please confirm your password");
      isValid = false;
    } else if (password.value !== password2.value) {
      showError("password2Error", "Passwords do not match");
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault();
    } else {
      // Show loading state while form is being submitted to backend
      showLoading(this);
      // Form will be submitted normally to Django backend (allauth or custom views)
    }
  });
}

// Helper Functions
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add("show");
  }
}

function clearErrors() {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((error) => {
    error.textContent = "";
    error.classList.remove("show");
  });
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showLoading(form) {
  const submitBtn = form.querySelector(".btn-submit");
  if (submitBtn) {
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;
  }
}

// Real-time Username Validation (Client-side feedback only)
const usernameInput = document.getElementById("username");
if (usernameInput && registerForm) {
  let typingTimer;
  const doneTypingInterval = 500;

  usernameInput.addEventListener("input", function () {
    clearTimeout(typingTimer);
    const usernameError = document.getElementById("usernameError");

    if (this.value.length > 0) {
      typingTimer = setTimeout(() => {
        // Basic format validation only
        // Backend will check for uniqueness and other validations
        if (!/^[a-zA-Z0-9_]+$/.test(this.value)) {
          showError(
            "usernameError",
            "Only letters, numbers, and underscores allowed"
          );
        } else if (this.value.length < 3) {
          showError("usernameError", "Username must be at least 3 characters");
        } else {
          usernameError.textContent = "";
          usernameError.classList.remove("show");
        }
      }, doneTypingInterval);
    }
  });
}

// Real-time Email Validation (Format check only)
const emailInput = document.getElementById("email");
if (emailInput && registerForm) {
  let typingTimer;
  const doneTypingInterval = 500;

  emailInput.addEventListener("input", function () {
    clearTimeout(typingTimer);
    const emailError = document.getElementById("emailError");

    if (this.value.length > 0) {
      typingTimer = setTimeout(() => {
        // Basic format validation only
        // Backend will verify email existence and uniqueness
        if (!isValidEmail(this.value)) {
          showError("emailError", "Please enter a valid email address");
        } else {
          emailError.textContent = "";
          emailError.classList.remove("show");
        }
      }, doneTypingInterval);
    }
  });
}

// Real-time Password Match Validation
const password2Input = document.getElementById("password2");
if (password2Input && registerForm) {
  password2Input.addEventListener("input", function () {
    const password = document.getElementById("password").value;
    const password2Error = document.getElementById("password2Error");

    if (this.value.length > 0) {
      if (this.value !== password) {
        showError("password2Error", "Passwords do not match");
      } else {
        password2Error.textContent = "";
        password2Error.classList.remove("show");
      }
    }
  });
}

// Social Login Buttons
// These will be handled by django-allauth or custom OAuth implementation
// If using allauth, these buttons should redirect to allauth social login URLs
const socialButtons = document.querySelectorAll(".social-btn");
socialButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    // Prevent default action
    e.preventDefault();

    // Show loading state
    const originalText = this.innerHTML;
    this.innerHTML = '<span class="btn-loader"></span> Connecting...';
    this.disabled = true;

    // In production, these should be actual allauth URLs like:
    // window.location.href = '/accounts/google/login/' (for Google)
    // window.location.href = '/accounts/github/login/' (for GitHub)

    const provider = this.classList.contains("google-btn")
      ? "google"
      : "github";
    console.log(
      `Redirecting to ${provider} OAuth... (Configure allauth URLs in production)`
    );

    // For demo purposes, restore button after 2 seconds
    setTimeout(() => {
      this.innerHTML = originalText;
      this.disabled = false;
      alert(
        `Social login with ${provider} is not yet configured.\nIn production, this will redirect to django-allauth OAuth endpoint.`
      );
    }, 2000);
  });
});

// Auto-dismiss alerts after 5 seconds
const alerts = document.querySelectorAll(".alert");
if (alerts.length > 0) {
  alerts.forEach((alert) => {
    setTimeout(() => {
      alert.style.animation = "slideUp 0.3s ease reverse";
      setTimeout(() => {
        alert.remove();
      }, 300);
    }, 5000);
  });
}

// Add floating animation to bubbles
const bubbles = document.querySelectorAll(".floating-bubble");
bubbles.forEach((bubble, index) => {
  setInterval(() => {
    const randomX = Math.random() * 20 - 10;
    const randomY = Math.random() * 20 - 10;
    bubble.style.transform = `translate(${randomX}px, ${randomY}px)`;
  }, 2000 + index * 1000);
});

// Input Focus Effects
const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.style.transform = "scale(1.02)";
  });

  input.addEventListener("blur", function () {
    this.parentElement.style.transform = "scale(1)";
  });
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}

console.log("ChatFlow Authentication Module Loaded! 🔐");
console.log(
  "Note: User authentication is handled by Django backend (allauth or custom views)"
);
console.log(
  "This script provides client-side validation and UI enhancements only"
);
