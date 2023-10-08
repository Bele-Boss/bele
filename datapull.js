// Replace 'YOUR_API_KEY' with your Google API Key
const API_KEY = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
const SHEET_ID = '1Bcl1EVN-7mXUP7M1FL9TBB5v4O4AFxGTVB6PwqOn9ss';
const SHEET_NAME = 'Rank';

// Load the Google Sheets API
gapi.load('client', initClient);

// Initialize the Google Sheets API client
function initClient() {
    gapi.client.init({
        console.log('one');
        apiKey: API_KEY,
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
        // Call the function to fetch data
        console.log('two');
        fetchSheetData();
    console.log('three');
    });
}

// Function to fetch data from Google Sheets
function fetchSheetData() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: SHEET_NAME,
    }).then(function(response) {
        const values = response.result.values;
        console.log('Here1');
        console.log(values);
        if (values && values.length > 0) {
            // Process and display the data here
            const playerContainer = document.getElementById('playerContainer');
            playerContainer.innerHTML = ''; // Clear existing content

            values.forEach(function(row) {
                const playerCard = document.createElement('div');
                playerCard.classList.add('player-card');
                playerCard.setAttribute('data-level', row[3]);
                playerCard.setAttribute('data-name', row[1]);

                const playerInfo = document.createElement('div');
                playerInfo.classList.add('player-info');

                const playerName = document.createElement('span');
                playerName.classList.add('player-name');
                playerName.textContent = row[0] + '. ' + row[1];

                const playerCoins = document.createElement('span');
                playerCoins.textContent = 'S+ Coins: ' + row[2];

                const progressBar = document.createElement('div');
                progressBar.classList.add('progress-bar');

                const progressBarInner = document.createElement('div');
                progressBarInner.classList.add('progress-bar-inner');
                progressBarInner.style.width = (row[2] / 210) * 100 + '%';

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
