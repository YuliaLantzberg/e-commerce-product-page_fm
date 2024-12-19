const openMenuBtn = document.querySelector(".nav__left-navIcon");
const btnSliderPrev = document.getElementById("prev-btn");
const btnSliderNext = document.getElementById("next-btn");

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

openMenuBtn.addEventListener("click", openNav);
btnSliderNext.addEventListener("click", (e) => sliderHandler(e, "next"));
btnSliderPrev.addEventListener("click", (e) => sliderHandler(e, "prev"));
