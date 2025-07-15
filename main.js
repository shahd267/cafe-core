document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  }, {
    threshold: 0.2
  });

  elements.forEach(el => observer.observe(el));
});



// ========== 1. تأكيد الحجز ==========
document.addEventListener("DOMContentLoaded", () => {
  const reservationForm = document.querySelector(".reservation-form");
  if (reservationForm) {
    reservationForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("✅ Your table has been successfully reserved!");
      reservationForm.reset();
    });
  }

  // ========== 2. رسالة بعد تسجيل الدخول ==========
  const loginForm = document.querySelector(".login-container form");
  if (loginForm && document.body.classList.contains("login-page")) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("👋 Welcome back to CaféCore!");
      loginForm.reset();
    });
  }

  // ========== 3. إضافة للسلة ==========
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const itemName = btn.getAttribute("data-name") || "Product";
      alert(`🛒 ${itemName} added to your cart!`);
      // ممكن نضيفه لـ localStorage كمان لو حبيتي بعدين
    });
  });
});



// ========== إضافة للسلة ==========

function saveToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
}

const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const name = btn.getAttribute("data-name");
    const price = parseFloat(btn.getAttribute("data-price"));
    const image = btn.getAttribute("data-image");

    const product = { name, price, image, quantity: 1 };
    saveToCart(product);
    alert(`🛒 ${name} added to your cart!`);
  });
});


// ========== عرض محتويات السلة ==========
function renderCart() {
  const cartTable = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  if (!cartTable || !cartTotal) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartTable.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const row = document.createElement("tr");
    const itemTotal = (item.price * item.quantity).toFixed(2);
    total += parseFloat(itemTotal);

    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>${item.quantity}</td>
      <td>$${itemTotal}</td>
      <td><button onclick="removeFromCart(${index})">❌</button></td>
    `;
    cartTable.appendChild(row);
  });

  cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});



function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("show");
}

