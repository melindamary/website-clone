const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZWNjNWNkZWY3OWI3ZGYzMzQ4Mjk2MjYwMTJkMmYyMSIsInN1YiI6IjY2NGM5MzMxN2FjM2ZhYTU3ZDc5ZDNjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CeFqkYpC-hLAqyP0yOUFEFKMlKPoYk2vGs1pATKTMzw",
    },
  };


  const playTrailer = () => {
    console.log("Entered trailer page");
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');

    let trailerVideo = document.getElementById("trailer-video");
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?`, options)
    .then((response) => response.json())
    .then((response) => {
      let trailers = response.results.filter(video => video.type === "Trailer");
      trailerVideo.src = `https://www.youtube.com/embed/${trailers[0].key}?autoplay=1&mute=1`;
      console.log(trailerVideo.src)
    })
    
  }