


const apiAddress = `http://localhost:3010/videogames/`;
const apiKey = `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhOTEzMmY2ZTNkZDAwMTQ5NWU1YTEiLCJpYXQiOjE2OTgzMzcwNzQsImV4cCI6MTY5OTU0NjY3NH0.Atbr9XQiMvBwlBzqmbkbygfn5ZX7gaZa7KDcvGF4gPU `;



const addresBarContent = new URLSearchParams(location.search);
//url searchparams cerca i parametry e location.search e la barra di ricerca
const eventId = addresBarContent.get(`_id`);




const generateEventDetails = function (events) {
  const col = document.createElement(`div`);
  col.classList.add(`col-12`, `col-lg-6`);
  col.classList.add(`col`);
  col.classList.add(`bg-secondary`);
  col.classList.add(`px-0`);
  col.classList.add(`rounded-1`);
  col.classList.add(`hover`);
  col.innerHTML = `<div class="card box m-0 p-0 bg-white">
        <img id="cardimage" src="${events.imageUrl}" class="card-img-top w-100" alt="...">
        <h6 id="brand class"bg-warning" class="text-center mt-2 mb-4 ${events.brand}"> ${events.brand}</h6>
        <div class="card-body position-relative ">
      <h3 class="mb-4" id="title" class="card-title">${events.name}</h3>
      <p id="description" class="card-text">${events.description}</p>
      <a href="./Back-Office.html?_id=${events.id}" onclick="sure()" class="btn btn-warning">MODIFICA</a>
      <button type="button" id="kk"  class="my-3 btn btn-danger">ELIMINA</button>
        <div class="position-absolute bottom-0 end-0 mb-2 me-2">
      
        <p id="description" class="card-text">${events.price}$</p> 
        </div>
        </div>
        </div>`;
        rowPosition.appendChild(col);
        find();
};

console.log(eventId);
const getDetails = function () {
  fetch(apiAddress+eventId, {
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new error(`errore nel caricamento dei dettagli`);
      }
    })
    .then((e) => {
      generateEventDetails(e);
    });
};
getDetails();


const deleteEvent = () => {
 
  if (!confirm("Your Are deleting this Item! Are you sure?")) {
    location.assign(`./Back-Office.html?_id=${events.id}`);
  }

fetch(apiAddress+eventId, {
  method: `DELETE`,
})
  .then((res) => {
    if (res.ok) {
      alert(`elemento eliminato`);
      location.assign(`./Home-page.html`);
    } else {
      alert(`problema`);
      throw new Error(`errore nella DELETE`);
    }
  })
  .catch((err) => {
    console.log(`errore`, err);
  });
};

const sure = () => {
  if (!confirm("Are you sure?")) {
    location.assign(`./Back-Office.html?_id=${events._id}`);
  }
};

const find=()=>{
  const a=document.getElementById("kk");
  a.addEventListener("click",deleteEvent)
}

