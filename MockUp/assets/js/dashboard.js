// ======== DATA MANAGEMENT ========
let products = JSON.parse(localStorage.getItem("audical_products")) || [
  {
    id: 1,
    name: "Precision Audiometer X200",
    cat: "audiometers",
    price: 3495,
    stock: 8,
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
    stock: 12,
    desc: "Fast, accurate middle-ear measurements with automated sequences.",
    tags: ["Auto‑sequence", "Printer Ready"],
    inStock: true
  },
  {
    id: 3,
    name: "Compact Sound Booth S1",
    cat: "booths",
    price: 9800,
    stock: 3,
    desc:
      "Low‑noise booth for clinics with small footprint and modular panels.",
    tags: ["Modular", "Low‑noise"],
    inStock: true
  },
  {
    id: 4,
    name: "Audiology Accessory Kit A+",
    cat: "accessories",
    price: 240,
    stock: 0,
    desc: "Cables, tips, and calibration adapters for common clinical setups.",
    tags: ["Adapters", "Tips"],
    inStock: false
  },
  {
    id: 5,
    name: "Diagnostic Audiometer X350",
    cat: "audiometers",
    price: 6290,
    stock: 5,
    desc: "Expanded frequency range and integrated patient response controls.",
    tags: ["Diagnostic", "Wide Range"],
    inStock: true
  },
  {
    id: 6,
    name: "Double-Wall Booth S2",
    cat: "booths",
    price: 14900,
    stock: 2,
    desc: "Premium isolation for high-accuracy testing in busy clinics.",
    tags: ["Double‑wall", "Pro Install"],
    inStock: true
  }
];

let orders = JSON.parse(localStorage.getItem("audical_orders")) || [
  {
    id: "ORD-7842",
    customer: "John Smith",
    email: "john@example.com",
    date: "2024-01-15",
    amount: 3495,
    status: "completed",
    items: [1]
  },
  {
    id: "ORD-7841",
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    date: "2024-01-14",
    amount: 9800,
    status: "processing",
    items: [3]
  },
  {
    id: "ORD-7840",
    customer: "Robert Chen",
    email: "robert@example.com",
    date: "2024-01-13",
    amount: 4290,
    status: "completed",
    items: [2]
  }
];

let customers = JSON.parse(localStorage.getItem("audical_customers")) || [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    orders: 3,
    total: 12485
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 (555) 234-5678",
    orders: 1,
    total: 9800
  },
  {
    id: 3,
    name: "Robert Chen",
    email: "robert@example.com",
    phone: "+1 (555) 345-6789",
    orders: 2,
    total: 8580
  }
];

// ======== UTILITY FUNCTIONS ========
const $ = (q) => document.querySelector(q);
const $$ = (q) => Array.from(document.querySelectorAll(q));
const money = (n) => `$${n.toLocaleString()}`;
const toastEl = $("#toast");
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  setTimeout(() => toastEl.classList.remove("show"), 2200);
}
function openModal(id) {
  document.getElementById(id).classList.add("show");
}
function closeModal(id) {
  document.getElementById(id).classList.remove("show");
}

// ======== PAGE NAVIGATION ========
function showPage(pageId) {
  $$(".page").forEach((page) => page.classList.remove("active"));
  $$(".sidebar-nav a").forEach((link) => link.classList.remove("active"));

  $(`#${pageId}-page`).classList.add("active");
  $(`[data-page="${pageId}"]`).classList.add("active");
}

$$(".sidebar-nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = link.getAttribute("data-page");
    showPage(page);
  });
});

// ======== PRODUCT MANAGEMENT ========
function renderProductsTable() {
  const tbody = $("#productsTableBody");
  tbody.innerHTML = products
    .map(
      (product) => `
        <tr>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.cat}</td>
          <td>${money(product.price)}</td>
          <td>${product.stock}</td>
          <td>${
            product.inStock
              ? '<span class="pill success">In Stock</span>'
              : '<span class="pill danger">Out of Stock</span>'
          }</td>
          <td>
            <button class="btn ghost" onclick="editProduct(${
              product.id
            })">Edit</button>
            <button class="btn danger" onclick="deleteProduct(${
              product.id
            })">Delete</button>
          </td>
        </tr>
      `
    )
    .join("");
}

function saveProducts() {
  localStorage.setItem("audical_products", JSON.stringify(products));
}

function addProduct() {
  const product = {
    id: Math.max(...products.map((p) => p.id)) + 1,
    name: $("#productName").value,
    cat: $("#productCategory").value,
    price: parseFloat($("#productPrice").value),
    stock: parseInt($("#productStock").value),
    desc: $("#productDescription").value,
    tags: $("#productTags")
      .value.split(",")
      .map((tag) => tag.trim()),
    inStock: parseInt($("#productStock").value) > 0
  };

  products.push(product);
  saveProducts();
  renderProductsTable();
  closeModal("productModal");
  toast("Product added successfully");
}

function editProduct(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  $("#productModalTitle").textContent = "Edit Product";
  $("#productName").value = product.name;
  $("#productCategory").value = product.cat;
  $("#productPrice").value = product.price;
  $("#productStock").value = product.stock;
  $("#productDescription").value = product.desc;
  $("#productTags").value = product.tags.join(", ");

  // Change save button to update
  $("#saveProductBtn").textContent = "Update Product";
  $("#saveProductBtn").onclick = () => updateProduct(id);

  openModal("productModal");
}

function updateProduct(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  product.name = $("#productName").value;
  product.cat = $("#productCategory").value;
  product.price = parseFloat($("#productPrice").value);
  product.stock = parseInt($("#productStock").value);
  product.desc = $("#productDescription").value;
  product.tags = $("#productTags")
    .value.split(",")
    .map((tag) => tag.trim());
  product.inStock = parseInt($("#productStock").value) > 0;

  saveProducts();
  renderProductsTable();
  closeModal("productModal");
  toast("Product updated successfully");
}

function deleteProduct(id) {
  if (confirm("Are you sure you want to delete this product?")) {
    products = products.filter((p) => p.id !== id);
    saveProducts();
    renderProductsTable();
    toast("Product deleted successfully");
  }
}

// ======== ORDER MANAGEMENT ========
function renderOrdersTable() {
  const tbody = $("#ordersTableBody");
  const filter = $("#orderFilter").value;

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  tbody.innerHTML = filteredOrders
    .map(
      (order) => `
        <tr>
          <td>${order.id}</td>
          <td>${order.customer}</td>
          <td>${order.date}</td>
          <td>${money(order.amount)}</td>
          <td>
            ${
              order.status === "completed"
                ? '<span class="pill success">Completed</span>'
                : order.status === "processing"
                ? '<span class="pill warning">Processing</span>'
                : order.status === "pending"
                ? '<span class="pill warning">Pending</span>'
                : '<span class="pill danger">Cancelled</span>'
            }
          </td>
          <td>
            <button class="btn ghost" onclick="viewOrder('${
              order.id
            }')">View</button>
            <button class="btn primary" onclick="updateOrderStatus('${
              order.id
            }', 'completed')">Complete</button>
          </td>
        </tr>
      `
    )
    .join("");
}

function viewOrder(id) {
  const order = orders.find((o) => o.id === id);
  if (order) {
    alert(
      `Order Details:\nID: ${order.id}\nCustomer: ${
        order.customer
      }\nAmount: ${money(order.amount)}\nStatus: ${order.status}`
    );
  }
}

function updateOrderStatus(id, status) {
  const order = orders.find((o) => o.id === id);
  if (order) {
    order.status = status;
    localStorage.setItem("audical_orders", JSON.stringify(orders));
    renderOrdersTable();
    toast(`Order ${id} marked as ${status}`);
  }
}

// ======== CUSTOMER MANAGEMENT ========
function renderCustomersTable() {
  const tbody = $("#customersTableBody");
  tbody.innerHTML = customers
    .map(
      (customer) => `
        <tr>
          <td>${customer.id}</td>
          <td>${customer.name}</td>
          <td>${customer.email}</td>
          <td>${customer.phone}</td>
          <td>${customer.orders}</td>
          <td>${money(customer.total)}</td>
          <td>
            <button class="btn ghost" onclick="viewCustomer(${
              customer.id
            })">View</button>
            <button class="btn primary" onclick="contactCustomer(${
              customer.id
            })">Contact</button>
          </td>
        </tr>
      `
    )
    .join("");
}

function viewCustomer(id) {
  const customer = customers.find((c) => c.id === id);
  if (customer) {
    alert(
      `Customer Details:\nName: ${customer.name}\nEmail: ${
        customer.email
      }\nPhone: ${customer.phone}\nTotal Orders: ${
        customer.orders
      }\nTotal Spent: ${money(customer.total)}`
    );
  }
}

function contactCustomer(id) {
  const customer = customers.find((c) => c.id === id);
  if (customer) {
    window.location.href = `mailto:${customer.email}`;
  }
}

// ======== EVENT LISTENERS ========
$("#addProductBtn").addEventListener("click", () => {
  $("#productModalTitle").textContent = "Add New Product";
  $("#productName").value = "";
  $("#productCategory").value = "audiometers";
  $("#productPrice").value = "";
  $("#productStock").value = "";
  $("#productDescription").value = "";
  $("#productTags").value = "";

  $("#saveProductBtn").textContent = "Save Product";
  $("#saveProductBtn").onclick = addProduct;

  openModal("productModal");
});

$("#orderFilter").addEventListener("change", renderOrdersTable);
$("#refreshData").addEventListener("click", () => {
  renderProductsTable();
  renderOrdersTable();
  renderCustomersTable();
  toast("Data refreshed");
});

$("#logoutBtn").addEventListener("click", () => {
  if (confirm("Are you sure you want to logout?")) {
    window.location.href = "catalog.html";
  }
});

// ======== INITIALIZATION ========
document.addEventListener("DOMContentLoaded", () => {
  renderProductsTable();
  renderOrdersTable();
  renderCustomersTable();
});

// ======== SIDEBAR TOGGLE ========
$("#sidebarToggle").addEventListener('click', () => {
  const sidebar = $('.sidebar');
  const dashboard = $('.dashboard');
  const toggleBtn = $("#sidebarToggle");
  
  sidebar.classList.toggle('collapsed');
  dashboard.classList.toggle('sidebar-collapsed');
  
  // Update toggle button arrow direction
  if (sidebar.classList.contains('collapsed')) {
    toggleBtn.innerHTML = '→';
  } else {
    toggleBtn.innerHTML = '←';
  }
});