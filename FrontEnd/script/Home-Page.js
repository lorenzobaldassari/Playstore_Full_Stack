const apiAddress = `http://localhost:3010/videogames/`;
const apiKey = `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhOTEzMmY2ZTNkZDAwMTQ5NWU1YTEiLCJpYXQiOjE2OTgzMzcwNzQsImV4cCI6MTY5OTU0NjY3NH0.Atbr9XQiMvBwlBzqmbkbygfn5ZX7gaZa7KDcvGF4gPU`;
const rowPosition = document.getElementById(`rowPosition`);

const getElement = function (api, apikey) {
  // inizio fetch
  fetch(api, {
  })
    //   fine fetch
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        alert(`problema`);
        throw new Error(`errore nella DELETE`);
      }
    })
    .then((events) => {
      // generateElement(events);

      for (let i = 0; i < events.length; i++) {
        console.log(events[i].id);

        if (events[i].price === 0) {
          events[i].price = `Gratis`;
        }
        const col = document.createElement(`div`);
        col.classList.add(`col-sm-6`, `col-md-4`, `col-lg-3`, `col-xxl-2`);
        col.innerHTML = `<div id="kk"  class="hover  card  box m-0 p-0">
        <div class="">
        <img id="cardimage" src="${events[i].imageUrl}" class="card-img-top imgBox  " alt="...">
        </div>
        <h6 id="brand class"bg-warning" class="text-center mt-2 mb-1 ${events[i].brand}"> ${events[i].brand}</h6>
        <div class="card-body position-relative card-title d-flex flex-column justify-content-between align-items-start ">
      <h3  id="title" class="mb-4 fw-bold ">${events[i].name}</h3>
      <p id="description" class="card-text">${events[i].description}</p>
      <div class="d-flex">
      <a href="./details.html?_id=${events[i].id}" class="btn btn-primary">Details</a>
      </div>
        <div class="position-absolute bottom-0 end-0 mb-2 me-2">
       
        <p id="price" class="card-text">${events[i].price}$</p>
        </div>
        </div>
        </div>`;

        rowPosition.appendChild(col);
        find();
      }
    })
    .catch((err) => {
      console.log(`si e verificato un errore`, err);
    });
};
// fine function

// const generateElement = function (arrayOfelement) {
//   const col = document.createElement(`div`);
//   col.classList.add(`col-12`, `col-md-6`, `col-lg-3`);
//   col.innerHTML = `<div class="card">
//     <h6 id="brand class"bg-warning"> ${arrayOfelement.brand}</h6>
//   <img id="cardimage" src="${arrayOfelement.imageUrl}" class="card-img-top" alt="...">
//   <div class="card-body">
//     <h5 id="title" class="card-title">${arrayOfelement.name}</h5>
//     <p id="description" class="card-text">${arrayOfelement.description}</p>
//     <p id="description" class="card-text">${arrayOfelement.price}</p>
//   </div>
//   </div>`;
//   rowPosition.appendChild(col);
// };

const over = function (event) {
  // event.target.children[2].children[3].children[0].style.color = `red`;
  // event.target.children[2].children[3].children[0].style.fontSize = `2em`;
  event.target.children[2].children[3].children[0].classList.add(`red`);
  // price2.style.color=`red`
};
const leave = function (event) {
  // event.target.children[2].children[3].children[0].style.color = `black`;
  // event.target.children[2].children[3].children[0].style.fontSize = `1em`;
  event.target.children[2].children[3].children[0].classList.remove(`red`);
  event.target.children[2].children[3].children[0].classList.add(`white`);
  // price2.style.color=`red`
};

// carrello
const counter = document.getElementById(`counter`);
const cartPosition = document.getElementById(`cartPosition`);
const tot = document.getElementById(`tot`);

let count = 0;
let total = 0;

const addToChart = function (e) {
  count++;
  console.log(
    e.target.parentElement.parentElement.children[3].children[0].innerText
  );
  const cartBox = document.createElement(`div`);
  const titleToAdd = document.createElement(`p`);
  titleToAdd.classList.add = `fw-semibold`;
  total =
    total +
    parseFloat(
      e.target.parentElement.parentElement.children[3].children[0].innerText
    );
  tot.innerText = `${total} $`;
  // finire i collegamenti
  cartBox.innerHTML = `${e.target.parentElement.parentElement.children[0].innerText}   
     \u00a0 \u00a0 \u00a0
    ${e.target.parentElement.parentElement.children[3].children[0].innerText} <i class="fas fa-trash-alt ms-2"></i>`;
  const trashCan = document.createElement(`div`);
  // trashCan.innerHTML = `<i class="fas fa-trash-alt ms-2"></i>`;
  cartBox.appendChild(titleToAdd);
  cartBox.appendChild(trashCan);
  cartPosition.appendChild(cartBox);
  counter.innerText = count;
  trashCan.addEventListener(`click`, function (e) {
    console.log(e.target.parentElement);
  });
};

const find=()=>{
  const a=document.getElementById("kk");
  a.addEventListener("mouseenter",over)
  a.addEventListener("mouseleave",leave)
}
getElement(apiAddress, apiKey);