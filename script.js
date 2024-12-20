const openMenuBtn = document.querySelector(".nav__left-navIcon");
const btnSliderPrev = document.getElementById("prev-btn");
const btnSliderNext = document.getElementById("next-btn");

const btnMinus = document.querySelector(".quantity__btn--minus");
const btnPlus = document.querySelector(".quantity__btn--plus");
const input = document.getElementById("quantity__num");

const cartIcon = document.querySelector(".icon-cart");
const cart = document.querySelector(".cart");
const quantityInCart = document.querySelector(".quantity-in-cart");

const btnAddToCart = document.getElementById("btn-add");

let itemsQuantity = 0;

function openNav() {
	const menu = document.querySelector(".menu__list");
	const closeBtn = document.createElement("button");
	const closeBtnIcon = document.createElement("img");
	closeBtnIcon.src = "images/icon-close.svg";
	closeBtn.appendChild(closeBtnIcon);
	closeBtn.classList.add("menu__list__close");
	menu.insertBefore(closeBtn, menu.childNodes[0]);
	document.querySelector(".overlay").style.display = "block";
	menu.style.display = "flex";
	menu.style.width = "68.26%";
	document.body.style.overflowY = "hidden";
	closeBtn.addEventListener("click", closeNav);
}

function closeNav() {
	const menu = document.querySelector(".menu__list");
	const closeBtn = document.querySelector(".menu__list__close");
	console.log(closeBtn);
	closeBtn.remove();
	document.querySelector(".overlay").style.display = "none";
	menu.style.display = "none";
	menu.style.width = "0";
	document.body.style.overflowY = "scroll";
}

function sliderHandler(e, direction) {
	const productImages = document.querySelectorAll(".list-item");
	const currentActiveIndex = Array.from(productImages).findIndex((item) =>
		item.classList.contains("current")
	);
	let newActiveIndex =
		direction === "next" ? currentActiveIndex + 1 : currentActiveIndex - 1;
	if (newActiveIndex >= productImages.length) newActiveIndex = 0;
	else if (newActiveIndex < 0) newActiveIndex = productImages.length - 1;
	productImages[newActiveIndex].classList.add("current");
	productImages[currentActiveIndex].classList.remove("current");
}

function quantityHandler(e, action) {
	e.preventDefault();
	let num = action === "plus" ? +input.value + 1 : +input.value - 1;
	if (num < 0) num = 0;
	input.value = num;
}

function openCart() {
	const cartEmpty = cart.querySelector(".cart__empty");
	const cartFull = cart.querySelector(".cart__full");
	cart.style.display = "block";
	if (itemsQuantity === 0) {
		cartEmpty.style.display = "flex";
		cartFull.style.display = "none";
	} else {
		cartEmpty.style.display = "none";
		cartFull.style.display = "grid";
	}
}

function closeCart() {
	cart.style.display = "none";
}

function updateQuantityInCart() {
	if (itemsQuantity === 0) {
		quantityInCart.style.display = "none";
	} else {
		quantityInCart.textContent = input.value;
		quantityInCart.style.display = "flex";
	}
}

function updateCart() {
	const cartProdName = cart.querySelector(".cart__full__prod-name");
	const cartItemPrice = cart.querySelector(".cart__full__prod-price");
	const cartQuantity = cart.querySelector(".cart__full__prod-quantity");
	const cartTotalPrice = cart.querySelector(".cart__full__prod-total");
	const cartProdImg = cart.querySelector(".cart__full__prod-img");

	const prodName = document.querySelector(".product-name");
	const itemPrice = document.querySelector(".price__current__after-discount");
	const currentImg = document.querySelector(".current img");
	const imgNum = currentImg.src
		.charAt(currentImg.src.lastIndexOf(".") - 1)
		.replace(/[^0-9]/g, "");

	const img = document.createElement("img");
	img.src = `images/image-product-${imgNum}-thumbnail.jpg`;

	cartProdImg.appendChild(img);

	cartProdName.textContent = prodName.textContent;
	cartItemPrice.textContent = `${itemPrice.textContent}`;
	cartQuantity.textContent = itemsQuantity;
	cartTotalPrice.textContent = `$${(
		itemsQuantity * Number(itemPrice.textContent.replace("$", ""))
	).toFixed(2)}`;
}

function addToCartHandler() {
	itemsQuantity = Number(input.value);
	updateQuantityInCart();
	updateCart();
}

openMenuBtn.addEventListener("click", openNav);
btnSliderNext.addEventListener("click", (e) => sliderHandler(e, "next"));
btnSliderPrev.addEventListener("click", (e) => sliderHandler(e, "prev"));

btnMinus.addEventListener("click", (e) => quantityHandler(e, "minus"));
btnPlus.addEventListener("click", (e) => quantityHandler(e, "plus"));

cartIcon.addEventListener("mouseover", openCart);
cartIcon.addEventListener("click", openCart);
cart.addEventListener("mouseleave", closeCart);

btnAddToCart.addEventListener("click", addToCartHandler);

window.onload = function () {
	updateQuantityInCart();
	updateCart();
};
