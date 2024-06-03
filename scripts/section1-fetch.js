const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGEwNzFjYTA2MjcyY2JhOTE2ZjQ4MTNiNjRlMWNjZCIsInN1YiI6IjY2NTVkOWEyMThmZThiMDcwNTM2MGY0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UhqWA-MSLAvUO-M4JwTddXo5OytsMApaY9x7WtYqi9o'
    }
};
document.addEventListener('DOMContentLoaded', function() {
  fetch('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc',options)
    .then(response => response.json())
    .then(data => {
      const carouselInner = document.querySelector('.carousel-inner');
      const carouselIndicators = document.querySelector('.carousel-indicators');

      data.results.slice(0, 10).forEach((tvShow, index) => {
        const isActive = index === 0 ? 'active' : '';
        const item = `
          <div class="carousel-item ${isActive}">
            <img src="https://image.tmdb.org/t/p/original${tvShow.backdrop_path}" class="d-block w-100" alt="${tvShow.name}" />
            <div class="overlay"></div>
            <div class="carousel-caption text-start">
              <h5 class="display-7 fw-bold text-light">#${index + 1} in India</h5>
              <h3 class="display-4 fw-bold text-light">${tvShow.name}</h3>
              <p class="text-light fs-2 mb-4">New season</p>
              <p class="text-light fs-5 mb-2 fw-bold">First episode free <span class="badge bg-secondary">U/A 16+</span></p>
              <div id="buttons" class="d-flex flex-wrap flex-fill align-items-center">
                <button class="btn btn-light rounded-circle me-3 flex-wrap"><i class="bi bi-play-fill me-2"></i></button>
                <span class="text-light fs-3 me-2">Watch Now</span>
                <button class="btn btn-secondary rounded-circle me-2"><i class="bi bi-plus-lg"></i><span class="popup-text text-dark">Watchlist</span></button>
                <button class="btn btn-secondary rounded-circle"><i class="bi bi-info-circle"></i><span class="popup-text text-dark">Details</span></button>
              </div>
            </div>
          </div>
        `;
        carouselInner.insertAdjacentHTML('beforeend', item);

        const indicator = `
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" class="${isActive}" aria-current="${isActive ? 'true' : 'false'}" aria-label="Slide ${index + 1}"></button>
        `;
        carouselIndicators.insertAdjacentHTML('beforeend', indicator);
      });
    })
    .catch(error => console.error('Error fetching TV shows:', error));
});