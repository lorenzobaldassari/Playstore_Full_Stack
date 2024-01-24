


const form = document.getElementById(`form`);

const apiAddress = `http://localhost:3010/videogames/`;
const apiKey = `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhOTEzMmY2ZTNkZDAwMTQ5NWU1YTEiLCJpYXQiOjE2OTgzMzcwNzQsImV4cCI6MTY5OTU0NjY3NH0.Atbr9XQiMvBwlBzqmbkbygfn5ZX7gaZa7KDcvGF4gPU`;
const formReference = document.getElementById(`form3`);
const button = document.getElementById(`submitButton`);
const brand1 = document.getElementById(`brand`);
const name1 = document.getElementById(`name`);
const description1 = document.getElementById(`description`);
const imgURL1 = document.getElementById(`imgURL`);
const price1 = document.getElementById(`price`);
const addresBarContent = new URLSearchParams(location.search);
const eventId = addresBarContent.get(`_id`);

if (eventId) {
  fetch(apiAddress+eventId, {
    method: `GET`
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      // const brand1 = document.getElementById(`brand`);
      // const name1 = document.getElementById(`name`);
      // const description1 = document.getElementById(`description`);
      // const imgURL1 = document.getElementById(`imgURL`);
      // const price1 = document.getElementById(`price`);
      console.log(res);
      name1.value = res.name;
      description1.value = res.description;
      price1.value = res.price;
      imgURL1.value = res.imageUrl;
      brand1.value = res.brand;
    })

    .catch((err) => {
      console.log(err, `errore`);
    });
}
let msg;
let method;
let id;
if (eventId) {
  method = `PUT`;
  id = eventId;
  msg = `elemento modificato correttamente`;
} else {
  method = `POST`;
  id = ``;
  msg = `elemento salvato correttamente`;
}
console.log(method);
console.log(id);
button.addEventListener(`click`, function (e) {
  e.preventDefault();
  const obj = {
    name: name1.value,
    description: description1.value,
    brand: brand1.value,
    imageUrl: imgURL1.value,
    price: price1.value,
  };
  // console.log(obj);

  // inizio fetch
  fetch(apiAddress+id, {
    method: method,
    body: JSON.stringify(obj),
    headers: { "Content-type": "application/json" },
  })
    .then((events) => {
      console.log(`oggetto inviato`, events);
      if (events.ok) {
        alert(msg);
        name1.value = ``;
        brand1.value = ``;
        imgURL1.value = ``;
        price.value = ``;
        description1.value = ``;
      } else {
        alert(`errore`);
        throw new errore(`errore nel post`);
      }
    })
    .catch((err) => {
      console.log(`si e verificato un errore`, err);
    });
});

const resetButton = document.getElementById(`reset`);
resetButton.addEventListener(`click`, () => {
  description1.value = ``;
  name1.value = ``;
  brand1.value = ``;
  imgURL1.value = ``;
  price.value = ``;
});
