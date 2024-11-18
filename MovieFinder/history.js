const historyList = document.getElementById('historyList');
const dbName = 'MovieSearchDB';
let db;

const request = indexedDB.open(dbName, 1);

request.onerror = (event) => {
    console.error('Database error:', event.target.error);
};

request.onsuccess = (event) => {
    db = event.target.result;
    displaySearchHistory();
};

const displaySearchHistory = () => {
    const transaction = db.transaction(['searchHistory'], 'readonly');
    const store = transaction.objectStore('searchHistory');
    const request = store.getAll();

    request.onsuccess = () => {
        const searches = request.result;
        if (searches.length === 0) {
            historyList.innerHTML = `
                <div class="empty-history">
                    <i class="ti ti-history-off" style="font-size: 48px; margin-bottom: 15px;"></i>
                    <h3>No Search History</h3>
                    <p>Try searching for a movie on the home page!</p>
                </div>
            `;
        } else {
            historyList.innerHTML = searches
                .reverse()
                .map(search => `
                    <div class="history-item" onclick="redirectToSearch('${search.term}')">
                        <span class="search-term">${search.term}</span>
                        <span class="search-date">${new Date(search.date).toLocaleString()}</span>
                    </div>
                `)
                .join('');
        }
    };
};

const redirectToSearch = (searchTerm) => {
    // Store the search term in localStorage to be used by the main page
    localStorage.setItem('lastSearch', searchTerm);
    window.location.href = 'index.html';
};

const clearHistory = () => {
    const transaction = db.transaction(['searchHistory'], 'readwrite');
    const store = transaction.objectStore('searchHistory');
    const request = store.clear();

    request.onsuccess = () => {
        displaySearchHistory(); // Refresh the display
    };

    request.onerror = (event) => {
        console.error('Error clearing history:', event.target.error);
    };
}; 