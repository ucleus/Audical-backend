// ======== UTILITY FUNCTIONS ========
const $ = (q) => document.querySelector(q);
const $$ = (q) => Array.from(document.querySelectorAll(q));
const toastEl = $("#toast");

function toast(msg, duration = 3000) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  setTimeout(() => toastEl.classList.remove("show"), duration);
}

function setLoading(loading) {
  const loginBtn = $("#loginBtn");
  if (loading) {
    loginBtn.innerHTML = '<span class="loading"></span>Signing in...';
    loginBtn.disabled = true;
  } else {
    loginBtn.innerHTML = "Sign In";
    loginBtn.disabled = false;
  }
}

// ======== COPY FUNCTIONALITY ========
$$(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const text = btn.getAttribute("data-text");
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast("Copied to clipboard!");
      })
      .catch(() => {
        toast("Failed to copy");
      });
  });
});

// ======== LOGIN FUNCTIONALITY ========
$("#loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = $("#email").value.trim();
  const password = $("#password").value;
  const rememberMe = $("#rememberMe").checked;

  // Basic validation
  if (!email || !password) {
    toast("Please fill in all fields");
    return;
  }

  setLoading(true);

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Demo authentication - in real app, this would be an API call
  const validCredentials =
    email === "admin@audicalservices.com" && password === "demo123";

  if (validCredentials) {
    toast("Login successful! Redirecting...", 2000);

    // Store login state
    if (rememberMe) {
      localStorage.setItem("audical_rememberMe", "true");
      localStorage.setItem("audical_userEmail", email);
    } else {
      sessionStorage.setItem("audical_loggedIn", "true");
    }

    // Redirect to dashboard
    setTimeout(() => {
      window.location.href = "deepseek_html_20251102_230279.html";
    }, 2000);
  } else {
    toast("Invalid email or password");
    setLoading(false);
  }
});

// ======== FORGOT PASSWORD ========
$(".forgot-password").addEventListener("click", (e) => {
  e.preventDefault();
  toast("Password reset instructions sent to your email");
});

// ======== AUTO-FILL REMEMBERED EMAIL ========
document.addEventListener("DOMContentLoaded", () => {
  const rememberMe = localStorage.getItem("audical_rememberMe");
  const savedEmail = localStorage.getItem("audical_userEmail");

  if (rememberMe === "true" && savedEmail) {
    $("#email").value = savedEmail;
    $("#rememberMe").checked = true;
  }
});

// ======== ENTER KEY SUBMIT ========
$("#password").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    $("#loginForm").requestSubmit();
  }
});
