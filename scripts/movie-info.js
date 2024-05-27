const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZWNjNWNkZWY3OWI3ZGYzMzQ4Mjk2MjYwMTJkMmYyMSIsInN1YiI6IjY2NGM5MzMxN2FjM2ZhYTU3ZDc5ZDNjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CeFqkYpC-hLAqyP0yOUFEFKMlKPoYk2vGs1pATKTMzw",
  },
};

fetch("https://api.themoviedb.org/3/movie/now_playing", options)
  .then((response) => response.json())
  .then((response) => {
    console.log(response.results);
    let movies = response.results;
    let imgSrc = movies[1].backdrop_path;

    let movieDetailsDiv = document.getElementById("movie-details");
    movieDetailsDiv.style.backgroundImage = `linear-gradient(90deg,rgba(0,0,0,1), rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url("http://image.tmdb.org/t/p/w500/${imgSrc}")`;
    movieDetailsDiv.style.backgroundSize = "cover";
    movieDetailsDiv.style.backgroundRepeat = "no-repeat";
    movieDetailsDiv.style.backgroundPositionX = "right";

    let movieTitle = document.getElementById("movie-title");
    movieTitle.innerHTML = movies[1].original_title;

    let movieOverview = document.getElementById("movie-overview");
    movieOverview.innerHTML = movies[1].overview;

    let movieVoteAverage = document.getElementById("movie-vote-average");
    movieVoteAverage.innerHTML = movies[1].vote_average.toFixed(1);

    let movieReleaseYear = document.getElementById("movie-release-year");
    let date = new Date(movies[1].release_date);
    movieReleaseYear.innerHTML = date.getFullYear();

    const languageNames = new Intl.DisplayNames(["en"], {
      type: "language",
    });
    let movieLanguage = document.getElementById("lang");
    movieLanguage.innerHTML = languageNames.of(movies[1].original_language);

    let movieId = movies[1].id;
    let apiKey = "fecc5cdef79b7df334829626012d2f21";

    console.log(movies[1].genre_ids)
    let movieGenres = movies[1].genre_ids;

    fetch("https://api.themoviedb.org/3/genre/movie/list?", options)
    .then((response) => response.json())
    .then((response) => {
      console.log("genres",response.genres)
      let genres = response.genres;

      movieGenres.map(movieGenre => {

        let paraElement = document.createElement('p');
        paraElement.style.marginRight = "2%";
        let anchorElement = document.createElement('a');
        let textNode = document.createTextNode(genres.filter(genre => genre.id == movieGenre)[0].name)
        
        anchorElement.appendChild(textNode)
      })

    })


    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?/api_key=${apiKey}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        let crewMembers = response.crew;
        // Directors List
        let directors = crewMembers.filter(
          (crewMember) => crewMember.job == "Director"
        );
        console.log(directors);
        let movieDirectors = document.getElementById("directors");
        for (let i = 0; i < directors.length; i++) {
          
          let span = document.createElement("span");
          span.style.color = "white";
          span.style.fontSize = "large";
          let textnode = document.createTextNode(directors[i].name);
          span.appendChild(textnode);
          movieDirectors.appendChild(span);

          if (i < directors.length - 1) {
            span = document.createElement("span");
            textnode = document.createTextNode(", ");
            span.appendChild(textnode);
            span.style.color = "gray";
            span.style.fontSize = "large";
            span.style.fontWeight = "bold";
            span.style.paddingRight = "0.2%";
            movieDirectors.append(span);
          }
        }
        // Producers List
        let producers = crewMembers.filter(
          (crewMember) => crewMember.job == "Producer"
        );
        let movieProducers = document.getElementById("producers");

        for (let i = 0; i < producers.length; i++) {

          let span = document.createElement("span");
          span.style.color = "white";
          span.style.fontSize = "large";
          let textnode = document.createTextNode(producers[i].name);
          span.appendChild(textnode);
          movieProducers.appendChild(span);

          if (i < producers.length - 1) {
            span = document.createElement("span");
            textnode = document.createTextNode(", ");
            span.appendChild(textnode);
            span.style.color = "gray";
            span.style.fontSize = "large";
            span.style.fontWeight = "bold";
            span.style.paddingRight = "0.2%";
            movieProducers.append(span);
          }
        }

        // Actors List
        let castMembers = response.cast;
        let actors = castMembers.filter(
          (castMember) => castMember.known_for_department == "Acting"
        );
        let movieActors = document.getElementById("actors");

        for (let i = 0; i < 3; i++) {

          let span = document.createElement("span");
          span.style.color = "white";
          span.style.fontSize = "large";
          let textnode = document.createTextNode(actors[i].name);
          span.appendChild(textnode);
          movieActors.appendChild(span);

          if (i < 2) {
            span = document.createElement("span");
            textnode = document.createTextNode(", ");
            span.appendChild(textnode);
            span.style.color = "gray";
            span.style.fontSize = "large";
            span.style.fontWeight = "bold";
            span.style.paddingRight = "0.2%";
            movieActors.append(span);
          }
        }
      });
  })
  .catch((err) => console.error(err));

