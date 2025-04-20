// Shopping Cart
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");
cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

const addCartButtons = document.querySelectorAll(".add-cart");
addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const productBox = event.target.closest(".product-box");
        addToCart(productBox)
    });
});

const cartContent = document.querySelector(".cart-content");
const addToCart = productBox => {
    const productImgSrc = productBox.querySelector("img").src
    const productTitle = productBox.querySelector(".product-title").textContent
    const productPrice = productBox.querySelector(".price").textContent

    const cartItems = cartContent.querySelectorAll(".cart-product-title");
    for (let item of cartItems) {
        if (item.textContent === productTitle) {
            alert("已經放進購物車了！");
            return;
        }
    }

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
        <i class="fa-solid fa-trash-can cart-remove"></i>
    `;

    cartContent.appendChild(cartBox);

    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();

        updateCartCount(-1);

        updateTotalPrice();

    });

    cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector("#decrement");
        let quantity = numberElement.textContent;

        if (event.target.id === "decrement" && quantity > 1){
            quantity--;
            if (quantity === 1){
                decrementButton.style.color = "#999";
            }
        } else if (event.target.id === "increment") {
            quantity++;
            decrementButton.style.color = "#333";
        }

        numberElement.textContent = quantity;
        updateTotalPrice();
    });
    
    updateCartCount(1);

    updateTotalPrice();
};

const updateTotalPrice = () => {
    const totalPriceElement = document.querySelector(".total-price");
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    let total = 0;
    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cart-price");
        const quantityElement = cartBox.querySelector(".number");
        
        // const price = priceElement.textContent.replace("$", "");
        // const quantity = quantityElement.textContent;
        const price = parseFloat(priceElement.textContent.replace("$", ""));
        const quantity = parseInt(quantityElement.textContent);
        
        total += price * quantity;
    });
    totalPriceElement.textContent = `$${total}`;
};

let cartItemsCount = 0;
const updateCartCount = change => {
    const cartItemsCountBadge = document.querySelector(".cart-item-count");
    cartItemsCount += change;
    if (cartItemsCount > 0){
        cartItemsCountBadge.style.visibility = "visible";
        cartItemsCountBadge.textContent = cartItemsCount;
    } else {
        cartItemsCountBadge.style.visibility = "hidden";
        cartItemsCountBadge.textContent = "";
    }
};

const buyNowButton = document.querySelector(".btn-buy");
buyNowButton.addEventListener("click", () => {
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    if (cartBoxes.length === 0){
        alert("您的購物車是空的。購買前請將商品加入您的購物車。");
        return;
    }

    cartBoxes.forEach(cartBox => cartBox.remove());

    cartItemsCount = 0;
    updateCartCount(0);

    updateTotalPrice();

    alert("謝謝購買！我們會盡快寄送！");
});