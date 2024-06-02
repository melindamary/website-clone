document.addEventListener('DOMContentLoaded', () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZWNjNWNkZWY3OWI3ZGYzMzQ4Mjk2MjYwMTJkMmYyMSIsInN1YiI6IjY2NGM5MzMxN2FjM2ZhYTU3ZDc5ZDNjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CeFqkYpC-hLAqyP0yOUFEFKMlKPoYk2vGs1pATKTMzw",
    },
  };

  const urlParams = new URLSearchParams(window.location.search);
  let movieId = urlParams.get('movieId');
  if(movieId == undefined) movieId = 748783;
  console.log("Hi",movieId);

  fetch(`https://api.themoviedb.org/3/movie/${movieId}`, options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      let movie = response;
      let movieId = movie.id;
      console.log(movieId)
      let apiKey = "fecc5cdef79b7df334829626012d2f21";
  
      let imgSrc = movie.backdrop_path;
      let movieDetailsDiv = document.getElementById("movie-details");
      movieDetailsDiv.style.backgroundImage = `linear-gradient(90deg,rgba(0,0,0,1), rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url("http://image.tmdb.org/t/p/w500/${imgSrc}")`;
      movieDetailsDiv.style.backgroundSize = "cover";
      movieDetailsDiv.style.backgroundRepeat = "no-repeat";
      movieDetailsDiv.style.backgroundPositionX = "right";
  
      let movieTitle = document.getElementById("movie-title");
      movieTitle.innerHTML = movie.original_title;
  
      let movieOverview = document.getElementById("movie-overview");
      movieOverview.innerHTML = movie.overview;
  
      let movieVoteAverage = document.getElementById("movie-vote-average");
      movieVoteAverage.innerHTML = movie.vote_average.toFixed(1);
  
      let movieRuntime = document.getElementById("runtime");
      const hours = Math.floor(movie.runtime / 60);
      const minutes = movie.runtime % 60;
      movieRuntime.innerHTML = hours + " h " + minutes + " min";
      
      let movieReleaseYear = document.getElementById("movie-release-year");
      let date = new Date(movie.release_date);
      movieReleaseYear.innerHTML = date.getFullYear();
  
      console.log(movie.genre_ids);
      let movieGenres = movie.genre_ids;
  
      // Genres for movie
      fetch("https://api.themoviedb.org/3/genre/movie/list?", options)
        .then((response) => response.json())
        .then((response) => {
          console.log("genres", response.genres);
          let genres = response.genres;
  
          movieGenres.map((movieGenre) => {
            let paraElement = document.createElement("p");
            paraElement.style.marginRight = "2%";
            let anchorElement = document.createElement("a");
            anchorElement.style.textDecoration = "underline";
            anchorElement.style.cursor = "pointer";
            let textNode = document.createTextNode(
              genres.filter((genre) => genre.id == movieGenre)[0].name
            );
            anchorElement.appendChild(textNode);
            paraElement.appendChild(anchorElement);
            let movieGenreDiv = document.getElementById("genre");
            movieGenreDiv.appendChild(paraElement);
          });
        });
  
      // Movie Trailer Button onclick
      document.getElementById("trailer-button").onclick = () => {
        console.log("button clicked")
        window.location.href = `trailer.html?movieId=${movieId}`
      }
      
      // Audio languages (translations)
      const languageNames = new Intl.DisplayNames(["en"], {
        type: "language",
      });
      let movieLanguage = document.getElementById("lang");
      let audioLanguages = movie.spoken_languages;
      for (let i = 0; i < audioLanguages.length; i++) {
        movieLanguage.append(audioLanguages[i].name);
        if (i < audioLanguages.length - 1) {
          movieLanguage.append(", ");
        }
      }

      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/translations?`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          let movieSubtitles = document.getElementById("subtitles");
          console.log(response.translations);
          let audioLanguages = response.translations;
          for (let i = 0; i < audioLanguages.length; i++) {
            movieSubtitles.append(audioLanguages[i].name);
            if (i < audioLanguages.length - 1) {
              movieSubtitles.append(", ");
            }
          }
        });
  
      // Movie Credits (Cast and Crew)
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

      // Production Studio
      let movieStudio = document.getElementById("studio");
      movieStudio.innerHTML = movie.production_companies[0].name;
  
      // Related Movies
      fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?`, options)
      .then((response) => response.json())
      .then((response) => {
          console.log("Similar movies", response.results);
    
          let similarMovies = response.results;
          let relatedMoviesContent = document.getElementById('related-movies-content');
          similarMovies.forEach(similarMovie => {
              let movieId = similarMovie.id;
              let imgSrc = similarMovie.poster_path;
              let movieCard = document.createElement('div');
              movieCard.classList.add('movie-card');
              let movieImage = document.createElement('img');
              movieImage.classList.add('movie-image');
              movieImage.style.height = "40%";
              movieImage.style.width = "100%";
              movieImage.style.objectFit = "cover";
              movieImage.style.objectPosition = "center";
              movieImage.style.borderRadius = "10px";
    
              movieImage.src = `http://image.tmdb.org/t/p/w500/${imgSrc}`;
              let movieCardDetails = document.createElement('div');
              movieCardDetails.classList.add('movie-card-details');
              movieCardDetails.innerHTML = `
                  <h4>${similarMovie.title}</h4>
                  <p>${similarMovie.overview}</p>
              `;
    
              movieImage.addEventListener('mouseover', () => {
                  movieCardDetails.style.display = 'block';
                  movieCard.style.transform = 'scale(1.10)';
                  movieImage.style.borderBottomLeftRadius = "0px"
                  movieImage.style.borderBottomRightRadius = "0px"
              });
    
              movieCard.addEventListener('mouseout', () => {
                  movieCardDetails.style.display = 'none';
                  movieCard.style.transform = 'scale(1)';
                  movieImage.style.borderBottomLeftRadius = "10px"
                  movieImage.style.borderBottomRightRadius = "10px"
              });
   
              movieImage.addEventListener('click', () => {
                window.location.href = `movie-info.html?movieId=${movieId}`;
              })
    
              relatedMoviesContent.appendChild(movieCard);
              movieCard.appendChild(movieImage);
              movieCard.appendChild(movieCardDetails);
          });
      });
  
    })
    .catch((err) => console.error(err));
});
