// ======== THEME TOGGLE ========
const THEME_KEY = "audical_theme";
function applyTheme(t) {
  document.documentElement.setAttribute("data-theme", t);
  const btn = document.getElementById("themeToggle");
  if (btn) {
    btn.setAttribute(
      "aria-label",
      t === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
    btn.setAttribute("aria-pressed", t === "dark" ? "false" : "true");
  }
}
(function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const start = saved || (prefersDark ? "dark" : "light");
  applyTheme(start);
  window.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("themeToggle");
    if (btn) {
      btn.addEventListener("click", () => {
        const current =
          document.documentElement.getAttribute("data-theme") || "dark";
        const next = current === "dark" ? "light" : "dark";
        applyTheme(next);
        localStorage.setItem(THEME_KEY, next);
      });
    }
  });
})();

// ======== PRODUCT DATA ========
const PRODUCTS = [
  {
    id: 1,
    name: "Precision Audiometer X200",
    cat: "audiometers",
    price: 3495,
    desc:
      "Clinical-grade two-channel audiometer with calibrated outputs and intuitive UI.",
    tags: ["2‑channel", "Clinical", "Calibrated"],
    inStock: true
  },
  {
    id: 2,
    name: "Tympanometer Pro T50",
    cat: "tympanometers",
    price: 4290,
    desc: "Fast, accurate middle-ear measurements with automated sequences.",
    tags: ["Auto‑sequence", "Printer Ready"],
    inStock: true
  },
  {
    id: 3,
    name: "Compact Sound Booth S1",
    cat: "booths",
    price: 9800,
    desc:
      "Low‑noise booth for clinics with small footprint and modular panels.",
    tags: ["Modular", "Low‑noise"],
    inStock: false
  },
  {
    id: 4,
    name: "Audiology Accessory Kit A+",
    cat: "accessories",
    price: 240,
    desc: "Cables, tips, and calibration adapters for common clinical setups.",
    tags: ["Adapters", "Tips"],
    inStock: true
  },
  {
    id: 5,
    name: "Diagnostic Audiometer X350",
    cat: "audiometers",
    price: 6290,
    desc: "Expanded frequency range and integrated patient response controls.",
    tags: ["Diagnostic", "Wide Range"],
    inStock: true
  },
  {
    id: 6,
    name: "Double-Wall Booth S2",
    cat: "booths",
    price: 14900,
    desc: "Premium isolation for high-accuracy testing in busy clinics.",
    tags: ["Double‑wall", "Pro Install"],
    inStock: true
  }
];

// ======== HELPERS ========
const $ = (q) => document.querySelector(q);
const $$ = (q) => Array.from(document.querySelectorAll(q));
const money = (n) => `$${n.toLocaleString()}`;
const toastEl = $("#toast");
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  setTimeout(() => toastEl.classList.remove("show"), 2200);
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
function contactSales() {
  toast("Redirecting to contact form...");
  closeModal("productOverlay");
}

// ======== NAV ========
$("#startShopping").addEventListener("click", () => scrollToId("shop"));

// ======== FILTERS ========
const chipRow = $("#chipRow");
let activeCat = "all";
chipRow.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  activeCat = chip.dataset.cat;
  $$(".chip").forEach((c) => c.classList.toggle("active", c === chip));
  renderProducts();
});

$("#searchInput").addEventListener("input", renderProducts);

// ======== RENDER PRODUCTS ========
const grid = $("#productGrid");
function renderProducts() {
  const q = $("#searchInput").value.trim().toLowerCase();
  grid.innerHTML = "";
  const filtered = PRODUCTS.filter(
    (p) =>
      (activeCat === "all" || p.cat === activeCat) &&
      (!q || (p.name + " " + p.desc).toLowerCase().includes(q))
  );
  if (!filtered.length) {
    grid.innerHTML = `<p class="muted">No products match your filters.</p>`;
    return;
  }
  filtered.forEach((p) => {
    const card = document.createElement("article");
    card.className = "p-card";
    card.innerHTML = `
          <div class="p-media" aria-hidden="true">${iconDevice()}</div>
          <div class="p-body">
            <div class="p-title">${p.name}</div>
            <div class="p-desc">${p.desc}</div>
            <div class="p-meta">
              <div>
                <div class="price">${money(p.price)}</div>
                <div class="lease">Contact for quote</div>
              </div>
              <div><span class="pill" title="Inventory">${
                p.inStock ? "In stock" : "Backorder"
              }</span></div>
            </div>
            <div class="p-actions">
              <button class="btn primary" data-act="view" data-id="${
                p.id
              }">View Details</button>
            </div>
          </div>`;
    grid.appendChild(card);
  });
}

grid.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const id = +btn.dataset.id;
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return;
  if (btn.dataset.act === "view") {
    openProduct(p);
  }
});

function iconDevice() {
  return `<svg width="120" height="120" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="40" width="160" height="100" rx="12" stroke="url(#g1)" stroke-width="3" fill="rgba(255,255,255,.03)"/>
        <circle cx="60" cy="90" r="18" stroke="#89e3d9" stroke-width="3"/>
        <path d="M90 75h45M90 90h60M90 105h40" stroke="#9dd2ff" stroke-width="4" stroke-linecap="round"/>
        <defs>
          <linearGradient id="g1" x1="20" y1="40" x2="180" y2="140" gradientUnits="userSpaceOnUse">
            <stop stop-color="#59d0c0"/>
            <stop offset="1" stop-color="#28a6c3"/>
          </linearGradient>
        </defs>
      </svg>`;
}

// ======== PRODUCT MODAL ========
function openProduct(p) {
  $("#productTitle").textContent = p.name;
  $("#productDesc").textContent = p.desc;
  $("#productPrice").textContent = `Starting from ${money(p.price)}`;
  $("#productMedia").innerHTML = iconDevice();
  const tags = p.tags.map((t) => `<span class="pill">${t}</span>`).join("");
  $("#productTags").innerHTML = tags;
  openModal("productOverlay");
}

function openModal(id) {
  document.getElementById(id).classList.add("show");
}
function closeModal(id) {
  document.getElementById(id).classList.remove("show");
}

// ======== INIT ========
renderProducts();
document.getElementById("year").textContent = new Date().getFullYear();
