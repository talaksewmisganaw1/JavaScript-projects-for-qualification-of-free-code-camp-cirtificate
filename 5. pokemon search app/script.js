const input = document.getElementById("search-input");
const button = document.getElementById("search-button");
const imgContainer = document.getElementById("img-container")

const pName = document.getElementById("pokemon-name");
const pId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const statElements = document.querySelectorAll(".stats");

let url = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
let apiData;

//************EVENTLISTENERS**********//
button.addEventListener("click", fetchFunction);


//************FUNCTIONS**************//

function fetchFunction() {
  clear();
fetch(url).then(response => response.json()).then(data => {
  apiData = data.results;
  searchFunction(apiData);
  }).catch(error => console.log(error));
}


function searchFunction(data) {
  let value = input.value.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-");
  let ids = [];
  let names = [];

  //extracting values of "id" property of data to "ids" variable
  data.forEach(item => {
    ids.push(String(item.id));
  });
  
  //extracting values of "name" property of data to "names" variable
  data.forEach(item => {
    names.push(item.name);
  });


  if(ids.includes(value) || names.includes(value)) {
    const pokemonUrl = `${url}/${value}`;
    fetch(pokemonUrl).then(response => response.json()).then(pokemonData => {
      displayer(pokemonData)
    }).catch(error => console.error('Error: ', error))
  } else {
    alert("Pokémon not found");
  }
}

function displayer(data) {
//****seting the innerHTML of the first four elements****//
  pName.innerHTML = data.name.toUpperCase();
  pId.innerHTML = data.id;
  weight.innerHTML = data.weight;
  height.innerHTML = data.height;

//****setting the innerHTML of the last four items****//
  //extract the data for the "statElements" and assign it to an array
  const statData = [];
  data.stats.forEach(item => statData.push(item.base_stat));

  //assign the extracted data for the "statElements" variable using for loop
  for (let i = 0; i < statData.length; i++) {
    statElements[i].innerHTML = statData[i];
  }

//adding an img element and displayig it
  const img = document.createElement("img");
  img.id = "sprite";
  img.src = data.sprites.front_default;
  imgContainer.appendChild(img);

//extracting each type for the #types element and appending each of them in it
  for (let i = 0; i < data.types.length; i++) {
    // extracting the name and assigning it to the typeName variable
    const pokemonType = data.types[i].type;
    const typeName = pokemonType.name.toUpperCase();

    // creating element having the "typeName" and appending it to the #types
    const type = document.createElement("span");
    type.classList.add("type");
    type.textContent = typeName;
    types.appendChild(type);
  }
}

function clear() {
  types.textContent = "";
  imgContainer.innerHTML = "";
}