
const apiKey = 'dfeae97f270b6d300e2e881d950b308d';

        async function fetchMovies() {
            const options = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                }
            };

            try {
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`, options);
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }
                const data = await response.json();
                return data.results.slice(0, 6); 
            } catch (error) {
                console.error(error);
                
                return []; 
            }
        }

        async function displayMovies() {
            const movies = await fetchMovies();
            const cardContainer = document.getElementById('cardContainer');
            
            movies.forEach((movie, index) => {
                const newCard = document.createElement('div');
                newCard.classList.add('new-card');   
                const imageContainer = document.createElement('div');
                imageContainer.classList.add('image-container');
                
                const image = document.createElement('img');
                image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                image.alt = movie.title;
                
                const releaseDate = document.createElement('p');
                releaseDate.textContent = `Release Date: ${movie.release_date}`;
                releaseDate.classList.add('release-date');
                
                imageContainer.appendChild(image);
                imageContainer.appendChild(releaseDate);
                newCard.appendChild(imageContainer);

                // Additional card for hover effect
                const detailsCard = document.createElement('div');
                detailsCard.classList.add('details-card');
                detailsCard.innerHTML = `
                  <b>Title: ${movie.title}</b>
                  <p class="icon"><img src="https://m.media-amazon.com/images/G/01/digital/video/DVUI/favicons/favicon.png" alt="icon"><b>SUSCRIBE</b></p>

                  <p><strong>Release Date:</strong> ${movie.release_date}</p>
                  <p><strong>Description:</strong> ${movie.overview}</p>
                `;

                newCard.appendChild(detailsCard);
                cardContainer.appendChild(newCard);


                imageContainer.addEventListener('mouseenter', () => {
                  detailsCard.style.display = 'block';
              });
  
              imageContainer.addEventListener('mouseleave', () => {
                  detailsCard.style.display = 'none';
              });
  
              // Redirect to different pages on click
              newCard.addEventListener('click', () => {
                  window.location.href = `movie${index + 1}.html`; // Redirects to movie1.html, movie2.html, etc.
              });
          });
      }

       

        document.addEventListener('DOMContentLoaded', displayMovies);

(function() {
  async function fetchCartoons() {
    try {
      const response = await fetch('https://api.sampleapis.com/cartoons/cartoons2D');
      if (!response.ok) {
        throw new Error('Failed to fetch cartoons');
      }
      const data = await response.json();
  
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  function createCard(cartoon, index) {
    const cartoonCard = document.createElement('div');
    cartoonCard.classList.add('card');
    cartoonCard.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${cartoon.title}</h5>
        <p class="card-runtime">${cartoon.runtime_in_minutes}</p>
      </div>
    `;
    cartoonCard.addEventListener('click', () => showModal(index));
    return cartoonCard;
  }

  function showModal(cartoonIndex) {
    const cartoon = cartoons[cartoonIndex]; // Get the cartoon by index

    if (cartoon) {
      document.getElementById('modalCartoonTitle').textContent = cartoon.title;
      document.getElementById('modalCartoonDescription').textContent = cartoon.year|| 'No description available';
      document.getElementById('modalCartoonImage').src = cartoon.image || 'placeholder-image-url.png';

      $('#cartoonModal').modal('show');
    } else {
      console.error('Cartoon not found');
    }
  }

  async function displayCartoons() {
    const cartoonList = document.getElementById('cartoonList');

    try {
      cartoons = await fetchCartoons(); // Fetch cartoons and store in global variable
      cartoons.forEach((cartoon, index) => {
        const cartoonCard = createCard(cartoon, index);
        cartoonList.appendChild(cartoonCard);
      });
    } catch (error) {
      console.error(error);
      cartoonList.innerHTML = '<p>Failed to load cartoons.</p>';
    }
  }

  document.addEventListener('DOMContentLoaded', displayCartoons);
})();





async function fetchCharacters() {
  try {
    const response = await fetch('https://api.sampleapis.com/rickandmorty/characters');
    if (!response.ok) {
      throw new Error('Failed to fetch characters');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function createCard(character, index) {
  const characterCard = document.createElement('div');
  characterCard.classList.add('card');
  characterCard.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${character.name}</h5>
      <p class="card-description">Species: ${character.species}</p> 
    </div>
  `;
  characterCard.addEventListener('click', () => showModal(index));
  return characterCard;
}

function showModal(characterIndex) {
  const character = characters[characterIndex]; // Get the character by index

  if (character) {
    document.getElementById('modalCharacterName').textContent = character.name;
    document.getElementById('modalCharacterDescription').textContent = `Species: ${character.species}\nStatus: ${character.status}`;
    document.getElementById('modalCharacterImage').src = character.image || 'placeholder-image-url.png';
    
    $('#characterModal').modal('show');
  } else {
    console.error('Character not found');
  }
}

async function displayCharacters() {
  const characterList = document.getElementById('characterList');



  try {
    characters = await fetchCharacters(); // Fetch characters and store in global variable
    characters.forEach((character, index) => {
      const characterCard = createCard(character, index);
      characterList.appendChild(characterCard);
    });
  } catch (error) {
    console.error(error);
    characterList.innerHTML = '<p>Failed to load characters.</p>';
  }
}

document.addEventListener('DOMContentLoaded', displayCharacters);

let coffees = [];

// Fetch coffee data from the API
async function fetchCoffees() {
  try {
    const response = await fetch('https://api.sampleapis.com/coffee/hot');
    if (!response.ok) {
      throw new Error('Failed to fetch coffees');
    }
    const data = await response.json();
    return data.slice(0, 19); // Return only the first 19 coffee entries
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Create a card for each coffee
function createCoffeeCard(coffee, index) {
  const coffeeCard = document.createElement('div');
  coffeeCard.classList.add('card');
  coffeeCard.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${coffee.title}</h5>
    </div>
  `;
  coffeeCard.addEventListener('click', () => showCoffeeModal(index));
  return coffeeCard;
}

// Show the modal for the selected coffee
function showCoffeeModal(coffeeIndex) {
  const coffee = coffees[coffeeIndex]; // Get the coffee by index

  if (coffee) {
    document.getElementById('modalCoffeeTitle').textContent = coffee.title;
    document.getElementById('modalCoffeeDescription').textContent = coffee.description;
    document.getElementById('modalCoffeeImage').src = coffee.image || 'placeholder-image-url.png';
    
    $('#coffeeModal').modal('show');
  } else {
    console.error('Coffee not found');
  }
}

// Display the coffee cards
async function displayCoffees() {
  const coffeeList = document.getElementById('coffeeList');
  
  try {
    coffees = await fetchCoffees(); // Fetch coffees and store in global variable
    coffees.forEach((coffee, index) => { // Display only the fetched 19 coffees
      const coffeeCard = createCoffeeCard(coffee, index);
      coffeeList.appendChild(coffeeCard);
    });
  } catch (error) {
    console.error(error);
    coffeeList.innerHTML = '<p>Failed to load coffees.</p>';
  }
}

// Event listener to display coffees on DOM content loaded
document.addEventListener('DOMContentLoaded', displayCoffees);


(function() {
  async function fetchRecipes() {
    try {
      const response = await fetch('https://api.sampleapis.com/recipes/recipes');
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await response.json();
      return data.slice(0, 19); // Only take the first 19 recipes
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  function createCard(recipe, index) {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('card');
    recipeCard.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${recipe.title}</h5>
      </div>
    `;
    recipeCard.addEventListener('click', () => showModal(index));
    return recipeCard;
  }

  function showModal(recipeIndex) {
    const recipe = recipes[recipeIndex]; // Get the recipe by index

    if (recipe) {
      document.getElementById('modalRecipeTitle').textContent = recipe.title;
      document.getElementById('modalRecipeDescription').textContent = recipe.tags || 'No description available';
      document.getElementById('modalRecipeImage').src = recipe.photoUrl || 'placeholder-image-url.png';

      $('#recipeModal').modal('show');
    } else {
      console.error('Recipe not found');
    }
  }

  async function displayRecipes() {
    const recipeList = document.getElementById('recipeList');

    try {
      recipes = await fetchRecipes(); // Fetch recipes and store in global variable
      recipes.forEach((recipe, index) => {
        const recipeCard = createCard(recipe, index);
        recipeList.appendChild(recipeCard);
      });
    } catch (error) {
      console.error(error);
      recipeList.innerHTML = '<p>Failed to load recipes.</p>';
    }
  }

  document.addEventListener('DOMContentLoaded', displayRecipes);
})();

(function() {
  async function fetchBeers() {
    try {
      const response = await fetch('https://api.sampleapis.com/beers/ale');
      if (!response.ok) {
        throw new Error('Failed to fetch beers');
      }
      const data = await response.json();
      return data.slice(0, 19); // Only take the first 19 beers
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  function createCard(beer, index) {
    const beerCard = document.createElement('div');
    beerCard.classList.add('card');
    beerCard.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${beer.name}</h5>
      </div>
    `;
    beerCard.addEventListener('click', () => showModal(index));
    return beerCard;
  }

  function showModal(beerIndex) {
    const beer = beers[beerIndex]; // Get the beer by index

    if (beer) {
      document.getElementById('modalBeerTitle').textContent = beer.name;
      document.getElementById('modalBeerDescription').textContent = beer.description || 'No description available';
      document.getElementById('modalBeerImage').src = beer.image || 'placeholder-image-url.png';

      $('#beerModal').modal('show');
    } else {
      console.error('Beer not found');
    }
  }

  async function displayBeers() {
    const beerList = document.getElementById('beerList');

    try {
      beers = await fetchBeers(); // Fetch beers and store in global variable
      beers.forEach((beer, index) => {
        const beerCard = createCard(beer, index);
        beerList.appendChild(beerCard);
      });
    } catch (error) {
      console.error(error);
      beerList.innerHTML = '<p>Failed to load beers.</p>';
    }
  }

  document.addEventListener('DOMContentLoaded', displayBeers);
})();

(function() {
  async function fetchResources() {
    try {
      const response = await fetch('https://api.sampleapis.com/codingresources/codingResources');
      if (!response.ok) {
        throw new Error('Failed to fetch resources');
      }
      const data = await response.json();
      return data.slice(0, 19); // Only take the first 19 resources
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  function createCard(resource, index) {
    const resourceCard = document.createElement('div');
    resourceCard.classList.add('card');
    resourceCard.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${resource.title}</h5>
        <p class="card-description">${resource.description || 'No description available'}</p>
        <span class="card-category">${resource.category || 'Category not available'}</span>
      </div>
    `;
    resourceCard.addEventListener('click', () => showModal(index));
    return resourceCard;
  }

  function showModal(resourceIndex) {
    const resource = resources[resourceIndex]; // Get the resource by index

    if (resource) {
      document.getElementById('modalResourceTitle').textContent = resource.topics;
      document.getElementById('modalResourceDescription').textContent = resource.description || 'No description available';
      document.getElementById('modalResourceImage').src = resource.image || 'placeholder-image-url.png';

      $('#resourceModal').modal('show');
    } else {
      console.error('Resource not found');
    }
  }

  async function displayResources() {
    const resourceList = document.getElementById('resourceList');

    try {
      resources = await fetchResources(); // Fetch resources and store in global variable
      resources.forEach((resource, index) => {
        const resourceCard = createCard(resource, index);
        resourceList.appendChild(resourceCard);
      });
    } catch (error) {
      console.error(error);
      resourceList.innerHTML = '<p>Failed to load resources.</p>';
    }
  }

  document.addEventListener('DOMContentLoaded', displayResources);
})();
