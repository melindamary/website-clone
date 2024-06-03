const API_KEY = "50a071ca06272cba916f4813b64e1ccd";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// Function to fetch TV shows by genre
async function fetchTVShowsByGenre(genreId) {
  const response = await fetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${genreId}`
  );
  const data = await response.json();
  return data.results;
}

// Function to fetch genre name
async function fetchGenreName(genreId) {
  const response = await fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`);
  const data = await response.json();
  const genre = data.genres.find((genre) => genre.id == genreId);
  return genre ? genre.name : "Unknown Genre";
}

// Function to generate TV show card
function generateTVShowCard(tvShow) {
  return `
    <div class="card">
        <img src="${IMAGE_BASE_URL}${tvShow.poster_path}" class="card-img-top" alt="${tvShow.name}" />
        <div class="details">
          <h6>First Episode Free</h6>
          <div id="buttons" class="d-flex flex-wrap flex-fill align-items-center">
            <button id="play-button" class="flex-wrap info-buttons border-circle me-1percent d-flex justify-content-center"></button>
            <button id="text-button" class="flex-wrap fs-15 fw-bold text-white me-5percent d-flex justify-content-center">Watch Now</button>
            <button id="watchlist-button" class="info-buttons border-circle bg-transparent-gray me-3percent d-flex justify-content-center"><span class="popup-text text-dark">Watchlist</span></button>
            <button id="trailer-button" class="flex-wrap info-buttons border-circle bg-transparent-gray me-1percent d-flex justify-content-center"><span class="popup-text text-dark">Watch Trailer</span></button>
          </div>
          <h5>${tvShow.name}</h5>
          <p>${
            tvShow.first_air_date.split("-")[0]
          } <span class="badge bg-secondary text-white">U/A 16+</span></p>
          <h5>#N in India</h5>
          <p>Season No - ${tvShow.overview.substring(0, 25)}...</p>
        </div>
      </div>
      `;
}

// Function to render TV show cards for a specific genre
  async function renderTVShowsForGenre(genreId) {
  const genreDetailContainer = document.getElementById("card-container");
  const genreNameContainer = document.getElementById("genre-name");

  // Fetch genre name
  const genreName = await fetchGenreName(genreId);
  genreNameContainer.innerText = genreName;

  // Fetch TV shows
  const tvShows = await fetchTVShowsByGenre(genreId);
  const tvShowCards = tvShows.map(generateTVShowCard).join("");
  genreDetailContainer.innerHTML = tvShowCards;
}

// Extract genreId from URL
const urlParams = new URLSearchParams(window.location.search);
const genreId = urlParams.get("genreId");

// Render TV show cards for the selected genre
if (genreId) {
  renderTVShowsForGenre(genreId);
}
