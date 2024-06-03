import { apiKey, url, imageBaseUrl } from "./config";
import { Movie } from "./types/movies";
import { CardHtmlElement } from "./types/movies";

//navbar
const hamburgerElement = document.getElementById("hamburger");
if (hamburgerElement) {
	hamburgerElement.onclick = function () {
		const menu = document.getElementById("menu");
		menu?.classList.toggle("show");
	};
}

//carousel

async function fetchMovies() {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		populateCarousel(data.results);
		fetchli(data.results);
	} catch (error) {
		console.error("Fetch operation error:", error);
	}
}

const fetchli = (movies: Movie[]) => {
	const indicatorsContainer = document.querySelector(".carousel-indicators");
	if (!indicatorsContainer) return;

	indicatorsContainer.innerHTML = "";

	movies.forEach((_movie, index) => {
		if (index < 10) {
			const indicator = document.createElement("li");
			indicator.setAttribute("data-target", "#demo");
			indicator.setAttribute("data-slide-to", index.toString());

			if (index === 0) {
				indicator.classList.add("active");
			}

			indicatorsContainer.appendChild(indicator);
		}
	});
};

function populateCarousel(movies: Movie[]) {
	const carouselInner = document.getElementById("carousel-inner");
	const template = document.querySelector(".carousel-item.template");
	if (!carouselInner || !template) return;

	carouselInner.innerHTML = "";

	movies.forEach((movie, index) => {
		if (index < 10) {
			// setupCarousel(movie.id); // todo
			const carouselItem = template.cloneNode(true) as HTMLDivElement;
			carouselItem.classList.remove("template");
			if (index === 0) carouselItem.classList.add("active");

			const carouselItemImage = carouselItem.querySelector(
				".carousel-image"
			) as HTMLImageElement;

			if (!carouselItemImage) return;

			carouselItemImage.src = `${imageBaseUrl}${movie.backdrop_path}`;
			carouselItemImage.alt = movie.title;

			const carouselItemMovieTitle = carouselItem.querySelector(
				".movie-carousel-name"
			);

			if (!carouselItemMovieTitle) return;

			carouselItemMovieTitle.textContent = movie.title;

			setupCarousel(movie, carouselItem);
			carouselInner.appendChild(carouselItem);

			const moreDetails = document.getElementById("more-details-button");
			if (!moreDetails) return;

			moreDetails.addEventListener("click", (event) => {
				event.preventDefault();
				window.location.href = `./movie-info-design.html?movieId=${movie.id}`;
			});
		}
	});
}

async function fetchTrailer(movieId: number): Promise<string> {
	const videosUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&adult=false`;

	try {
		const response = await fetch(videosUrl);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = (await response.json()) as { results: any[] }; //toDo

		const trailers = data.results.filter(
			(video) => video.type === "Trailer" && video.site === "YouTube"
		);

		return trailers.length > 0
			? `https://www.youtube.com/embed/${trailers[0].key}?autoplay=1`
			: "";
	} catch (error) {
		console.error(`Error fetching data: ${error}`);
		return "";
	}
}

async function setupCarousel(movie: Movie, carouselItem: HTMLDivElement) {
	const videoElement = carouselItem.querySelector(
		".carousel-video"
	) as HTMLIFrameElement;
	const trailerUrl = await fetchTrailer(movie.id);
	if (!videoElement) return;

	carouselItem.style.backgroundImage = `url(${imageBaseUrl}${movie.backdrop_path})`;
	const carouselItemMovieTitle = carouselItem.querySelector(
		".movie-carousel-name"
	);
	if (!carouselItemMovieTitle) return;
	carouselItemMovieTitle.textContent = movie.title;

	if (trailerUrl) {
		carouselItem.addEventListener("mouseenter", () => {
			videoElement.src = trailerUrl;
			videoElement.classList.remove("d-none");
			carouselItem.style.backgroundImage = "none";
		});

		carouselItem.addEventListener("mouseleave", () => {
			videoElement.src = "";
			videoElement.classList.add("d-none");
			carouselItem.style.backgroundImage = `url(${imageBaseUrl}${movie.backdrop_path})`;
		});
	} else {
		videoElement.classList.add("d-none");
	}
}

//fetch based on genre

async function fetchMoviesByGenre(...genreId: number[]): Promise<Movie[]> {
	const genresQuery = genreId.join(",");
	const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genresQuery}&adult="false"`;
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data.results as Movie[];
	} catch (error) {
		console.error("Fetch operation error:", error);
		return [];
	}
}

async function fetchLatestMovies(): Promise<Movie[]> {
	const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_origin_country=IN&sort_by=popularity.desc&primary_release_year=2024&primary_release_date.lte=2024-05-29`;
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data.results as Movie[];
	} catch (error) {
		console.error("Fetch operation error:", error);
		return [];
	}
}

async function fetchMoviesByLanguage(language: string): Promise<Movie[]> {
	const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=${language}&adult="false"`;
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data.results as Movie[];
	} catch (error) {
		console.error("Fetch operation error:", error);
		return [];
	}
}

function generateCarousel(movie: Movie) {
	return `
        <div id="top-10-carousel" class="carousel slide h-10 p-3 ml-3 mr-3 " data-ride="carousel">
            <ul class="carousel-indicators">
            </ul>
            <div class="carousel-inner rounded" id="carousel-inner">
                <div style="height:25rem;">
                    <img class="carousel-image" src="${imageBaseUrl}${movie.backdrop_path}" alt="${movie.title}">
                    <div class="carousel-caption p-3 pt-5 ">
                        <div class="info text-left pl-3">
                            <div class="row mb-3">
                                <div class="col-12">
                                    <h6 class="carousel-rank">#1 in India</h6>
                                </div>
                            </div>
                            <div class="row mb-5">
                                <div class="col-12">
                                    <h4 class="movie-carousel-name">${movie.title}</h4>
                                </div>
                            </div>
						
                            <div class="row pt-4">
							<svg class="fbl-icon _3UMk3x _1a_Ljt _3H1cN4" viewBox="0 0 24 24" height="24" width="24"
							role="img" aria-hidden="true" style="margin-right: -0.6rem;">
							<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M11.120 2.039 C 8.641 2.287,6.414 3.362,4.761 5.107 C 1.806 8.228,1.158 12.819,3.137 16.623 C 3.620 17.552,4.164 18.288,4.938 19.061 C 5.930 20.051,7.038 20.789,8.272 21.278 C 11.634 22.610,15.313 22.080,18.200 19.845 C 18.637 19.507,19.507 18.637,19.845 18.200 C 21.256 16.378,22.000 14.236,22.000 12.000 C 22.000 7.432,18.842 3.387,14.430 2.303 C 13.446 2.062,12.028 1.948,11.120 2.039 M17.092 8.191 C 17.410 8.341,17.660 8.592,17.816 8.920 C 17.926 9.151,17.940 9.221,17.940 9.541 C 17.940 9.869,17.928 9.927,17.805 10.181 C 17.679 10.443,17.480 10.651,14.545 13.588 C 11.578 16.558,11.406 16.723,11.140 16.848 C 10.888 16.967,10.824 16.980,10.500 16.980 C 10.176 16.980,10.112 16.967,9.860 16.848 C 9.604 16.726,9.466 16.600,8.193 15.328 C 6.915 14.051,6.794 13.918,6.672 13.660 C 6.554 13.408,6.540 13.344,6.540 13.020 C 6.540 12.700,6.554 12.631,6.664 12.400 C 6.821 12.070,7.070 11.821,7.400 11.664 C 7.631 11.554,7.700 11.540,8.020 11.540 C 8.343 11.540,8.408 11.554,8.654 11.670 C 8.891 11.782,9.036 11.907,9.714 12.578 L 10.500 13.356 13.020 10.843 C 15.629 8.240,15.687 8.188,16.110 8.081 C 16.380 8.013,16.817 8.061,17.092 8.191 "
									fill="#1A98FF" stroke="none" fill-rule="evenodd"></path>
							</svg>
						</svg>
                                <div class="col-auto">
                                    <p class="mb-0 mb-md-2 ">Watch with a Prime membership</p>
                                </div>
                                <div class="col" style="margin-top: 0.1rem;">
                                    <p class="mb-0 d-none d-md-block fw-bold"><span class="px-2 py-1 rounded"
                                            style="background-color: #33373d;">U/A 13+</span></p>
                                </div>
                            </div>
                            <div class="row d-flex align-items-center ">
                                <div class="col-auto">
                                    <a class="btn more-details-button p-3 d-none d-md-block"
                                        style="font-size: 1.3rem;" href="movie-info-design.html?movieId=${movie.id}">More details</a>
                                </div>
                                <div class="col-auto mt-2">
                                    <a href="#"
                                        class="custom-plus-size text-white text-decoration-none d-none d-md-block rounded-circle plus"
                                        style="width: 60px; height: 60px; font-size: 2rem; line-height: 1; background-color: #33373d; padding: 0.2rem; display: flex; justify-content: center; align-items: center;">
                                        <svg width="30" height="30" viewBox="0 0 8 8" fill="none"
                                            xmlns="http://www.w3.org/2000/svg" style="margin-left: 12px; margin-top: 10px;">
                                            <path
                                                d="M4 0C4.13261 0 4.25979 0.0526785 4.35355 0.146447C4.44732 0.240215 4.5 0.367392 4.5 0.5V3.5H7.5C7.63261 3.5 7.75979 3.55268 7.85355 3.64645C7.94732 3.74021 8 3.86739 8 4C8 4.13261 7.94732 4.25979 7.85355 4.35355C7.75979 4.44732 7.63261 4.5 7.5 4.5H4.5V7.5C4.5 7.63261 4.44732 7.75979 4.35355 7.85355C4.25979 7.94732 4.13261 8 4 8C3.86739 8 3.74021 7.94732 3.64645 7.85355C3.55268 7.75979 3.5 7.63261 3.5 7.5V4.5H0.5C0.367392 4.5 0.240215 4.44732 0.146447 4.35355C0.0526785 4.25979 0 4.13261 0 4C0 3.86739 0.0526785 3.74021 0.146447 3.64645C0.240215 3.55268 0.367392 3.5 0.5 3.5H3.5V0.5C3.5 0.367392 3.55268 0.240215 3.64645 0.146447C3.74021 0.0526785 3.86739 0 4 0Z"
                                                fill="white" />
                                        </svg>
										<span class="tooltip">Watchlist</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createMovieCard(flag: string, movie: Movie, id: number = 0) {
	const card = document.createElement("div") as CardHtmlElement;
	card.className = "card";
	card.style.width = "18rem";
	card.style.backgroundImage = `url(${imageBaseUrl}${movie.backdrop_path})`;
	card.style.backgroundSize = "cover";
	card.style.backgroundPosition = "center";
	card.style.color = "white";
	card.style.position = "relative";
	if (id != 1) {
		card.addEventListener("mouseenter", () =>
			showCardDetails(flag, movie, card)
		);
		card.addEventListener("mouseleave", hideCardDetails);
	}
	return card;
}

function showCardDetails(flag: string, movie: Movie, card: CardHtmlElement) {
	const cardDetails = document.createElement("div") as CardHtmlElement;
	cardDetails.className = "card-details";
	cardDetails.style.background = "black";
	cardDetails.style.color = "white";
	cardDetails.style.padding = "10px";

	const overviewFirstLine = movie.overview.split(".")[0];
	if (flag === "n") {
		cardDetails.innerHTML = `
	<div class="col-auto">
		<div class="card-details-header" style="display: flex; justify-content: space-between; align-items: center;">
			<p class="mb-0 mb-md-2" style="font-weight:normal;font-size:0.9rem;">
			<svg class="fbl-icon _3UMk3x _1a_Ljt _3H1cN4" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true">
			<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M11.120 2.039 C 8.641 2.287,6.414 3.362,4.761 5.107 C 1.806 8.228,1.158 12.819,3.137 16.623 C 3.620 17.552,4.164 18.288,4.938 19.061 C 5.930 20.051,7.038 20.789,8.272 21.278 C 11.634 22.610,15.313 22.080,18.200 19.845 C 18.637 19.507,19.507 18.637,19.845 18.200 C 21.256 16.378,22.000 14.236,22.000 12.000 C 22.000 7.432,18.842 3.387,14.430 2.303 C 13.446 2.062,12.028 1.948,11.120 2.039 M17.092 8.191 C 17.410 8.341,17.660 8.592,17.816 8.920 C 17.926 9.151,17.940 9.221,17.940 9.541 C 17.940 9.869,17.928 9.927,17.805 10.181 C 17.679 10.443,17.480 10.651,14.545 13.588 C 11.578 16.558,11.406 16.723,11.140 16.848 C 10.888 16.967,10.824 16.980,10.500 16.980 C 10.176 16.980,10.112 16.967,9.860 16.848 C 9.604 16.726,9.466 16.600,8.193 15.328 C 6.915 14.051,6.794 13.918,6.672 13.660 C 6.554 13.408,6.540 13.344,6.540 13.020 C 6.540 12.700,6.554 12.631,6.664 12.400 C 6.821 12.070,7.070 11.821,7.400 11.664 C 7.631 11.554,7.700 11.540,8.020 11.540 C 8.343 11.540,8.408 11.554,8.654 11.670 C 8.891 11.782,9.036 11.907,9.714 12.578 L 10.500 13.356 13.020 10.843 C 15.629 8.240,15.687 8.188,16.110 8.081 C 16.380 8.013,16.817 8.061,17.092 8.191 " fill="#1A98FF" stroke="none" fill-rule="evenodd"></path>
			</svg>
			</svg>
				Watch with a Prime membership</p>
		
		</div>
		<div style="display: flex; justify-content: space-between; align-items: center;">
			<p style="margin: 0;">${movie.title}</p>
			<div class="button-group" style="display: flex; gap: 10px;">
				<a href="#" class="custom-plus-size text-white text-decoration-none rounded-circle" style="width: 39px; height: 39px; font-size: 2rem; line-height: 1; background-color: #33373d; padding: 0.2rem; display: flex; justify-content: center; align-items: center;">
					<svg width="18" height="18" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M4 0C4.13261 0 4.25979 0.0526785 4.35355 0.146447C4.44732 0.240215 4.5 0.367392 4.5 0.5V3.5H7.5C7.63261 3.5 7.75979 3.55268 7.85355 3.64645C7.94732 3.74021 8 3.86739 8 4C8 4.13261 7.94732 4.25979 7.85355 4.35355C7.75979 4.44732 7.63261 4.5 7.5 4.5H4.5V7.5C4.5 7.63261 4.44732 7.75979 4.35355 7.85355C4.25979 7.94732 4.13261 8 4 8C3.86739 8 3.74021 7.94732 3.64645 7.85355C3.55268 7.75979 3.5 7.63261 3.5 7.5V4.5H0.5C0.367392 4.5 0.240215 4.44732 0.146447 4.35355C0.0526785 4.25979 0 4.13261 0 4C0 3.86739 0.0526785 3.74021 0.146447 3.64645C0.240215 3.55268 0.367392 3.5 0.5 3.5H3.5V0.5C3.5 0.367392 3.55268 0.240215 3.64645 0.146447C3.74021 0.0526785 3.86739 0 4 0Z" fill="white" />
					</svg>
				</a>
				<a href="#" class="custom-play-button text-white text-decoration-none rounded-circle" style="width: 40px; height: 40px; font-size: 2rem; line-height: 1; background-color: #33373d; padding: 0.2rem; display: flex; justify-content: center; align-items: center;">
					<svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" >
						<path d="M6.79 5.09294C6.71524 5.0397 6.62726 5.00808 6.53572 5.00152C6.44418 4.99497 6.35259 5.01373 6.27101 5.05576C6.18942 5.0978 6.12098 5.16147 6.07317 5.23982C6.02537 5.31817 6.00006 5.40816 6 5.49994V10.4999C6.00006 10.5917 6.02537 10.6817 6.07317 10.7601C6.12098 10.8384 6.18942 10.9021 6.27101 10.9441C6.35259 10.9861 6.44418 11.0049 6.53572 10.9984C6.62726 10.9918 6.71524 10.9602 6.79 10.9069L10.29 8.40694C10.3548 8.36068 10.4076 8.29962 10.4441 8.22883C10.4806 8.15804 10.4996 8.07956 10.4996 7.99994C10.4996 7.92031 10.4806 7.84184 10.4441 7.77104C10.4076 7.70025 10.3548 7.63919 10.29 7.59294L6.79 5.09294Z" fill="white"/>
						<path d="M0 4C0 3.46957 0.210714 2.96086 0.585786 2.58579C0.960859 2.21071 1.46957 2 2 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V12C16 12.5304 15.7893 13.0391 15.4142 13.4142C15.0391 13.7893 14.5304 14 14 14H2C1.46957 14 0.960859 13.7893 0.585786 13.4142C0.210714 13.0391 0 12.5304 0 12V4ZM15 4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H2C1.73478 3 1.48043 3.10536 1.29289 3.29289C1.10536 3.48043 1 3.73478 1 4V12C1 12.2652 1.10536 12.5196 1.29289 12.7071C1.48043 12.8946 1.73478 13 2 13H14C14.2652 13 14.5196 12.8946 14.7071 12.7071C14.8946 12.5196 15 12.2652 15 12V4Z" fill="white"/>
					</svg>
				</a>
			</div>
		</div>
	<p style="color: #AAAAAA;">${overviewFirstLine}</p>
        <p>Rating: ${movie.vote_average}</p>
	</div>
	`;
	} else {
		cardDetails.innerHTML = `
	<div class="col-auto">
	<div style="display: flex; align-items: center;">
	<svg class="fbl-icon _3UMk3x _1a_Ljt NbhXwl" viewBox="0 0 24 24" height="20" width="20" role="img" aria-hidden="true"><title>Store Filled</title><svg width="24" height="24" fill="yellow" xmlns="http://www.w3.org/2000/svg"><path d="M9.503 2.041 C 8.483 2.217,7.556 2.976,7.202 3.925 C 7.027 4.393,7.001 4.639,7.001 5.849 L 7.000 6.998 4.869 7.009 L 2.738 7.020 2.539 7.122 C 2.312 7.239,2.102 7.491,2.040 7.720 C 2.011 7.828,2.002 9.427,2.011 12.809 C 2.024 17.275,2.031 17.766,2.092 18.013 C 2.358 19.085,2.821 19.909,3.550 20.605 C 4.122 21.152,4.727 21.515,5.465 21.754 C 6.194 21.990,5.896 21.980,12.000 21.980 C 18.104 21.980,17.806 21.990,18.535 21.754 C 20.034 21.268,21.241 20.077,21.737 18.593 C 21.990 17.837,21.974 18.211,21.989 12.804 C 22.004 7.245,22.024 7.622,21.702 7.300 C 21.400 6.998,21.420 7.000,19.073 7.000 L 17.000 7.000 17.000 5.858 C 17.000 4.609,16.970 4.349,16.766 3.849 C 16.499 3.193,15.964 2.633,15.296 2.312 C 14.674 2.013,14.813 2.026,12.120 2.016 C 10.789 2.011,9.611 2.023,9.503 2.041 M14.340 4.066 C 14.593 4.153,14.847 4.407,14.934 4.660 C 14.989 4.822,15.000 5.033,15.000 5.927 L 15.000 7.000 16.000 7.000 L 17.000 7.000 17.000 9.573 C 17.000 12.477,17.008 12.394,16.701 12.701 C 16.521 12.881,16.242 13.000,16.000 13.000 C 15.758 13.000,15.479 12.881,15.299 12.701 C 14.992 12.394,15.000 12.477,15.000 9.573 L 15.000 7.000 12.000 7.000 L 9.000 7.000 9.000 9.573 C 9.000 12.477,9.008 12.394,8.701 12.701 C 8.310 13.092,7.690 13.092,7.299 12.701 C 6.992 12.394,7.000 12.477,7.000 9.573 L 7.000 7.000 8.000 7.000 L 9.000 7.000 9.000 5.927 C 9.000 4.691,9.021 4.577,9.300 4.298 C 9.596 4.002,9.550 4.007,11.983 4.003 C 13.897 4.000,14.168 4.008,14.340 4.066 " fill="yellow" stroke="none" fill-rule="evenodd"></path></svg>
	</svg>
	<p style="margin-left:0.5rem; font-size:1rem" class="text-warning"> Available for Rent</p>
	
	</div>
		
		<div style="display: flex; justify-content: space-between; align-items: center;">
			<p style="margin: 0;">${movie.title}</p>
			<div class="button-group" style="display: flex; gap: 10px;">
				<a href="#" class="custom-plus-size text-white text-decoration-none rounded-circle" style="width: 39px; height: 39px; font-size: 2rem; line-height: 1; background-color: #33373d; padding: 0.2rem; display: flex; justify-content: center; align-items: center;">
					<svg width="18" height="18" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M4 0C4.13261 0 4.25979 0.0526785 4.35355 0.146447C4.44732 0.240215 4.5 0.367392 4.5 0.5V3.5H7.5C7.63261 3.5 7.75979 3.55268 7.85355 3.64645C7.94732 3.74021 8 3.86739 8 4C8 4.13261 7.94732 4.25979 7.85355 4.35355C7.75979 4.44732 7.63261 4.5 7.5 4.5H4.5V7.5C4.5 7.63261 4.44732 7.75979 4.35355 7.85355C4.25979 7.94732 4.13261 8 4 8C3.86739 8 3.74021 7.94732 3.64645 7.85355C3.55268 7.75979 3.5 7.63261 3.5 7.5V4.5H0.5C0.367392 4.5 0.240215 4.44732 0.146447 4.35355C0.0526785 4.25979 0 4.13261 0 4C0 3.86739 0.0526785 3.74021 0.146447 3.64645C0.240215 3.55268 0.367392 3.5 0.5 3.5H3.5V0.5C3.5 0.367392 3.55268 0.240215 3.64645 0.146447C3.74021 0.0526785 3.86739 0 4 0Z" fill="white" />
					</svg>
				</a>
				<a href="#" class="custom-play-button text-white text-decoration-none rounded-circle" style="width: 40px; height: 40px; font-size: 2rem; line-height: 1; background-color: #33373d; padding: 0.2rem; display: flex; justify-content: center; align-items: center;">
					<svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" >
						<path d="M6.79 5.09294C6.71524 5.0397 6.62726 5.00808 6.53572 5.00152C6.44418 4.99497 6.35259 5.01373 6.27101 5.05576C6.18942 5.0978 6.12098 5.16147 6.07317 5.23982C6.02537 5.31817 6.00006 5.40816 6 5.49994V10.4999C6.00006 10.5917 6.02537 10.6817 6.07317 10.7601C6.12098 10.8384 6.18942 10.9021 6.27101 10.9441C6.35259 10.9861 6.44418 11.0049 6.53572 10.9984C6.62726 10.9918 6.71524 10.9602 6.79 10.9069L10.29 8.40694C10.3548 8.36068 10.4076 8.29962 10.4441 8.22883C10.4806 8.15804 10.4996 8.07956 10.4996 7.99994C10.4996 7.92031 10.4806 7.84184 10.4441 7.77104C10.4076 7.70025 10.3548 7.63919 10.29 7.59294L6.79 5.09294Z" fill="white"/>
						<path d="M0 4C0 3.46957 0.210714 2.96086 0.585786 2.58579C0.960859 2.21071 1.46957 2 2 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V12C16 12.5304 15.7893 13.0391 15.4142 13.4142C15.0391 13.7893 14.5304 14 14 14H2C1.46957 14 0.960859 13.7893 0.585786 13.4142C0.210714 13.0391 0 12.5304 0 12V4ZM15 4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H2C1.73478 3 1.48043 3.10536 1.29289 3.29289C1.10536 3.48043 1 3.73478 1 4V12C1 12.2652 1.10536 12.5196 1.29289 12.7071C1.48043 12.8946 1.73478 13 2 13H14C14.2652 13 14.5196 12.8946 14.7071 12.7071C14.8946 12.5196 15 12.2652 15 12V4Z" fill="white"/>
					</svg>
				</a>
			</div>
		</div>
	<p style="color: #AAAAAA;">${overviewFirstLine}</p>
        <p>Rating: ${movie.vote_average}</p>
	</div>
	`;
	}

	const cardRect = card.getBoundingClientRect();
	cardDetails.style.top = `${cardRect.bottom + window.scrollY + 5}px`;
	cardDetails.style.left = `${cardRect.left + window.scrollX}px`;

	document.body.appendChild(cardDetails);
	card._cardDetails = cardDetails;
}

function hideCardDetails(event: MouseEvent) {
	const card = event.currentTarget as CardHtmlElement;
	const cardDetails = card._cardDetails;
	if (cardDetails) {
		document.body.removeChild(cardDetails);
		delete card._cardDetails;
	}
}

async function populateSection(
	containerId: string,
	flag: string,
	...genreId: number[]
) {
	let container = document
		.getElementById(containerId)
		?.querySelector(".d-flex");

	if (!container) return;
	const movies = await fetchMoviesByGenre(...genreId);

	container.innerHTML = "";

	movies.forEach((movie) => {
		const card = createMovieCard(flag, movie);
		container.appendChild(card);
	});
}

async function populateSectionLanguage(containerId: string, flag: string) {
	const container = document
		.getElementById(containerId)
		?.querySelector(".d-flex");
	if (!container) return;
	const movies = await fetchMoviesByLanguage("en");

	container.innerHTML = "";

	movies.forEach((movie: Movie) => {
		const card = createMovieCard(flag, movie);
		container.appendChild(card);
	});
}

async function populateSectionLatestMovies(containerId: string, flag: string) {
	const container = document
		.getElementById(containerId)
		?.querySelector(".d-flex");
	if (!container) return;
	const movies = await fetchLatestMovies();

	container.innerHTML = "";

	movies.forEach((movie) => {
		const card = createMovieCard(flag, movie);
		container.appendChild(card);
	});
}

async function topIndianMovies(containerId: string, flag: string) {
	const container = document
		.getElementById(containerId)
		?.querySelector(".d-flex");
	const movies = await fetchLatestMovies();

	if (!container) return;

	container.innerHTML = "";

	movies.slice(0, 10).forEach((movie: Movie, index: number) => {
		const movieContainer = document.createElement("div");
		movieContainer.style.display = "flex";
		movieContainer.style.alignItems = "center";
		movieContainer.style.marginBottom = "10px";

		const numberElement = document.createElement("div") as HTMLDivElement;
		numberElement.className = "number";
		numberElement.textContent = `${index + 1}`;
		numberElement.style.marginRight = "-0.6rem";
		numberElement.style.transition = "margin-right 0.3s ease-in-out";
		numberElement.style.color = "#696969";
		numberElement.style.display = "absolute";
		numberElement.dataset.movieId = movie.id.toString();

		numberElement.addEventListener("click", () => {
			const elements = document.querySelectorAll(
				".number"
			) as NodeListOf<HTMLDivElement>;

			elements.forEach((num) => {
				num.style.color = "#696969";
				if (num.innerHTML !== numberElement.innerHTML) {
					num.style.marginRight = "-0.6rem";
				}
			});
			numberElement.style.marginRight = "13px";
			numberElement.style.color = "white";
			const selectedMovieId = numberElement.dataset.movieId;

			const selectedMovie = movies.find(
				(movie: Movie) => movie.id === Number(selectedMovieId)
			);
			if (selectedMovie) {
				const carouselHTML = generateCarousel(selectedMovie);
				const carousalElement = document.getElementById("carousel-container");
				if (!carousalElement) return;
				carousalElement.innerHTML = carouselHTML;
			}
		});

		const card = createMovieCard(flag, movie, 1);
		card.style.position = "relative";

		movieContainer.appendChild(numberElement);
		movieContainer.appendChild(card);

		container.appendChild(movieContainer);
	});
}

const sliderFunctionality = async () => {
	const slideContainer = document.querySelector(".slide-container");

	if (!slideContainer) return;

	const fetchMovies = async () => {
		const response = await fetch(
			`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`
		);
		const data = await response.json();
		return data.results;
	};

	const movies = await fetchMovies();

	slideContainer.innerHTML = "";

	movies.forEach((movie: Movie, index: number) => {
		const inputId = `c${index + 1}`;

		const inputElement = document.createElement("input");
		inputElement.type = "radio";
		inputElement.name = "slide";
		inputElement.id = inputId;
		if (index === 0) inputElement.checked = true;

		const labelElement = document.createElement("label");
		labelElement.htmlFor = inputId;
		labelElement.style.position = "relative";
		labelElement.className = "slide-card";
		labelElement.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;
		labelElement.addEventListener("mouseenter", () => {
			labelElement.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`;
			labelElement.innerHTML = `
			<div class="p-3 pt-5" style="position: absolute; bottom: 0;">
			<div class="info text-left pl-3">
				<div class="row mb-5">
					<div class="col-12">
						<h4 class="movie-carousel-name">${movie.title}</h4>
					</div>
				</div>
				<div class="row d-flex align-items-center ">
					<div class="col-auto">
						<a class="btn more-details-button p-3 d-none d-md-block" style="font-size: 1.3rem;" href="movie-info-design.html?movieId=${movie.id}">More details</a>
					</div>
					<div class="col-auto mt-2">
						<a href="#"
							class="custom-plus-size text-white text-decoration-none d-none d-md-block rounded-circle plus"
							style="width: 60px; height: 60px; font-size: 2rem; line-height: 1; background-color:#33373d; padding: 0.2rem; display: flex; justify-content: center; align-items: center;">
							<svg width="30" height="30" viewBox="0 0 8 8" fill="none"
								xmlns="http://www.w3.org/2000/svg" style="margin-left: 12px; margin-top: 10px;">
								<path
									d="M4 0C4.13261 0 4.25979 0.0526785 4.35355 0.146447C4.44732 0.240215 4.5 0.367392 4.5 0.5V3.5H7.5C7.63261 3.5 7.75979 3.55268 7.85355 3.64645C7.94732 3.74021 8 3.86739 8 4C8 4.13261 7.94732 4.25979 7.85355 4.35355C7.75979 4.44732 7.63261 4.5 7.5 4.5H4.5V7.5C4.5 7.63261 4.44732 7.75979 4.35355 7.85355C4.25979 7.94732 4.13261 8 4 8C3.86739 8 3.74021 7.94732 3.64645 7.85355C3.55268 7.75979 3.5 7.63261 3.5 7.5V4.5H0.5C0.367392 4.5 0.240215 4.44732 0.146447 4.35355C0.0526785 4.25979 0 4.13261 0 4C0 3.86739 0.0526785 3.74021 0.146447 3.64645C0.240215 3.55268 0.367392 3.5 0.5 3.5H3.5V0.5C3.5 0.367392 3.55268 0.240215 3.64645 0.146447C3.74021 0.0526785 3.86739 0 4 0Z"
									fill="white" />
							</svg>
							<span class="tooltip">Watchlist</span>
						</a>
					</div>
				</div>
				<div class="row pt-4">
					<div class="col-auto">
						<p class="mb-0 mb-md-2 ">Watch with a Prime membership</p>
					</div>
					<div class="col" style="margin-top: 0.1rem;">
						<p class="mb-0 d-none d-md-block fw-bold"><span class="px-2 py-1 rounded"
								style="background-color: #33373d;">U/A 13+</span></p>
					</div>
				</div>
				
			</div>
		</div>
    `;
		});

		labelElement.addEventListener("mouseleave", () => {
			labelElement.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;
			labelElement.innerHTML = "";
		});

		slideContainer.appendChild(inputElement);
		slideContainer.appendChild(labelElement);
	});
};

const seeMoreFunctionality = function () {
	let seeMoreLinks = document.querySelectorAll(".see-more-link");

	seeMoreLinks.forEach(function (link) {
		link.addEventListener("click", function (event) {
			event.preventDefault();
			let genreIds;
			if (link.getAttribute("data-genre-id")) {
				genreIds = link.getAttribute("data-genre-id")?.split(",");
			}

			let lang = link.getAttribute("data-lang");

			let baseUrl = "./seemore.html";
			let newUrl;
			newUrl = baseUrl;
			if (genreIds) {
				newUrl += "?genreIds=" + genreIds.join(",");
			}

			if (lang) {
				newUrl += "?lang=" + lang;
			}

			window.location.href = newUrl;
		});
	});
};

populateSection("action-adventure-movies", "n", 12, 28);
populateSectionLanguage("english-movies", "n");
populateSection("drama-movies", "n", 18);
populateSectionLatestMovies("latest-movies", "n");
populateSection("mystery-movies", "n", 9648, 53);
populateSection("romance-movies", "n", 10749);
populateSection("comedy-movies", "n", 35);
populateSection("horror-movies", "n", 27);
populateSection("history-movies", "n", 36);
populateSection("family-movies", "n", 10751);
populateSection("fantasy-movies", "n", 14);
populateSection("war-movies", "n", 10752);
populateSection("fiction-movies", "n", 878);
populateSection("western-movies", "n", 37);
populateSection("documentaries", "n", 99);
topIndianMovies("top-movies", "n");
populateSection("action-adventure-movies-rent", "y", 12, 28);
populateSectionLanguage("english-movies-rent", "y");
populateSection("drama-movies-rent", "y", 18);
populateSection("history-movies-rent", "y", 36);
populateSection("family-movies-rent", "y", 10751);
populateSection("fantasy-movies-rent", "y", 14);
populateSection("war-movies-rent", "y", 10752);
populateSection("fiction-movies-rent", "y", 878);
populateSection("western-movies-rent", "y", 37);
populateSection("documentaries-rent", "y", 99);
fetchMovies();
seeMoreFunctionality();
sliderFunctionality();
