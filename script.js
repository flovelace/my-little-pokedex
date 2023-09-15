// Select search button
document
  .querySelector('#search')
  .addEventListener('click', () => handlePokemonSearch(false));

// Select the lucky button
document
  .querySelector('#lucky')
  .addEventListener('click', () => handlePokemonSearch(true));

const types = document.querySelector('#types');

// Function to convert user input to lowercase
function lowerCaseName(string) {
  return string.toLowerCase();
}

// Capitalize the first letter of the Pokemon name
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Invoke the function to get the data from the API on click
// Reusable function to fetch and display Pokemon data
function handlePokemonSearch(isRandom) {
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  if (isRandom) {
    const randomNumber = Math.ceil(Math.random() * 898);
    apiUrl += randomNumber;
  } else {
    const pokemonName = document.querySelector('#pokemonName').value;
    const lowerCasePokemonName = lowerCaseName(pokemonName);
    apiUrl += lowerCasePokemonName;
  }

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // If the Pokemon has no types
      if (data.types.length === 0) {
        let newType = document.createElement('span');
        newType.innerHTML = 'No type';
        newType.classList.add('badge');
        types.appendChild(newType);
      }

      document.querySelector('.pokemonBox').innerHTML = `
        <div class="pokemonContainer">
          <img src="${
            data.sprites.other.home.front_default
          }" alt="${capitalizeFirstLetter(
        data.name,
      )}" style="height: 300px; width: 300px;">
          <div class="pokemonInfo">
            <h2>${capitalizeFirstLetter(data.name)}</h2>
            <span class="badge">${data.types[0].type.name}</span>
            ${
              data.types.length > 1
                ? `<span class="badge">${data.types[1].type.name}</span>`
                : ''
            }
            <h3>Base Stats</h3>
            <p>HP: ${data.stats[0].base_stat}</p>
            <p>Attack: ${data.stats[1].base_stat}</p>
            <p>Defense: ${data.stats[2].base_stat}</p>
            <p>Special Attack: ${data.stats[3].base_stat}</p>
            <p>Special Defense: ${data.stats[4].base_stat}</p>
            <p>Speed: ${data.stats[5].base_stat}</p>
            <p>Weight: ${data.weight}</p>
          </div>
        </div>
      `;
    })
    .catch((err) => {
      console.log(err);
      document.querySelector('.pokemonBox').innerHTML = isRandom
        ? `<h1>ERROR! Could not find a random Pokemon</h1>`
        : `<h1>POKEMON NOT FOUND</h1>`;
    });
}
