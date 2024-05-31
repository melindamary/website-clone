const apiKey = "68878f95957e5338131429885d26e879";
const genreId = 28;
const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&adult="false"`;
const imageBaseUrl = "http://image.tmdb.org/t/p/w1280";

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
	const videosUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&adult="false"`;

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
	const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genresQuery}&adult="false"`;
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
	const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_origin_country=IN&sort_by=popularity.desc&primary_release_year=2024&primary_release_date.lte=2024-05-29`;
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
	const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=${language}&adult="false"`;
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data.results;
	} catch (error) {
		console.error("Fetch operation error:", error);
		return [];
	}
}

//to dynamically create a card, first write a base html for it then in js using createelement card can be created
//set the class for it so that the styles can be applied and after dynamically creating the element append it
// so that it can be shown as a list.

function createMovieCard(movie) {
	const card = document.createElement("div");
	card.className = "card";
	card.style.width = "18rem";
	card.style.backgroundImage = `url(${imageBaseUrl}${movie.backdrop_path})`;
	card.style.backgroundSize = "cover";
	card.style.backgroundPosition = "center";
	card.style.color = "white";
	card.style.position = "relative";

	card.addEventListener("mouseenter", () => showCardDetails(movie, card));
	card.addEventListener("mouseleave", hideCardDetails);
	return card;
}

function showCardDetails(movie, card) {
	const cardDetails = document.createElement("div");
	cardDetails.className = "card-details";
	cardDetails.style.background = "black";
	cardDetails.style.color = "white"; // Ensure text is visible on black background

	const overviewFirstLine = movie.overview.split(".")[0];
	cardDetails.innerHTML = `
        <p>${movie.title}</p>
        <p>${overviewFirstLine}</p>
        <p>Rating: ${movie.vote_average}</p>
    `;

	// Position card details below the card
	const cardRect = card.getBoundingClientRect();
	cardDetails.style.top = `${cardRect.bottom + window.scrollY + 5}px`; // 10px margin
	cardDetails.style.left = `${cardRect.left + window.scrollX}px`;

	document.body.appendChild(cardDetails);
	card._cardDetails = cardDetails; // Store reference to the card details element
}

function hideCardDetails(event) {
	const card = event.currentTarget;
	const cardDetails = card._cardDetails;
	if (cardDetails) {
		document.body.removeChild(cardDetails);
		delete card._cardDetails; // Remove reference to the card details element
	}
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

async function topIndianMovies(containerId) {
	const container = document
		.getElementById(containerId)
		.querySelector(".d-flex");
	const movies = await fetchLatestMovies();

	container.innerHTML = "";

	movies.slice(0, 10).forEach((movie, index) => {
		const movieContainer = document.createElement("div");
		movieContainer.style.display = "flex";
		movieContainer.style.alignItems = "center";
		movieContainer.style.marginBottom = "10px";

		const numberElement = document.createElement("div");
		numberElement.className = "number";
		numberElement.textContent = index + 1;
		numberElement.style.marginRight = "10px";

		const card = createMovieCard(movie);

		movieContainer.appendChild(numberElement);
		movieContainer.appendChild(card);

		container.appendChild(movieContainer);
	});
}

document.addEventListener("DOMContentLoaded", async function () {
	const slideContainer = document.querySelector(".slide-container");

	const fetchMovies = async () => {
		const response = await fetch(
			`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`
		);
		const data = await response.json();
		return data.results;
	};

	const movies = await fetchMovies();

	slideContainer.innerHTML = "";

	movies.forEach((movie, index) => {
		const inputId = `c${index + 1}`;

		const inputElement = document.createElement("input");
		inputElement.type = "radio";
		inputElement.name = "slide";
		inputElement.id = inputId;
		if (index === 0) inputElement.checked = true;

		const labelElement = document.createElement("label");
		labelElement.htmlFor = inputId;
		labelElement.className = "slide-card";
		labelElement.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;
		labelElement.addEventListener("mouseenter", () => {
			labelElement.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`;
		});

		labelElement.addEventListener("mouseleave", () => {
			labelElement.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;
		});

		slideContainer.appendChild(inputElement);
		slideContainer.appendChild(labelElement);
	});
});

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
topIndianMovies("top-movies", "number");
fetchMovies();
