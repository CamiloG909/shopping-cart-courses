const cart = document.querySelector("#carrito");
const containerCart = document.querySelector("#lista-carrito tbody");
const clearCartBtn = document.querySelector("#vaciar-carrito");
const listCourses = document.querySelector("#lista-cursos");
let arrayInfo = [];

loadEventListeners();
function loadEventListeners() {
  listCourses.addEventListener("click", addCourse);
  clearCartBtn.addEventListener("click", clearCartButton);
  cart.addEventListener("click", deleteCourse);
}

function addCourse(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const courseCard = e.target.parentElement.parentElement;
    getInfoCourse(courseCard);
  }
}

function getInfoCourse(card) {
  const infoCourse = {
    id: card.querySelector("a").getAttribute("data-id"),
    img: card.querySelector("img").src,
    title: card.querySelector(".info-card h4").textContent,
    price: card.querySelector(".info-card .precio span").textContent,
    amount: 1,
  };

  const exists = arrayInfo.some((e) => e.id === infoCourse.id);

  if (exists) {
    const curses = arrayInfo.map((e) => {
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

  showCourse();
}

function showCourse() {
  clearCartContainer();

  arrayInfo.forEach((e) => {
    const row = document.createElement("tr");
    row.innerHTML = `
		<td><img src="${e.img}" width=100></td>
		<td>${e.title}</td>
		<td>${e.price}</td>
		<td>${e.amount} </td>
		<td>
			<a href="#" class="borrar-curso" data-id="${e.id}">X</a>
		</td>
		`;
    containerCart.appendChild(row);
  });
}

function clearCartContainer() {
  containerCart.innerHTML = "";
}

function clearCartButton(e) {
  e.preventDefault();
  arrayInfo = [];
  clearCartContainer();
}

function deleteCourse(e) {
  e.preventDefault();
  if (e.target.classList.contains("borrar-curso")) {
    const idCourse = e.target.getAttribute("data-id");

    arrayInfo = arrayInfo.filter((e) => e.id !== idCourse);
    showCourse();
  }
}
