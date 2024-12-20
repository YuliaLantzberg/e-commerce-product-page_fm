const openMenuBtn = document.querySelector(".nav__left-navIcon");
const btnSliderPrev = document.getElementById("prev-btn");
const btnSliderNext = document.getElementById("next-btn");

const btnMinus = document.querySelector(".quantity__btn--minus");
const btnPlus = document.querySelector(".quantity__btn--plus");
const input = document.getElementById("quantity__num");

const cartIcon = document.querySelector(".icon-cart");
const cart = document.querySelector(".cart");
const cartMain = cart.querySelector(".cart__main");
const quantityInCart = document.querySelector(".quantity-in-cart");

const btnAddToCart = document.getElementById("btn-add");

const btnDeleteItem = document.getElementById("btn-delete");

let thumbnails = [];
let data = null;
let itemsQuantity = 0;
let currentImage = null;
let priceAfterDiscount = 0;

async function fetchData() {
	try {
		const response = await fetch("data.json");
		const resData = await response.json();
		return resData.shoes[0];
	} catch (err) {
		console.log("couldn't load data", err);
	}
}
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

	closeBtn.remove();
	document.querySelector(".overlay").style.display = "none";
	menu.style.display = "none";
	menu.style.width = "0";
	document.body.style.overflowY = "scroll";
}

function loadSliderImgs() {
	const slider = document.getElementById("product-img-list");
	slider.innerHTML = data.images
		.map(
			(img) => `<li class="list-item">
							<img
								id="product-img"
								class="product-img"
								src=${img}
							/>
						</li>`
		)
		.join("");
	const firstImg = slider.querySelector(".list-item");
	firstImg.classList.add("current");
}

function loadProdImgs() {
	const imgsContainer = document.querySelector(".prod-images");
	const activeImgEl = imgsContainer.querySelector(".prod-images__active");
	const imgsList = imgsContainer.querySelector(".prod-images__thumnails");

	const thumbnailsClass = "prod-images__thumnails-img";

	const activeImg = document.createElement("img");
	activeImg.src = data.images[0];
	activeImg.alt = "";
	activeImgEl.appendChild(activeImg);

	imgsList.innerHTML = data.images_thumbnail
		.map(
			(img) => `<li class="${thumbnailsClass}">
						<img src=${img} alt="" />
					</li>`
		)
		.join("");
	const firstImg = imgsList.querySelector(`.${thumbnailsClass}`);
	firstImg.classList.add("active");
	thumbnails = imgsList.querySelectorAll(`.${thumbnailsClass}`);
	thumbnails.forEach((img) => {
		img.addEventListener("click", handleProductImages);
	});
}

function loadProductPage() {
	const container = document.querySelector(".main-content");
	const prodName = container.querySelector(".product-name");
	const description = container.querySelector(".description");
	const itemPrice = container.querySelector(".price__current__after-discount");
	const discount = container.querySelector(".price__current__discount");
	const price = container.querySelector(".price__before-discount");

	prodName.textContent = data.title;
	description.textContent = data.description;
	discount.textContent = `${data.discount}%`;
	itemPrice.textContent = `$${priceAfterDiscount}`;
	price.textContent = `$${data.price}`;
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
		quantityInCart.textContent = itemsQuantity;
		quantityInCart.style.display = "flex";
	}
}

function updateCart() {
	const cartProdName = cart.querySelector(".cart__full__prod-name");
	const cartItemPrice = cart.querySelector(".cart__full__prod-price");
	const cartQuantity = cart.querySelector(".cart__full__prod-quantity");
	const cartTotalPrice = cart.querySelector(".cart__full__prod-total");
	const cartProdImg = cart.querySelector(".cart__full__prod-img");
	const imgNum = getImgNum(currentImage, false);
	const src = `images/image-product-${imgNum}-thumbnail.jpg`;
	cartProdImg.innerHTML = `<img src=${src} />`;

	cartProdName.textContent = data.title;
	cartItemPrice.textContent = `$${priceAfterDiscount}`;
	cartQuantity.textContent = itemsQuantity;
	cartTotalPrice.textContent = `$${(
		itemsQuantity * Number(priceAfterDiscount)
	).toFixed(2)}`;
}

function addToCartHandler() {
	itemsQuantity = Number(input.value);
	updateQuantityInCart();
	updateCart();
}

function handleProductImages(e) {
	console.log("handleProductImages");
	const mainImg = document.querySelector(".prod-images__active img");
	thumbnails.forEach((img) => img.classList.remove("active"));
	e.currentTarget.classList.add("active");
	const chosenImgNum = getImgNum(e.target, true);
	mainImg.src = `images/image-product-${chosenImgNum}.jpg`;
	currentImage = mainImg;
	updateCart();
}

function deleteItemFromCart() {
	itemsQuantity = itemsQuantity - 1;
	updateQuantityInCart();
	openCart();
	updateCart();
}

function getImgNum(img, isThumbnail) {
	if (img) {
		const index = isThumbnail
			? img.src.indexOf("-thumbnail") - 1
			: img.src.lastIndexOf(".") - 1;
		return img.src.charAt(index);
	}
	return 1;
}

window.onload = async function () {
	data = await fetchData();
	console.log(data);
	priceAfterDiscount = data.price * (data.discount / 100);
	loadSliderImgs();
	loadProdImgs();
	loadProductPage();
	updateQuantityInCart();
	updateCart();
};

openMenuBtn.addEventListener("click", openNav);

if (btnSliderNext && btnSliderPrev) {
	btnSliderNext.addEventListener("click", (e) => sliderHandler(e, "next"));
	btnSliderPrev.addEventListener("click", (e) => sliderHandler(e, "prev"));
}

btnMinus.addEventListener("click", (e) => quantityHandler(e, "minus"));
btnPlus.addEventListener("click", (e) => quantityHandler(e, "plus"));

cartIcon.addEventListener("mouseover", openCart);
cartIcon.addEventListener("click", openCart);
cart.addEventListener("mouseleave", closeCart);

btnAddToCart.addEventListener("click", addToCartHandler);

if (btnDeleteItem) btnDeleteItem.addEventListener("click", deleteItemFromCart);
