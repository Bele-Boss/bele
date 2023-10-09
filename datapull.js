// Your API Key and Sheet ID
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
        // Fetch data
        fetchSheetData();
    });
}

// Function to create a player card element
function createPlayerCard(player) {
    const { rank, name, coins, winRate } = player;

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

    const playerWinRate = document.createElement('span'); // New element for win rate
    playerWinRate.className = 'player-winrate';
    playerWinRate.textContent = `Win Rate: ${winRate}%`;

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';

    // ... (rest of the code remains the same)

    playerInfo.appendChild(playerName);
    playerInfo.appendChild(playerCoins);
    playerInfo.appendChild(playerWinRate); // Append win rate to player info
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
            const players = values.map((row, index) => ({
                rank: index + 1,
                name: row[1],
                coins: parseInt(row[2]),
                winRate: parseFloat(row[3]) // Assuming win rate is in the 4th column
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
// ... (previous code)

// Determine the color of the progress bar based on coin count
let progressBarColor = '#F44336'; // Default: Red

if (coins >= 11 && coins <= 30) {
    progressBarColor = '#FFEB3B'; // Yellow
} else if (coins >= 31 && coins <= 60) {
    progressBarColor = '#4CAF50'; // Green
} else if (coins >= 61 && coins <= 100) {
    progressBarColor = '#795548'; // Brown
} else if (coins >= 101 && coins <= 150) {
    progressBarColor = '#2196F3'; // Blue
} else if (coins >= 151 && coins <= 210) {
    progressBarColor = '#E91E63'; // Pink
} else if (coins > 210) {
    progressBarColor = '#000000'; // Black
}

progressBar.style.backgroundColor = progressBarColor;

// ... (rest of the code)

// Call the initClient function to start fetching data
initClient();
