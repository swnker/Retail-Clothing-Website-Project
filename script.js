const cartIcon = document.querySelector("#carticon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));


<!--search-->
const searchIcon = document.querySelector("#searchicon");
const search = document.querySelector(".search");
const searchClose = document.querySelector("#search-close");

searchIcon.addEventListener("click", () => search.classList.add("active"));
searchClose.addEventListener("click", () => search.classList.remove("active"));

document.querySelector("#search-item").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevents default behavior
    document.querySelector("#search-item").blur(); // Keeps input focused
  }
});

<!--search-->


const addCartButtons = document.querySelectorAll(".add-cart");
addCartButtons.forEach(button => {
  button.addEventListener("click", event => {
    const productBox = event.target.closest(".singleproduct");
    addToCart(productBox);
  });
});

const cartContent = document.querySelector(".cart-content");

const addToCart = productBox => {
  const productImgSrc = productBox.querySelector("img").src;
  const productTitle = productBox.querySelector("h2").textContent;
  const productPrice = productBox.querySelector("h4").textContent;

  const cartBox = document.createElement("div");
  cartBox.classList.add("cart-box");
  cartBox.innerHTML = `
    <img src="${productImgSrc}" class="cart-img">
    <div class="cart-detail">
      <h2 class="cart-product-title">${productTitle}</h2>
      <span class="cart-price">${productPrice}</span>
      <div class="cart-quantity">
        <button id="decrement">-</button>
        <span class="number">1</span>
        <button id="increment">+</button>
      </div>
    </div>
    <i class="ri-delete-bin-line cart-remove"></i>
  `;

  cartContent.appendChild(cartBox);

  cartBox.querySelector(".cart-remove").addEventListener("click", () => {
    cartBox.remove();
    updateCartCount(-1);
    updateTotalPrice();
  });

  cartBox.querySelector("#decrement").addEventListener("click", () => changeQuantity(cartBox, -1));
  cartBox.querySelector("#increment").addEventListener("click", () => changeQuantity(cartBox, 1));

  updateCartCount(1);
  updateTotalPrice();
};

let cartItemCount = parseInt(localStorage.getItem("cartItemCount")) || 0;

const saveCartData = () => {
  const cartContent = document.querySelector(".cart-content").innerHTML;
  localStorage.setItem("cartContent", cartContent);
  localStorage.setItem("cartItemCount", cartItemCount);
};

const updateTotalPrice = () => {
  const totalPriceElement = document.querySelector(".totals-price");
  const cartBoxes = document.querySelectorAll(".cart-box");
  let total = 0;

  cartBoxes.forEach(cartBox => {
    const priceElement = cartBox.querySelector(".cart-price");
    const quantityElement = cartBox.querySelector(".number");

    const price = parseFloat(priceElement.textContent.replace(/[^0-9.]/g, "")) || 0;
    const quantity = parseInt(quantityElement.textContent) || 0;

    total += price * quantity;
  });

  totalPriceElement.textContent = `RM${total.toFixed(2)}`;
  saveCartData();
};

const updateCartCount = (change) => {
  const cartItemCountBadge = document.querySelector(".cart-item-count");

  cartItemCount += change;
  cartItemCount = Math.max(0, cartItemCount);

  if (cartItemCount > 0) {
    cartItemCountBadge.style.display = "inline-block";
    cartItemCountBadge.textContent = cartItemCount;
  } else {
    cartItemCountBadge.style.display = "none";
    cartItemCountBadge.textContent = "";
  }

  localStorage.setItem("cartItemCount", cartItemCount);
};

const loadCartData = () => {
  const cartContent = localStorage.getItem("cartContent");
  if (cartContent) {
    document.querySelector(".cart-content").innerHTML = cartContent;
  }

  updateTotalPrice();
  updateCartCount(0);

  attachEventListeners();
};

const attachEventListeners = () => {
  document.querySelectorAll("#increment").forEach(button => {
    button.addEventListener("click", (event) => {
      const cartBox = event.target.closest(".cart-box");
      changeQuantity(cartBox, 1);
    });
  });

  document.querySelectorAll("#decrement").forEach(button => {
    button.addEventListener("click", (event) => {
      const cartBox = event.target.closest(".cart-box");
      changeQuantity(cartBox, -1);
    });
  });

  document.querySelectorAll(".cart-remove").forEach(button => {
    button.addEventListener("click", (event) => {
      const cartBox = event.target.closest(".cart-box");
      if (cartBox) {
        cartBox.remove();
        updateTotalPrice();
        updateCartCount(-1);
        saveCartData();
      }
    });
  });
};

const changeQuantity = (cartBox, change) => {
  const numberElement = cartBox.querySelector(".number");
  let quantity = parseInt(numberElement.textContent);

  if (change === -1 && quantity > 1) {
    quantity--;
  } else if (change === 1) {
    quantity++;
  }

  numberElement.textContent = quantity;
  updateTotalPrice();
};

document.addEventListener("DOMContentLoaded", loadCartData);
