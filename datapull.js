// Replace 'YOUR_API_KEY' with your Google API Key
const API_KEY = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
const SHEET_ID = '1Bcl1EVN-7mXUP7M1FL9TBB5v4O4AFxGTVB6PwqOn9ss';
const SHEET_NAME = 'Rank';

// Load the Google Sheets API
gapi.load('client', initClient);

// Initialize the Google Sheets API client
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
        // Call the function to fetch data
        fetchSheetData();
    });
}

// Function to fetch data from Google Sheets
function fetchSheetData() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: SHEET_NAME,
    }).then(function(response) {
        const values = response.result.values;
        if (values && values.length > 0) {
            const playerContainer = document.getElementById('playerContainer');
            playerContainer.innerHTML = ''; // Clear existing content

            values.forEach(function(row) {
                const playerCard = document.createElement('div');
                playerCard.classList.add('player-card', 'card', 'mb-3');
                playerCard.setAttribute('data-level', row[3]);
                playerCard.setAttribute('data-name', row[1]);

                const playerInfo = document.createElement('div');
                playerInfo.classList.add('card-body', 'player-info', 'd-flex', 'justify-content-between', 'align-items-center');

                const playerName = document.createElement('span');
                playerName.classList.add('player-name');
                playerName.textContent = row[0] + '. ' + row[1];

                const playerCoins = document.createElement('span');
                playerCoins.textContent = 'S+ Coins: ' + row[2];

                const progressBar = document.createElement('div');
                progressBar.classList.add('progress', 'mt-2');

                const progressBarInner = document.createElement('div');
                progressBarInner.classList.add('progress-bar');
                progressBarInner.style.width = (row[2] / 210) * 100 + '%';
                progressBarInner.setAttribute('role', 'progressbar');
                progressBarInner.setAttribute('aria-valuenow', row[2]);
                progressBarInner.setAttribute('aria-valuemin', '0');
                progressBarInner.setAttribute('aria-valuemax', '210');

                progressBar.appendChild(progressBarInner);
                playerInfo.appendChild(playerName);
                playerInfo.appendChild(playerCoins);
                playerCard.appendChild(playerInfo);
                playerCard.appendChild(progressBar);
                playerContainer.appendChild(playerCard);
            });
        } else {
            console.log('No data found.');
        }
    }, function(response) {
        console.error('Error fetching data:', response.result.error.message);
    });
}

// Function to search and filter data
function searchTable() {
    var input, filter, cards, name, i;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    cards = document.getElementsByClassName("player-card");
    for (i = 0; i < cards.length; i++) {
        name = cards[i].getAttribute("data-name");
        if (name.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}
