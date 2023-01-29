// Select search field
document.querySelector('#search').addEventListener('click', getPokemon);

// function to convert user input to lowercase
function lowerCaseName(string) {
  return string.toLowerCase();
}

// Capitalise the first letter on the pokemon name h1
function capitaliseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Invoke the function to get the data from the API on click
function getPokemon(e) {
  const pokemonName = document.querySelector('#pokemonName').value;
  const lowerCasePokemonName = lowerCaseName(pokemonName);

  fetch(`https://pokeapi.co/api/v2/pokemon/${lowerCasePokemonName}`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector('.pokemonBox').innerHTML = `
          <div>
            <img src="${
              data.sprites.other.home.front_default
            }" alt="${capitaliseFirstLetter(
        data.name,
      )}" style="height: 500px; width: 500px;">
          </div>
          <div class="pokemonInfo">
            <h1>${capitaliseFirstLetter(data.name)}</h1>
            <p>${data.weight}</p>
          </div>
        </div>
      `;
    })
    .catch((err) => {
      console.log('Pokemon not found!', err);
    });

  e.preventDefault();
}
