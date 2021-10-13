const showCartBtn = document.querySelector("#show-cart");
const cart = document.querySelector(".cart");
const containerCart = document.querySelector("#list-cart tbody");
const clearCartBtn = document.querySelector("#clear-cart");
const listCourses = document.querySelector("#list-courses");
let arrayInfo;

loadEventListeners();

function loadEventListeners() {
	document.addEventListener("DOMContentLoaded", loadCoursesCart);
	showCartBtn.addEventListener("click", showCartBox);

	listCourses.addEventListener("click", addCourse);
	clearCartBtn.addEventListener("click", clearCartButton);
	cart.addEventListener("click", deleteCourse);
}

function loadCoursesCart() {
	if (localStorage.getItem("courses") === null) {
		arrayInfo = [];
		localStorage.setItem("courses", "[]");
	} else {
		arrayInfo = JSON.parse(localStorage.getItem("courses"));
		showCourses();
	}
}

function showCartBox() {
	// Show or hide div arrow
	document.querySelector("#arrow-cart").classList.toggle("show");
	cart.classList.toggle("show");

	// Show button hover
	const iconCart = showCartBtn.firstChild.nextElementSibling;
	if (iconCart.style.backgroundColor === "") {
		iconCart.style.backgroundColor = "#0000001c";
	} else {
		iconCart.style.backgroundColor = null;
	}
}

function addCourse(e) {
	e.preventDefault();

	if (e.target.classList.contains("card-course__btn-add")) {
		const courseCard = e.target.parentElement.parentElement;
		getInfoCourse(courseCard);
	}
}

function getInfoCourse(card) {
	const infoCourse = {
		id: card.querySelector("div #add-cart-btn").getAttribute("data-id"),
		img: card.querySelector("img").src,
		title: card.querySelector("div .card-course__title").textContent,
		price: "$15",
		amount: 1,
	};

	const exists = arrayInfo.some((e) => e.id === infoCourse.id);

	if (exists) {
		arrayInfo = arrayInfo.map((e) => {
			if (e.id === infoCourse.id) {
				e.amount++;
				return e;
			} else {
				return e;
			}
		});
	} else {
		arrayInfo.push(infoCourse);
	}
	syncStorage();
	showCourses();
}

function showCourses() {
	containerCart.innerHTML = "";

	arrayInfo.forEach((e) => {
		const row = document.createElement("tr");
		row.innerHTML = `
		<td><img src="${e.img}" width=100></td>
		<td>${e.title}</td>
		<td>${e.price}</td>
		<td>${e.amount} </td>
		<td>
    <i class="bi bi-x-circle-fill cart__btn-delete" title="Delete course" data-id="${e.id}"></i>
		</td>
		`;
		containerCart.appendChild(row);
	});
}

function clearCartButton() {
	arrayInfo = [];
	localStorage.setItem("courses", "[]");
	containerCart.innerHTML = "";
}

function deleteCourse(e) {
	if (e.target.classList.contains("cart__btn-delete")) {
		const idCourse = e.target.getAttribute("data-id");
		arrayInfo = arrayInfo.filter((e) => e.id !== idCourse);
		syncStorage();
		showCourses();
	}
}

function syncStorage() {
	infoString = JSON.stringify(arrayInfo);

	localStorage.setItem("courses", infoString);
}
