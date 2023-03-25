const main = document.querySelector(".main");
const apiButton = document.querySelector(".change-api-button");
const header = document.querySelector("header");

let data = [];
let randomNumber = 0;

function changeApiRessource(e) {
    e.preventDefault();
    if (Object.keys(data[0]).includes("characterDirection")) {
        getRickAndMortyData();
    } else {
        getSimpsonData();
    }
}

function randomCharacter() {
    const result = Math.floor(Math.random() * data.length);
    return randomNumber = result;
}

const changeHeader = () => {
    const h1 = document.createElement("h1");
    
    if (Object.keys(data[0]).includes("characterDirection")) {
        h1.innerHTML = "The Simpsons";
    } else {
        h1.innerHTML = "Rick and Morty";
    }

    header.appendChild(h1);
}

const createCard = (arr) => {
    main.innerHTML = "";
    header.innerHTML = "";

    changeHeader();

    if (Object.keys(arr[0]).includes("characterDirection")) {
        const card = `
        <li>
            <h2>${arr[0].character}</h2>
            <img src="${arr[0].image}" alt="Comic character">
            <p>${arr[0].quote}</p>
            <button class="api-req-button">NEW</button>
        </li>
        `;

        const ul = document.createElement("ul");
        ul.innerHTML = card;
        main.appendChild(ul);

        const button = document.querySelector(".api-req-button");
        button.addEventListener("click", getSimpsonData);

        console.log(data);

        apiButton.addEventListener("click", changeApiRessource);
    } else {
        randomCharacter();

        console.log(randomNumber);

        const card = `
        <li>
            <h2>${arr[randomNumber].name}</h2>
            <img src="${arr[randomNumber].image}" alt="Comic character">
            <button class="api-req-button">NEW</button>
        </li>
        `;

        const ul = document.createElement("ul");
        ul.innerHTML = card;
        main.appendChild(ul);

        const button = document.querySelector(".api-req-button");
        button.addEventListener("click", getRickAndMortyData);

        apiButton.addEventListener("click", changeApiRessource);
    }
}

const getSimpsonData = () => {
    fetch("https://thesimpsonsquoteapi.glitch.me/quotes")
        .then((response) => response.json())
        .then((res) => data = res)
        .then(() => createCard(data))
        .catch((err) => console.error("Impossible to fetch :", err.message))
};

getSimpsonData();

const getRickAndMortyData = () => {
    fetch("https://rickandmortyapi.com/api/character")
        .then((response) => response.json())
        .then((res) => data = [res][0].results)
        .then(() => createCard(data))
        .catch((err) => console.error("Impossible to fetch :", err.message))
};



