//making a function that create content div
function makeContent() {
  const content = document.createElement("div");
  content.id = "content";
  document.body.appendChild(content);
}
makeContent();



function makeCard(url, title, summary) {
  //making the container div
  const container = document.createElement("div");
  container.classList.add("card");
  container.classList.add("cardContainer");
  content.appendChild(container);
  // making the img
  const cardImg = document.createElement("img");
  cardImg.src = url;
  cardImg.classList.add("card-img-top");
  cardImg.classList.add("cardImg");
  container.appendChild(cardImg);
  //making card body
  const cardBody = document.createElement("div");
  cardBody.classList.add('card-body');
  container.appendChild(cardBody);
  //making the h5
  const cardH5 = document.createElement("h5");
  cardH5.classList.add("card-title");
  cardH5.classList.add("cardH5");
  cardH5.innerHTML = `<span>Name</span> : ${title}`;
  cardBody.appendChild(cardH5);
  //making the paragraph
  const cardPara = document.createElement("p");
  cardPara.classList.add("card-text");
  cardPara.innerHTML = `summary : ${summary}`;
  cardBody.appendChild(cardPara);

  return container;
}

//this code will iterate through the api and will make card for each movie
const api = fetch("https://api.tvmaze.com/shows/82/episodes")
  .then((res) => {
    return res.json();
  })
  .then((films) => {
    for (let film of films) {
      let title = film.name;
      let url = film.image.medium;
      let summary = film.summary;
      makeCard(url, title, summary);
    }
  });

//getting search input and the button
const search = document.querySelector("#search");
const searchBtn = document.querySelector("#searchBtn");
console.log(search);
console.log(searchBtn);






//adding an event listener for the search and btn
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(search.value);
  content.remove();
  const api = fetch("https://api.tvmaze.com/shows/82/episodes")
    .then((res) => {
      return res.json();
    })
    //iterating through the episodes and creating an array that have the word that searched in
    //the search input
    .then((films) => {
      let searched = [];
      for (let film of films) {
        let title = film.name;
        let regex = new RegExp(search.value, "i");
        if (regex.test(title)) {
          searched.push(film);
        }
      }
      return searched;
    })
    //creating new cards depend on the search value
    .then((searched) => {
      console.log(searched);
      makeContent();
      for (let film of searched) {
        let title = film.name;
        let url = film.image.medium;
        let summary = film.summary;
        makeCard(url, title, summary);
      }
    });
});
