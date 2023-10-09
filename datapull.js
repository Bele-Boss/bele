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

    playerInfo.appendChild(playerName);
    playerInfo.appendChild(playerCoins);

    playerCard.appendChild(playerInfo);

    // Determine the color of the player card and whether to show a progress bar
    let playerColor = 'Red'; // Default: Red
    let showProgressBar = true;

    if (coins >= 210) {
        playerColor = 'Black'; // Legendary: Black
        showProgressBar = false;
    } else if (coins >= 150) {
        playerColor = 'Pink'; // Pink
    } else if (coins >= 100) {
        playerColor = 'Blue'; // Blue
    } else if (coins >= 60) {
        playerColor = 'Brown'; // Brown
    } else if (coins >= 30) {
        playerColor = 'Green'; // Green
    } else if (coins >= 10) {
        playerColor = 'Yellow'; // Yellow
    }

    playerCard.classList.add(`player-color-${playerColor.toLowerCase()}`);

    if (showProgressBar) {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';

        const progressBarInner = document.createElement('div');
        progressBarInner.className = 'progress-bar-inner';
        progressBarInner.style.width = `${(coins / 210) * 100}%`;

        progressBar.appendChild(progressBarInner);
        playerCard.appendChild(progressBar);
    }

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
