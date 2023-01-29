document.querySelector('#search').addEventListener('click', getPokemon);

function getPokemon(e) {
  const pokemonName = document.querySelector('#pokemonName').value;

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector('.pokemonBox').innerHTML = `
          <div>
            <img src="${data.sprites.other.home.front_default}" alt="${data.pokemonName}" style="height: 500px; width: 500px;">
          </div>
          <div class="pokemonInfo">
            <h1>${data.name}</h1>
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
