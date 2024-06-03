var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "./config"], function (require, exports, config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function fetchMoviesByGenreAndLanguage(genreIds, lang) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = config_1.url;
            if (genreIds) {
                url += `&with_genres=${genreIds.join(",")}`;
            }
            if (lang) {
                url += `&with_original_movie=${lang}`;
            }
            try {
                console.log(url);
                const response = yield fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = yield response.json();
                console.log(data);
                return data.results;
            }
            catch (error) {
                console.error("Error fetching movies:", error);
            }
        });
    }
    function createMovieCard(movie) {
        const card = document.createElement("div");
        card.className = "card";
        card.style.width = "18rem";
        card.style.backgroundImage = `url(${config_1.imageBaseUrl}${movie.backdrop_path})`;
        card.style.backgroundSize = "cover";
        card.style.backgroundPosition = "center";
        card.style.color = "white";
        card.style.position = "relative";
        card.addEventListener("mouseenter", () => showCardDetails(movie, card));
        card.addEventListener("mouseleave", hideCardDetails);
        function showCardDetails(movie, card) {
            const cardDetails = document.createElement("div");
            cardDetails.className = "card-details";
            cardDetails.style.background = "black";
            cardDetails.style.color = "white";
            cardDetails.style.padding = "10px";
            const overviewFirstLine = movie.overview.split(".")[0];
            cardDetails.innerHTML = `
        <div class="col-auto">
            <div class="card-details-header" style="display: flex; justify-content: space-between; align-items: center;">
                <p class="mb-0 mb-md-2" style="font-weight:normal;font-size:0.9rem;">
                <svg class="fbl-icon _3UMk3x _1a_Ljt _3H1cN4" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"">
                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.120 2.039 C 8.641 2.287,6.414 3.362,4.761 5.107 C 1.806 8.228,1.158 12.819,3.137 16.623 C 3.620 17.552,4.164 18.288,4.938 19.061 C 5.930 20.051,7.038 20.789,8.272 21.278 C 11.634 22.610,15.313 22.080,18.200 19.845 C 18.637 19.507,19.507 18.637,19.845 18.200 C 21.256 16.378,22.000 14.236,22.000 12.000 C 22.000 7.432,18.842 3.387,14.430 2.303 C 13.446 2.062,12.028 1.948,11.120 2.039 M17.092 8.191 C 17.410 8.341,17.660 8.592,17.816 8.920 C 17.926 9.151,17.940 9.221,17.940 9.541 C 17.940 9.869,17.928 9.927,17.805 10.181 C 17.679 10.443,17.480 10.651,14.545 13.588 C 11.578 16.558,11.406 16.723,11.140 16.848 C 10.888 16.967,10.824 16.980,10.500 16.980 C 10.176 16.980,10.112 16.967,9.860 16.848 C 9.604 16.726,9.466 16.600,8.193 15.328 C 6.915 14.051,6.794 13.918,6.672 13.660 C 6.554 13.408,6.540 13.344,6.540 13.020 C 6.540 12.700,6.554 12.631,6.664 12.400 C 6.821 12.070,7.070 11.821,7.400 11.664 C 7.631 11.554,7.700 11.540,8.020 11.540 C 8.343 11.540,8.408 11.554,8.654 11.670 C 8.891 11.782,9.036 11.907,9.714 12.578 L 10.500 13.356 13.020 10.843 C 15.629 8.240,15.687 8.188,16.110 8.081 C 16.380 8.013,16.817 8.061,17.092 8.191 " fill="#1A98FF" stroke="none" fill-rule="evenodd"></path>
                </svg>
                </svg>
                    Watch with a Prime membership</p>
            
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <p style="margin: 0;">${movie.title}</p>
                <div class="button-group" style="display: flex; gap: 10px;">
                    <a href="#" class="custom-plus-size text-white text-decoration-none rounded-circle" style="width: 39px; height: 39px; font-size: 2rem; line-height: 1; background-color: #33373d; padding: 0.2rem; display: flex; justify-content: center; align-items: center;border-radius:50%;">
                        <svg width="18" height="18" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 0C4.13261 0 4.25979 0.0526785 4.35355 0.146447C4.44732 0.240215 4.5 0.367392 4.5 0.5V3.5H7.5C7.63261 3.5 7.75979 3.55268 7.85355 3.64645C7.94732 3.74021 8 3.86739 8 4C8 4.13261 7.94732 4.25979 7.85355 4.35355C7.75979 4.44732 7.63261 4.5 7.5 4.5H4.5V7.5C4.5 7.63261 4.44732 7.75979 4.35355 7.85355C4.25979 7.94732 4.13261 8 4 8C3.86739 8 3.74021 7.94732 3.64645 7.85355C3.55268 7.75979 3.5 7.63261 3.5 7.5V4.5H0.5C0.367392 4.5 0.240215 4.44732 0.146447 4.35355C0.0526785 4.25979 0 4.13261 0 4C0 3.86739 0.0526785 3.74021 0.146447 3.64645C0.240215 3.55268 0.367392 3.5 0.5 3.5H3.5V0.5C3.5 0.367392 3.55268 0.240215 3.64645 0.146447C3.74021 0.0526785 3.86739 0 4 0Z" fill="white" />
                        </svg>
                    </a>
                    <a href="#" class="custom-play-button text-white text-decoration-none rounded-circle" style="width: 40px; height: 40px; font-size: 2rem; line-height: 1; background-color: #33373d; padding: 0.2rem; display: flex; justify-content: center; align-items: center;border-radius:50%;">
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
            const cardRect = card.getBoundingClientRect();
            cardDetails.style.top = `${cardRect.bottom + window.scrollY + 5}px`;
            cardDetails.style.left = `${cardRect.left + window.scrollX}px`;
            document.body.appendChild(cardDetails);
            card._cardDetails = cardDetails;
        }
        function hideCardDetails(event) {
            const card = event.currentTarget;
            const cardDetails = card._cardDetails;
            if (cardDetails) {
                document.body.removeChild(cardDetails);
                delete card._cardDetails;
            }
        }
        return card;
    }
    function createSection() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const container = (_a = document
                .getElementById("movie-container")) === null || _a === void 0 ? void 0 : _a.querySelector(".d-flex");
            const urlParams = new URLSearchParams(window.location.search);
            const genreIds = urlParams.get("genreIds");
            const genreIdArray = genreIds
                ? genreIds.split(",").map((id) => parseInt(id, 10))
                : [];
            const lang = urlParams.get("lang");
            if (lang) {
                const headingElement = document.getElementById("heading");
                if (!headingElement)
                    return;
                headingElement.innerHTML = "Movies in English";
            }
            genreIdArray.forEach((genreId) => {
                getGenreName(genreId);
            });
            const movies = yield fetchMoviesByGenreAndLanguage(genreIdArray, lang);
            if (movies) {
                movies.forEach((movie) => {
                    const card = createMovieCard(movie);
                    container === null || container === void 0 ? void 0 : container.appendChild(card);
                });
            }
        });
    }
    //dropdown
    const dropDownFunctionality = function () {
        const dropdownToggle = document.querySelector(".dropdown-toggle");
        const dropdown = document.querySelector(".dropdown");
        dropdownToggle === null || dropdownToggle === void 0 ? void 0 : dropdownToggle.addEventListener("click", function () {
            dropdown === null || dropdown === void 0 ? void 0 : dropdown.classList.toggle("open");
        });
        document.addEventListener("click", function (event) {
            if (!(dropdown === null || dropdown === void 0 ? void 0 : dropdown.contains(event.target))) {
                dropdown === null || dropdown === void 0 ? void 0 : dropdown.classList.remove("open");
            }
        });
    };
    function getGenreName(genreId_1) {
        return __awaiter(this, arguments, void 0, function* (genreId, mediaType = "movie") {
            try {
                const response = yield fetch(`https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=${config_1.apiKey}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch genre list");
                }
                const data = yield response.json();
                const genre = data.genres.find((genre) => genre.id === genreId);
                if (genre) {
                    console.log("Genre Name:", genre.name);
                    const element = document.getElementById("heading");
                    if (!element)
                        return;
                    if (genre.name === "Documentary") {
                        element.innerHTML = `${genre.name}`;
                    }
                    else {
                        element.innerHTML = `${genre.name} Movies`;
                    }
                }
            }
            catch (error) {
                console.error("Error:", error.message);
            }
        });
    }
    createSection();
    dropDownFunctionality();
});
