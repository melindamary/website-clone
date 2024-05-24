const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZWNjNWNkZWY3OWI3ZGYzMzQ4Mjk2MjYwMTJkMmYyMSIsInN1YiI6IjY2NGM5MzMxN2FjM2ZhYTU3ZDc5ZDNjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CeFqkYpC-hLAqyP0yOUFEFKMlKPoYk2vGs1pATKTMzw'
    }
  };

fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => {
        console.log(response.results)
        let movies = response.results;
        let imgSrc = movies[1].backdrop_path;
        
        let movieDetailsDiv = document.getElementById("movie-details");
        movieDetailsDiv.style.backgroundImage = `linear-gradient(90deg,rgba(0,0,0,1), rgba(0,0,0,0.5), rgba(0,0,0,0)), url("http://image.tmdb.org/t/p/w500/${imgSrc}")`
        movieDetailsDiv.style.backgroundSize = 'cover';
        movieDetailsDiv.style.backgroundRepeat = 'no-repeat'
        movieDetailsDiv.style.backgroundPositionX = 'right'


        let movieTitle = document.getElementById("movie-title");
        movieTitle.innerHTML = movies[1].original_title;

        let movieOverview = document.getElementById("movie-overview");
        movieOverview.innerHTML = movies[1].overview;

        let movieVoteAverage = document.getElementById("movie-vote-average");
        movieVoteAverage.innerHTML = movies[1].vote_average.toFixed(1);

        let movieReleaseYear = document.getElementById("movie-release-year");
        let date = new Date(movies[1].release_date);
        movieReleaseYear.innerHTML = date.getFullYear();
    })
    .catch(err => console.error(err));

