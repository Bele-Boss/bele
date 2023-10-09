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

// Function to calculate progress within each level
function calculateProgress(value, level) {
    const levelThresholds = [10, 30, 60, 100, 150, 210];
    const min = levelThresholds[level - 1] || 0;
    const max = levelThresholds[level] || Number.MAX_VALUE;
    return Math.min((value - min) / (max - min), 1);
}

// Function to create a progress bar element
function createProgressBar(value, level) {
    const progress = calculateProgress(value, level) * 100;
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.innerHTML = `<div class="progress-bar-inner" style="width: ${progress}%;"></div>`;
    return progressBar;
}

// Function to create a player card element
function createPlayerCard(player) {
    const { rank, name, coins, level } = player;
    const playerCard = document.createElement('div');
    playerCard.className = 'player-card';
    playerCard.setAttribute('data-level', level);
    playerCard.innerHTML = `
        <div class="player-info">
            <span class="player-name">${rank}. ${name}</span>
            <span class="player-coins">S+ Coins: ${coins}</span>
        </div>
    `;
    playerCard.appendChild(createProgressBar(coins, level));
    return playerCard;
}

// Function to display players
function displayPlayers(players) {
    const playerContainer = document.getElementById('playerContainer');
    playerContainer.innerHTML = '';
    players.forEach(player => {
        playerContainer.appendChild(createPlayerCard(player));
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
            // Process and display the data here
            const players = values.map((row, index) => ({
                rank: index + 1,
                name: row[1],
                coins: parseInt(row[2]),
                level: row[3],
            }));
            displayPlayers(players);
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

// Call the initClient function to start fetching data
initClient();
