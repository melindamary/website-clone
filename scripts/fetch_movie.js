export async function topIndianMovies(containerId) {
	const container = document
		.getElementById(containerId)
		.querySelector(".d-flex");
	const movies = await fetchLatestMovies();

	container.innerHTML = "";

	movies.slice(0, 10).forEach((movie, index) => {
		console.log(movie.id);
		const movieContainer = document.createElement("div");
		movieContainer.style.display = "flex";
		movieContainer.style.alignItems = "center";
		movieContainer.style.marginBottom = "10px";

		const numberElement = document.createElement("div");
		numberElement.className = "number";
		numberElement.textContent = index + 1;
		numberElement.style.marginRight = "-0.6rem";
		numberElement.style.transition = "margin-right 0.3s ease-in-out";
		numberElement.style.color = "#696969";
		numberElement.style.display = "absolute";
		numberElement.dataset.movieId = movie.id;

		numberElement.addEventListener("click", () => {
			document.querySelectorAll(".number").forEach((num) => {
				num.style.color = "#696969";
				if (num.innerHTML !== numberElement.innerHTML) {
					num.style.marginRight = "-0.6rem";
				}
			});
			numberElement.style.marginRight = "13px";
			numberElement.style.color = "white";
			const selectedMovieId = numberElement.dataset.movieId;
			console.log(selectedMovieId);

			const selectedMovie = movies.find(
				(movie) => movie.id === Number(selectedMovieId)
			);
			if (selectedMovie) {
				console.log(selectedMovie);
				const carouselHTML = generateCarousel(selectedMovie);
				console.log(carouselHTML);
				document.getElementById("carousel-container").innerHTML = carouselHTML;
			}
		});
		// console.log(numberElement.innerHTML);

		const card = createMovieCard(movie, 1);
		card.style.position = "relative";

		movieContainer.appendChild(numberElement);
		movieContainer.appendChild(card);

		container.appendChild(movieContainer);
	});
}

