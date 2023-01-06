const URL_API = "https://pokeapi.co/api/v2/pokemon";

const table = document.querySelector("#table");
const btnCallPokemon = document.querySelector("#call-pokemon");
const inputCallPokemon = document.querySelector("#pokemon");

/**
 * Function to call a pokemon
 *
 * @param {Number|String} id
 * @return pokemon
 */
const callPokemon = async (pokemonId) => {
  try {
    const id = Number.isInteger(pokemonId)
      ? pokemonId
      : pokemonId.toLowerCase();
    const res = await fetch(`${URL_API}/${id}`);
    const pokemon = await res.json();
    return pokemon;
  } catch (error) {
    alert("El pokemon no se encuentra");
    console.error(error);
    return {};
  }
};

/**
 * Crea la carta pokemon
 */
const createCard = (pokemon) => {
  const card = document.createElement("div");
  const nameCard = createNameCard(pokemon.name);
  const imageCard = createImageCard(pokemon);
  const typesPokemonCard = createPokemonTypes(pokemon.types);

  card.className = "card-pokemon";
  card.append(nameCard, imageCard, typesPokemonCard);
  table.appendChild(card);
};

/**
 * Crea el nombre de la carta, donde se incluye el nombre del pokemon
 * @returns el nodo del titulo de la carta
 */
const createNameCard = (name) => {
  const titleCard = document.createElement("h2");
  const pokemonName = document.createTextNode(name);
  titleCard.className = "card-name";
  titleCard.appendChild(pokemonName);
  return titleCard;
};

/**
 * Crea un nodo para colocar la  imagen del pokemon
 * @returns un nodo con la imagen del pokemon
 */
const createImageCard = (pokemon) => {
  const { name, sprites } = pokemon;
  const containerImg = document.createElement("div");
  const img = document.createElement("img");

  img.setAttribute("src", sprites.front_default);
  img.setAttribute("alt", `Sprite frontal de ${name}`);
  img.setAttribute("lazy", "loading");

  containerImg.appendChild(img);
  containerImg.className = "card-image";

  return containerImg;
};

/**
 * Obtiene los tipos del pokemon y los convierte en un nodo
 * @returns {Array} de los tipos del pokemon en formato de Nodo
 */
const createPokemonTypes = (types) => {
  const pokemonTypes = [];
  const containerType = document.createElement("div");

  types.forEach((typeElement) => {
    const typeNode = document.createTextNode(typeElement.type.name);
    const divType = document.createElement("div");
    divType.className = `type type-${typeElement.type.name}`;
    divType.appendChild(typeNode);
    pokemonTypes.push(divType);
  });

  containerType.className = "card-types";
  containerType.append(...pokemonTypes);

  return containerType;
};

/**
 * Método para crear una carta pokemon para el addEventListener
 * @param {*} event 
 */
const createCardPokemon = async (event) => {
  event.preventDefault();
  if (!inputCallPokemon.value) return;
  const pokemon = await callPokemon(inputCallPokemon.value);
  createCard(pokemon);
};

btnCallPokemon.addEventListener("click", createCardPokemon);

const pokemonInitial = await callPokemon(393);
createCard(pokemonInitial);
