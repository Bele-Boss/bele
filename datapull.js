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

// Function to create a player card element
function createPlayerCard(player) {
    const { rank, name, coins } = player;

    const playerCard = document.createElement('div');
    playerCard.className = 'player-card';

    const playerInfo = document.createElement('div');
    playerInfo.className = 'player-info';

    const playerName = document.createElement('span');
    playerName.className = 'player-name';
    playerName.textContent = `${rank}. ${name}`;

    const playerCoins = document.createElement('span');
    playerCoins.className = 'player-coins';
    playerCoins.textContent = `S+ Coins: ${coins}`;

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';

    // Determine the color of the progress bar based on coin count
    let progressBarColor = '#F44336'; // Default: Red

    if (coins >= 10) {
        progressBarColor = '#FFEB3B'; // Yellow
    }

    if (coins >= 30) {
        progressBarColor = '#4CAF50'; // Green
    }

    if (coins >= 60) {
        progressBarColor = '#795548'; // Brown
    }

    if (coins >= 100) {
        progressBarColor = '#2196F3'; // Blue
    }

    if (coins >= 150) {
        progressBarColor = '#E91E63'; // Pink
    }

    if (coins >= 210) {
        progressBarColor = '#000000'; // Black
    }

    progressBar.style.backgroundColor = progressBarColor;

    // Calculate the width of the progress bar within its color segment
    const maxCoins = 210;
    const colorMinCoins = [0, 10, 30, 60, 100, 150];
    const colorMaxCoins = [10, 30, 60, 100, 150, 210];
    let progressBarWidth = (coins - colorMinCoins[0]) / (colorMaxCoins[0] - colorMinCoins[0]) * 100;

    for (let i = 1; i < colorMinCoins.length; i++) {
        if (coins >= colorMinCoins[i] && coins <= colorMaxCoins[i]) {
            progressBarWidth = (coins - colorMinCoins[i]) / (colorMaxCoins[i] - colorMinCoins[i]) * 100;
            break;
        }
    }

    progressBar.style.width = `${progressBarWidth}%`;

    playerInfo.appendChild(playerName);
    playerInfo.appendChild(playerCoins);

    playerCard.appendChild(playerInfo);
    playerCard.appendChild(progressBar);

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
        name = cards[i].getElementsByClassName("player-name")[0].textContent;
        if (name.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}

// Call the initClient function to start fetching data
initClient();
