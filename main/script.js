const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');


// Load movies from API
async function loadMovies(searchTerm) {
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    if (data.Response == "True") displayMovieList(data.Search);
}

function findMovies() {
    let searchTerm = movieSearchBox.value.trim();
    const wrapper = document.querySelector('.wrapper');
    if (searchTerm.length > 0) {
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies) {
    searchList.innerHTML = "";
    for (let idx = 0; idx < movies.length; idx++) {
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in data-id
        movieListItem.classList.add('search-list-item');
        let moviePoster = movies[idx].Poster != "N/A" ? movies[idx].Poster : "../img/image_not_found.png";
        movieListItem.innerHTML = `
        <div class="search-item-thumbnail">
            <img src="${moviePoster}">
        </div>
        <div class="search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails() {
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            const searchTerm = movieSearchBox.value.trim();
            
            // Save to search history when a movie is clicked
            addToSearchHistory(searchTerm);
            
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`);
            const movieDetails = await result.json();
            displayMovieDetails(movieDetails);
        });
    });
}

function displayMovieDetails(details) {
    resultGrid.innerHTML = `
    <div class="poster-container">
        <div class="movie-poster">
            <img src="${(details.Poster != "N/A") ? details.Poster : "../img/image_not_found.png"}" alt="movie poster">
        </div>
    </div>
    <div class="info-container">
        <div class="movie-info">
            <h3 class="movie-title">${details.Title}</h3>
            <ul class="movie-misc-info">
                <li class="year">Year: ${details.Year}</li>
                <li class="rated">Ratings: ${details.Rated}</li>
                <li class="released">Released: ${details.Released}</li>
            </ul>
            <p class="genre"><b>Genre:</b> ${details.Genre}</p>
            <p class="writer"><b>Writer:</b> ${details.Writer}</p>
            <p class="actors"><b>Actors:</b> ${details.Actors}</p>
            <p class="plot"><b>Plot:</b> ${details.Plot}</p>
            <p class="language"><b>Language:</b> ${details.Language}</p>
            <p class="awards"><b><i class="ti ti-award"></i> Awards:</b> ${details.Awards}</p>
        </div>
    </div>
    `;
}

window.addEventListener('click', (event) => {
    if (event.target.className != "form-control") {
        searchList.classList.add('hide-search-list');
    }
});

let searchHistory = [];
let detailedHistory = [];
const MAX_HISTORY_ITEMS = 3; // Number of searches stored in the quick search history
const MAX_DETAILED_HISTORY = 50; // Total number of searches stored

// Check for search parameter in URL
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    if (searchTerm) {
        movieSearchBox.value = searchTerm;
        findMovies();
    }
    
    // Load existing history
    const savedHistory = sessionStorage.getItem('filmFetchHistory');
    if (savedHistory) {
        searchHistory = JSON.parse(savedHistory);
        displaySearchHistory();
    }
});

// Add search term to history
function addToSearchHistory(searchTerm) {
    // Avoid adding duplicate recent entries
    if (!searchHistory.includes(searchTerm)) {
        searchHistory.unshift(searchTerm);
        if (searchHistory.length > MAX_HISTORY_ITEMS) {
            searchHistory.pop();
        }
        sessionStorage.setItem('filmFetchHistory', JSON.stringify(searchHistory));
        displaySearchHistory();
    }
    
    // Add to detailed history with timestamp
    const detailedHistoryItem = {
        term: searchTerm,
        timestamp: new Date().toISOString()
    };
    
    const savedDetailedHistory = sessionStorage.getItem('filmFetchDetailedHistory');
    detailedHistory = savedDetailedHistory ? JSON.parse(savedDetailedHistory) : [];
    
    detailedHistory.unshift(detailedHistoryItem);
    if (detailedHistory.length > MAX_DETAILED_HISTORY) {
        detailedHistory.pop();
    }
    
    sessionStorage.setItem('filmFetchDetailedHistory', JSON.stringify(detailedHistory));
}

// Display quick search history
function displaySearchHistory() {
    const historyContainer = document.createElement('div');
    historyContainer.className = 'search-history';
    historyContainer.innerHTML = `
        <div class="notiglow"></div>
        <div class="notiborderglow"></div>
        <div class="notititle">
            Recent Searches
            <a href="../history/history.html" style="float: right; font-size: 0.8em; color: #3d83ff;">
                View All <i class="ti ti-arrow-right"></i>
            </a>
        </div>
        <div class="notibody">
            ${searchHistory.map(term => `
                <div class="history-item" style="color: #fff; cursor: pointer; padding: 5px 0;">
                    <i class="ti ti-history"></i> ${term}
                </div>
            `).join('')}
        </div>
    `;

    // Remove existing history container if it exists
    const existingHistory = document.querySelector('.search-history');
    if (existingHistory) {
        existingHistory.remove();
    }

    // Add new history container
    document.querySelector('.logo .container').appendChild(historyContainer);

    // Add click listeners to history items
    const historyItems = historyContainer.querySelectorAll('.history-item');
    historyItems.forEach(item => {
        item.addEventListener('click', () => {
            const searchTerm = item.textContent.trim().replace('history', '').trim();
            movieSearchBox.value = searchTerm;
            findMovies();
        });
    });
}
