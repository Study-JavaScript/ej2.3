// const baseURL = 'http://localhost:4001';
const baseURL = "https://app-callback-latest.onrender.com"


const callTimes = [];

// const fetchPokemons = async (pageNo) => {
//   try {
//     const response = await fetch(`${baseURL}/pokemon`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ pageNo }),
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const data = await response.json();
//     console.log('Pokémon data:', data);
//     return data;
//   } catch (error) {
//     console.error('Error fetching Pokémon:', error);
//     throw error;
//   }
// };

const debounceFetchPokemons = debounce(async (pageNo) => {
  try {
    const timeCallEl = document.getElementById("timeCall");
    const idsFrom = document.getElementById("idsFrom");
    const idsTo = document.getElementById("idsTo")
    const pokemonListEl = document.getElementById("pokemonList");

    const response = await fetch('/pokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pageNo }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    // Actualizar elementos HTML con los datos recibidos
    idsFrom.textContent = data.from
    idsTo.textContent = data.to
    timeCallEl.textContent = data.timeTaken;

    let listItems = '';
    data.data.forEach(pokemon => {
      // listItems += `<li>${pokemon.name}</li>`;
      listItems += `<li class="rounded-md border bg-gray-200 py-0.5 hover:bg-gray-100">${pokemon.name}</li>`
    });
    pokemonListEl.innerHTML = listItems;
    // Poblar arr de tiempos de llamada
    callTimes.push(data.timeTaken);
    // Mostrar los tiempos de llamada
    displayCallTimes();

    console.log("data:", data);

  } catch (error) {
    console.error('Error fetching Pokémon (debounced):', error);
  }
}, 500);

const form = document.querySelector("form");
form.addEventListener("submit", (event)=>{
  event.preventDefault()
    const pageNoInput = document.getElementById('pageNumber');
  const pageNo = parseInt(pageNoInput.value, 10);

  if (!isNaN(pageNo)) {
    debounceFetchPokemons(pageNo);
  } else {
    console.error('Invalid page number:', pageNoInput.value);
  }
})

// const handleButtonClick = () => {
//   const pageNoInput = document.getElementById('pageNumber');
//   const pageNo = parseInt(pageNoInput.value, 10);

//   if (!isNaN(pageNo)) {
//     debounceFetchPokemons(pageNo);
//   } else {
//     console.error('Invalid page number:', pageNoInput.value);
//   }
// };

// document.getElementById('fetchPokemonButton').addEventListener('click', handleButtonClick);

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

// Función para mostrar los tiempos de llamada
const displayCallTimes = () => {
  const callTimesEl = document.getElementById("callTimes");
  let listItems = '';
  const lastTenCallTimes = callTimes.slice(-10);
  lastTenCallTimes.forEach((time, index) => {
    listItems += `<li class="flex w-4/5 justify-between text-xs"><span class="rounded-lg border px-2 py-0.5 hover:bg-gray-100">Llamada ${callTimes.length - lastTenCallTimes.length + index + 1}:</span> ${time}</li>`
    // listItems += `<li>Llamada ${index + 1}: ${time}</li>`;
  });
  callTimesEl.innerHTML = listItems;
};
