const apiKey = "68878f95957e5338131429885d26e879";
const genreId = 28;
const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
const imageBaseUrl = "http://image.tmdb.org/t/p/w500";

async function fetchMovies() {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		console.log(data.results);
		populateCarousel(data.results);
		fetchli(data.results);
	} catch (error) {
		console.error("Fetch operation error:", error);
	}
}

const fetchli = (movies) => {
	const indicatorsContainer = document.querySelector(".carousel-indicators");

	indicatorsContainer.innerHTML = "";

	movies.forEach((movie, index) => {
		if (index < 10) {
			const indicator = document.createElement("li");
			indicator.setAttribute("data-target", "#demo");
			indicator.setAttribute("data-slide-to", index);

			if (index === 0) {
				indicator.classList.add("active");
			}

			indicatorsContainer.appendChild(indicator);
		}
	});
};

function populateCarousel(movies) {
	const carouselInner = document.getElementById("carousel-inner");
	const template = document.querySelector(".carousel-item.template");

	carouselInner.innerHTML = "";

	movies.forEach((movie, index) => {
		if (index < 10) {
			const trailerUrl = fetchTrailer(movie.id);
			setupCarousel(trailerUrl);
			const carouselItem = template.cloneNode(true);
			carouselItem.classList.remove("template");
			if (index === 0) carouselItem.classList.add("active");

			carouselItem.querySelector(
				".carousel-image"
			).src = `${imageBaseUrl}${movie.backdrop_path}`;
			carouselItem.querySelector(".carousel-image").alt = movie.title;
			carouselItem.querySelector(".movie-carousel-name").textContent =
				movie.title;

			carouselInner.appendChild(carouselItem);
		}
	});
}

async function fetchTrailer(movieId) {
	const videosUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;

	try {
		const response = await fetch(videosUrl);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		const trailers = data.results.filter(
			(video) => video.type === "Trailer" && video.site === "YouTube"
		);

		return trailers.length > 0
			? `https://www.youtube.com/watch?v=${trailers[0].key}`
			: null;
	} catch (error) {
		console.error(`Error fetching data: ${error}`);
		return null;
	}
}

async function setupCarousel(trailerUrl) {
	const carouselInner = document.getElementById("carousel-inner");
	const template = document.querySelector(".carousel-item.template");

	const newItem = template.cloneNode(true);
	newItem.classList.remove("template");
	newItem.classList.add("active");

	const videoElement = newItem.querySelector(".carousel-video");
	const imageElement = newItem.querySelector(".carousel-image");

	if (trailerUrl) {
		videoElement.src = trailerUrl;
		videoElement.classList.remove("d-none");
		imageElement.classList.add("d-none");

		videoElement.addEventListener("ended", () => {
			videoElement.classList.add("d-none");
			imageElement.classList.remove("d-none");
		});
	} else {
		videoElement.classList.add("d-none");
	}

	imageElement.src = imageBaseUrl;

	carouselInner.appendChild(newItem);
}

async function fetchMoviesByGenre(...genreId) {
	const genresQuery = genreId.join(",");
	const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genresQuery}`;
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data.results;
	} catch (error) {
		console.error("Fetch operation error:", error);
		return [];
	}
}

async function fetchLatestMovies() {
	const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
	try {
		const response = await fetch(url);
		const data = await response.json();
		console.log(data);
		return data.results;
	} catch (error) {
		console.error("Fetch operation error:", error);
		return [];
	}
}

async function fetchMoviesByLanguage(language) {
	const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=${language}`;
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data.results;
	} catch (error) {
		console.error("Fetch operation error:", error);
		return [];
	}
}

function createMovieCard(movie) {
	const card = document.createElement("div");
	card.className = "card";
	card.style.width = "18rem";

	const img = document.createElement("img");
	img.className = "card-img-top";
	img.src = `${imageBaseUrl}${movie.poster_path}`;
	img.alt = movie.title;

	const cardDetails = document.createElement("div");
	cardDetails.className = "card-details";
	cardDetails.innerHTML = `
		<p>${movie.title}</p>
        <p>${movie.overview}</p>
        <p>Rating: ${movie.vote_average}</p>
    `;

	card.appendChild(img);
	card.appendChild(cardDetails);
	return card;
}

async function populateSection(containerId, genreId) {
	const container = document
		.getElementById(containerId)
		.querySelector(".d-flex");
	const movies = await fetchMoviesByGenre(genreId);

	container.innerHTML = "";

	movies.forEach((movie) => {
		const card = createMovieCard(movie);
		container.appendChild(card);
	});
}

async function populateSectionLanguage(containerId) {
	const container = document
		.getElementById(containerId)
		.querySelector(".d-flex");
	const movies = await fetchMoviesByLanguage("en");

	container.innerHTML = "";

	movies.forEach((movie) => {
		const card = createMovieCard(movie);
		container.appendChild(card);
	});
}

async function populateSectionLatestMovies(containerId) {
	const container = document
		.getElementById(containerId)
		.querySelector(".d-flex");
	const movies = await fetchLatestMovies();

	container.innerHTML = "";

	movies.forEach((movie) => {
		const card = createMovieCard(movie);
		container.appendChild(card);
	});
}

populateSection("action-adventure-movies", 12, 28);
populateSectionLanguage("english-movies");
populateSection("drama-movies", 18);
populateSectionLatestMovies("latest-movies");
populateSection("mystery-movies", 9648, 53);
populateSection("romance-movies", 10749);
populateSection("comedy-movies", 35);
populateSection("horror-movies", 27);
populateSection("history-movies", 36);
populateSection("family-movies", 10751);
populateSection("fantasy-movies", 14);
populateSection("war-movies", 10752);
populateSection("fiction-movies", 878);
populateSection("western-movies", 37);
populateSection("documentaries", 99);
fetchMovies();
