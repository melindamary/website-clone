"use strict";
const apiOptions = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZWNjNWNkZWY3OWI3ZGYzMzQ4Mjk2MjYwMTJkMmYyMSIsInN1YiI6IjY2NGM5MzMxN2FjM2ZhYTU3ZDc5ZDNjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CeFqkYpC-hLAqyP0yOUFEFKMlKPoYk2vGs1pATKTMzw",
    },
};
const playTrailer = () => {
    console.log("Entered trailer page");
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');
    if (!movieId) {
        console.error("No movie ID found in URL parameters.");
        return;
    }
    let trailerVideo = document.getElementById("trailer-video");
    if (!trailerVideo) {
        console.error("No element found with ID 'trailer-video'.");
        return;
    }
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?`, apiOptions)
        .then((response) => response.json())
        .then((response) => {
        let trailers = response.results.filter((video) => video.type === "Trailer");
        if (trailers.length > 0) {
            trailerVideo.src = `https://www.youtube.com/embed/${trailers[0].key}?autoplay=1&mute=1`;
            console.log(trailerVideo.src);
        }
        else {
            console.error("No trailers found.");
        }
    })
        .catch((error) => {
        console.error("Error fetching trailer videos:", error);
    });
};
