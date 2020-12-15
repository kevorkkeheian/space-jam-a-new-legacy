// A map of playerName to an array of playerPER values
var playerMap = new Map();

// Variables to keep track of constants
const maxPlayersOnCourt = 5;
const numQuarters = 4;

// Variables to track state throughout the game
var currentQuarter = 0;
var playersOnCourt = 0;
var quarterInPlay = false;

// Variables to track PER throughout the game
var quarterPER = 0;
var quarterAvePER = 0;
var totalAvePER = 0;

// Function to read in all the player stats
function processPlayers(allPlayerStats) {
    // Split the data by newline into an array.
    var allPlayerStatLines = allPlayerStats.split(/\r\n|\n/);

    // Remove the header line (first line)
    allPlayerStatLines.shift();
    // Loop through the rows and create a map entry of player name to a list of player PER
    for (var statLine of allPlayerStatLines) {
        // Get all individual stat values
        var stats = statLine.split(',');
        // If it's just an empty line, skip it
        if (!stats || stats.length <= 1) continue; // empty line

        // The second column has the player name
        var playerName = stats[1];

        // Check if player exists in map
        if (!playerMap.has(playerName)) {
            // First time we see the player; Add them in!
            playerMap.set(playerName, []);
        }

        // Get per value for player
        var per = parseFloat(stats[9]);

        // Add per value to player's array (the next quarter)
        playerMap.get(playerName).push(per);
    }

    // Add the players to the bench.
    displayPlayerBench();
}

// Function to read in all player stats.
function processPlayers(allPlayerStats) {
    // Split the data by newline into an array.
    var allPlayerStatLines = allPlayerStats.split(/\r\n|\n/);

    // Remove the header line (first line)
    allPlayerStatLines.shift();

    // Loop through the 15 players and create a map entry of player name to player PER
    for (var statLine of allPlayerStatLines) {
        // Get all individual stat values
        var stats = statLine.split(',');
        // If it's just an empty line, skip it
        if (!stats || stats.length <= 1) continue; // empty line

        // The second column has the player name
        var playerName = stats[nameIndex];

        // check if player exists in map
        if (!playerMap.has(playerName)) {
            // First time we see the player; Add them in!
            playerMap.set(playerName, []);
        }

        // Get per value for player
        var per = parseFloat(stats[perIndex]);

        // Add per value to player's array (the next quarter)
        playerMap.get(playerName).push(per);
    }

    // Add the players to the bench.
    displayPlayerBench();
}


// Get the bench div in which the players will be shown.
var bench = document.getElementById('playersOnBench');

// For each player, create a button 
for (let playerName of playerMap.keys()) {
    // Create a button for each player
    var newPlayer = document.createElement('button');

    // Set the ID to the name of the player so we can get it later
    newPlayer.id = playerName;

    // Identify the style class, which will set the color scheme
    newPlayer.className = 'playerButton';

    // When the button is clicked, call the movePlayer function
    newPlayer.onclick = movePlayer;

    // Add the players image to the button
    var playerImage = document.createElement('img');

    // Set the source (or location) of the image
    playerImage.src = 'images/'+playerName+'.png';

    // Add the image to the button
    newPlayer.appendChild(playerImage);

    // Add the button to the bench
    bench.appendChild(newPlayer);
}