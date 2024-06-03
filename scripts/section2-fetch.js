const API_KEY = "50a071ca06272cba916f4813b64e1ccd";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// Fetch genres
async function fetchGenres() {
  const response = await fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`);
  const data = await response.json();
  return data.genres;
}

// Fetch TV shows by genre
async function fetchTVShowsByGenre(genreId) {
  const response = await fetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${genreId}`
  );
  const data = await response.json();
  return data.results;
}

// Generate TV show card
function generateTVShowCard(tvShow) {
  return `
    <div class="card">
    <img src="${IMAGE_BASE_URL}${tvShow.poster_path}" class="poster" alt="${
    tvShow.name
  }"/>
    <div class="details-display">
                <div class="details">
                  <h6>First Episode Free</h6>
                  <div
                    id="buttons"
                    class="d-flex flex-wrap flex-fill align-items-center"
                  >
                    <button
                      id="play-button"
                      class="card-btn flex-wrap info-buttons border-circle me-1percent d-flex justify-content-center"
                    ></button>
                    <button
                      id="text-button"
                      class="flex-wrap fs-15 fw-bold text-white me-5percent d-flex justify-content-center"
                    >
                      Watch Now
                    </button>
                    <button
                      id="watchlist-button"
                      class="info-buttons border-circle bg-transparent-gray me-3percent d-flex justify-content-center"
                    ><span class="popup-text text-dark">Watchlist</span></button>
                    <button
                      id="trailer-button"
                      class="flex-wrap info-buttons border-circle bg-transparent-gray me-1percent d-flex justify-content-center"
                    ><span class="popup-text text-dark">Watch Trailer</span></button>
                  </div>
        <h5>${tvShow.name}</h5>
        <p>${
          tvShow.first_air_date.split("-")[0]
        } <span class="badge bg-secondary text-white">U/A 16+</span></p>
        <h5>#1 in India</h5>
        <p class="text-wrap">Season 1 - ${tvShow.overview.substring(
          0,
          110
        )}...</p>
      </div>
      </div>
    </div>
  `;
}

// Generate genre section
function generateGenreSection(genreName, tvShows, genreId) {
  const tvShowCards = tvShows.map(generateTVShowCard).join("");
  return `
      <h5>
        <div class="genreHeading">
          <span style="color: #1a98ff">Prime</span>
          <span class="genreName" style="color: white">
            ${genreName}
            <a href="tvseemore_page.html?genreId=${genreId}" style="text-decoration: none; color: white">See More ></a>
          </span>
        </div>
      </h5>
      <div class="slider-container">
        <button class="nav-button prev" id="prevBtn">&#10094;</button>
        <div class="slider" id="slider">
          <div class="card-container">
        ${tvShowCards}
        </div>
        </div>
        <button class="nav-button next" id="nextBtn">&#10095;</button>
      </div>
  `;
}

// Render genres and TV shows
async function renderGenresAndTVShows() {
  const genresContainer = document.getElementById("genres-container");
  const genres = await fetchGenres();

  for (const genre of genres) {
    const tvShows = await fetchTVShowsByGenre(genre.id);
    const genreSection = generateGenreSection(genre.name, tvShows, genre.id);
    genresContainer.innerHTML += genreSection;
  }

  // Add event listener to "See More" links (after rendering)
  document.querySelectorAll(".genreName a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const genreId = link.getAttribute("href").split("=")[1];
      window.location.href = `tvseemore_page.html?genreId=${genreId}`;
    });
  });
}

// Initial rendering
renderGenresAndTVShows();
