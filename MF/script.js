const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const movieDetails = document.getElementById('movieDetails');
const POPULAR_MOVIES = ['matrix', 'inception', 'interstellar', 'avatar', 'gladiator', 'titanic'];
let currentPage = 1;

// Initialize IndexedDB
const dbName = 'MovieSearchDB';
const dbVersion = 1;
let db;

const request = indexedDB.open(dbName, dbVersion);

request.onerror = (event) => {
    console.error('Database error:', event.target.error);
};

request.onupgradeneeded = (event) => {
    db = event.target.result;
    if (!db.objectStoreNames.contains('searchHistory')) {
        db.createObjectStore('searchHistory', { keyPath: 'id', autoIncrement: true });
    }
};

request.onsuccess = (event) => {
    db = event.target.result;
};

// Save search to history
const saveSearch = (searchTerm) => {
    const transaction = db.transaction(['searchHistory'], 'readwrite');
    const store = transaction.objectStore('searchHistory');
    const search = {
        term: searchTerm,
        date: new Date().toISOString()
    };
    store.add(search);
};

// Search for movie
const searchMovie = async () => {
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) return;

    try {
        // const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${config.OMDB_API_KEY}`);
        const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey='7adb17de'`);
        const data = await response.json();

        if (data.Response === 'True') {
            displayMovieCards(data.Search, true);
            saveSearch(searchTerm);
        } else {
            movieDetails.innerHTML = '<p class="error">No movies found!</p>';
            movieDetails.classList.add('active');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

// Add this new function for homepage
const loadRandomMovies = async (page = 1) => {
    try {
        // Get a random search term from the popular movies array
        const randomTerm = POPULAR_MOVIES[Math.floor(Math.random() * POPULAR_MOVIES.length)];
        // const response = await fetch(`https://www.omdbapi.com/?s=${randomTerm}&page=${page}&apikey=${config.OMDB_API_KEY}`);
        const response = await fetch(`https://www.omdbapi.com/?s=${randomTerm}&page=${page}&apikey='7adb17de'`);
        const data = await response.json();

        if (data.Response === 'True') {
            if (page === 1) {
                displayMovieCards(data.Search, false);
            } else {
                appendMovieCards(data.Search);
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

// Modify displayMovieCards to handle both search results and homepage
const displayMovieCards = (movies, isSearch = true) => {
    const title = isSearch ? `Search Results` : `Discover Movies`;
    
    movieDetails.innerHTML = `
        <div class="homepage-section">
            <h2 class="section-title">${title}</h2>
            <div class="movie-cards">
                ${generateMovieCards(movies)}
            </div>
            ${!isSearch ? `
                <button class="load-more-btn" onclick="loadMore()">
                    <strong><i class="ti ti-rotate-2" style="margin-right: 5px;"></i> Load More</strong>
                    <div id="container-stars">
                        <div id="stars"></div>
                    </div>
                    <div id="glow">
                        <div class="circle"></div>
                        <div class="circle"></div>
                    </div>
                </button>
            ` : ''}
        </div>
    `;
    movieDetails.classList.add('active');
};

const appendMovieCards = (movies) => {
    const movieCardsContainer = document.querySelector('.movie-cards');
    movieCardsContainer.insertAdjacentHTML('beforeend', generateMovieCards(movies));
};

const generateMovieCards = (movies) => {
    return movies.map(movie => `
        <div class="movie-card" onclick="showMovieDetails('${movie.imdbID}')">
            <div class="card-poster">
                <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'image_not_found.gif'}" alt="${movie.Title} Poster">
            </div>
            <div class="card-info">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
            </div>
        </div>
    `).join('');
};

const loadMore = () => {
    currentPage++;
    loadRandomMovies(currentPage);
};

// Modify showMovieDetails to add the detailed-view class
const showMovieDetails = async (imdbID) => {
    try {
        // const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${config.OMDB_API_KEY}`);
        const response = await fetch("https://www.omdbapi.com/?i=${imdbID}&apikey='7adb17de'");
        const movie = await response.json();

        if (movie.Response === 'True') {
            movieDetails.innerHTML = `
                <div class="detailed-view">
                    <div class="movie-poster">
                        <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'image_not_found.gif'}" alt="${movie.Title} Poster">
                    </div>
                    <div class="movie-info">
                        <h2>${movie.Title} (${movie.Year})</h2>
                        <p><strong>Rating:</strong> ${movie.Rated}</p>
                        <p><strong>Runtime:</strong> ${movie.Runtime}</p>
                        <p><strong>Genre:</strong> ${movie.Genre}</p>
                        <p><strong>Director:</strong> ${movie.Director}</p>
                        <p><strong>Actors:</strong> ${movie.Actors}</p>
                        <p><strong>Plot:</strong> ${movie.Plot}</p>
                        <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
                        <p><strong>Awards:</strong> ${movie.Awards}</p>
                    </div>
                </div>
            `;
            movieDetails.classList.add('active', 'detailed-view');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

// Event listeners
searchBtn.addEventListener('click', searchMovie);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchMovie();
});

// Modify the window load event listener
window.addEventListener('load', () => {
    const lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch) {
        searchInput.value = lastSearch;
        searchMovie();
        localStorage.removeItem('lastSearch');
    } else {
        loadRandomMovies(); // Load random movies on homepage
    }
}); 