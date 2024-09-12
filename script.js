const CharactersBlock = document.querySelector(".characters");
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");
const input = document.querySelector(".input");
const header = document.querySelector(".header");
let currentPageUrl = "https://rickandmortyapi.com/api/character/";
let nextPageUrl = "";
let persons = [];

function fetchCharacters(url) {
  fetch(url)
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      currentPageUrl = url;
      nextPageUrl = data.info.next;
      prevPageUrl = data.info.prev;
      persons = data.results;
      data.results
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((person) => {
          CharactersBlock.innerHTML += `
          <div class="card">
            <img src="${person.image}" alt="" />
            <div class="cardh1">
              <h1>${person.name.slice(0, 15)}</h1>
            </div>
          </div>`;
        });
    });
}

input.addEventListener("keyup", (e) => {
  CharactersBlock.innerHTML = "";
  const value = e.target.value;

  const filtered = persons.filter((person) => {
    if (person.name.toLowerCase().includes(value.toLowerCase())) {
      return true;
    }
  });
  filtered.map((person) => {
    CharactersBlock.innerHTML += ` 
    <div class="card">
    <img src="${person.image}" alt="" />
    <div class="cardh1">
      <h1>${person.name.slice(0, 15)}</h1>
    </div>
  </div>`;
  });
});

fetchCharacters(currentPageUrl);
// console.log(fetchCharacters());
nextButton.addEventListener("click", () => {
  CharactersBlock.innerHTML = "";
  fetchCharacters(nextPageUrl);
});

prevButton.addEventListener("click", () => {
  if (prevPageUrl) {
    CharactersBlock.innerHTML = "";
    fetchCharacters(prevPageUrl);
  }
});