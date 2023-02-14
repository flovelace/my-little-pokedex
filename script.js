// Select search button
document.querySelector('#search').addEventListener('click', getPokemon);

// Select the lucky button
document.querySelector('#lucky').addEventListener('click', luckyPokemon);

const pokemonH2Element = document.querySelector('#pokemonTitle');
const types = document.querySelector('#types');
const hpElement = document.querySelector('#hp');
const attackElement = document.querySelector('#attack');
const defenceElement = document.querySelector('#defence');
const specAttElement = document.querySelector('#specialAttack');
const specDefElement = document.querySelector('#specialDefence');
const speedElement = document.querySelector('#speed');
const weightElement = document.querySelector('#weight');

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
      types.innerHTML = '';
      data.types.forEach((t) => {
        let newType = document.createElement('span');

        newType.innerHTML = t.type.name;
        newType.classList.add('badge');

        types.appendChild(newType);
        console.log('working');
      });

      let pokemonH2 = data.name;
      pokemonH2Element.innerHTML = `${capitaliseFirstLetter(pokemonH2)}`;

      let hp = data.stats[0].base_stat;
      hpElement.innerHTML = `HP: ${hp}`;

      let attack = data.stats[1].base_stat;
      attackElement.innerHTML = `Attack: ${attack}`;

      let defence = data.stats[2].base_stat;
      defenceElement.innerHTML = `Defense: ${defence}`;

      let specAtt = data.stats[3].base_stat;
      specAttElement.innerHTML = `Special Attack: ${specAtt}`;

      let specDef = data.stats[4].base_stat;
      specDefElement.innerHTML = `Special Defense: ${specDef}`;

      let speed = data.stats[5].base_stat;
      speedElement.innerHTML = `Speed: ${speed}`;

      document.querySelector('.pokemonBox').innerHTML = `
        <div class="pokemonContainer">
            <img src="${
              data.sprites.other.home.front_default
            }" alt="${capitaliseFirstLetter(
        data.name,
      )}" style="height: 300px; width: 300px;">
          <div class="pokemonInfo">
            <h2>${capitaliseFirstLetter(data.name)}</h2>
            <span class="badge">${data.types[0].type.name}</span>
            <h3>Base Stats</h3>
            <p>HP:</p> ${data.stats[0].base_stat}
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
      ).innerHTML = `<h1>POKEMANS NOT FOUND</h1>`);
    });

  e.preventDefault();
}

function luckyPokemon(e) {
  const randomNumber = Math.ceil(Math.random() * 900);

  fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`)
    .then((response) => response.json())
    .then((data) => {
      // types.innerHTML = '';
      // data.types.forEach((t) => {
      //   let newType = document.createElement('span');

      //   newType.innerHTML = t.type.name;
      //   newType.classList.add('badge');

      //   types.appendChild(newType);
      //   console.log('working');
      // });
      document.querySelector('.pokemonBox').innerHTML = `
        <div class="pokemonContainer">
            <img src="${
              data.sprites.other.home.front_default
            }" alt="${capitaliseFirstLetter(
        data.name,
      )}" style="height: 300px; width: 300px;">
          <div class="pokemonInfo">
            <h2>${capitaliseFirstLetter(data.name)}</h2>
            <span class="badge">${data.types[0].type.name}</span>
            <h3>Base Stats</h3>
            <p>HP:</p> ${data.stats[0].base_stat}
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
      ).innerHTML = `<h1>ERROR! could not find pokemon</h1>`);
    });

  e.preventDefault();
}
