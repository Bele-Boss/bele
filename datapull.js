// Replace 'YOUR_API_KEY' with your Google API Key
const API_KEY = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
const SHEET_ID = '1Bcl1EVN-7mXUP7M1FL9TBB5v4O4AFxGTVB6PwqOn9ss';
const SHEET_NAME = 'Rank';

// Load the Google Sheets API
function loadClient() {
    gapi.client.setApiKey(API_KEY);
    return gapi.client.load('https://sheets.googleapis.com/$discovery/rest?version=v4')
        .then(function() {
            console.log('GAPI client loaded for API');
        },
        function(err) { console.error('Error loading GAPI client for API', err); });
}

// Initialize the Google Sheets API client
function initClient() {
    gapi.load('client', loadClient);
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
            const playerContainer = document.getElementById('playerContainer');
            playerContainer.innerHTML = ''; // Clear existing content

            values.forEach(function(row) {
                // Your existing logic to create and append player cards
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
    // Your existing logic to search and filter data
}

// Call initClient when the page loads
window.onload = initClient;
