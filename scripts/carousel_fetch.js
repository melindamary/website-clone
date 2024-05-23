const apiKey = "68878f95957e5338131429885d26e879";
const genreId = 28;
const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`;
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

fetchMovies();
