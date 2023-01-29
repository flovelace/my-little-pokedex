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
            <h2>Base Stats</h2>
            <p>HP: ${data.stats[0].base_stat}</p>
            <p>Attack: ${data.stats[1].base_stat}</p>
            <p>Defence: ${data.stats[2].base_stat}</p>
            <p>Special Attack: ${data.stats[3].base_stat}</p>
            <p>Special Defence: ${data.stats[4].base_stat}</p>
            <p>Speed: ${data.stats[5].base_stat}</p>
            <p>Weight: ${data.weight}</p>
          </div>
        </div>
      `;
    })
    .catch((err) => {
      console.log(err);
      return (document.querySelector(
        '.pokemonBox',
      ).innerHTML = `<h1>NOT FOUND</h1>`);
    });

  e.preventDefault();
}
