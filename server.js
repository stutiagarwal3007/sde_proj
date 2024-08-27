const WebSocket = require('ws');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let gameState = {
    board: Array(5).fill().map(() => Array(5).fill(null)),
    players: {},
    turn: 'A',  // Starting player
};

// Function to initialize the game
function initializeGame() {
    gameState.board[0] = ['A-P1', 'A-P2', 'A-P3', 'A-P4', 'A-P5']; // Player A's pawns
    gameState.board[1] = ['A-H1', 'A-H2', null, null, null]; // Player A's heroes
    gameState.board[3] = ['B-P1', 'B-P2', 'B-P3', 'B-P4', 'B-P5']; // Player B's pawns
    gameState.board[4] = ['B-H1', 'B-H2', null, null, null]; // Player B's heroes

    // Optionally, set up player information
    gameState.players['A'] = { characters: ['P1', 'P2', 'P3', 'P4', 'P5', 'H1', 'H2'] };
    gameState.players['B'] = { characters: ['P1', 'P2', 'P3', 'P4', 'P5', 'H1', 'H2'] };
}

// Handle WebSocket connections
wss.on('connection', (ws) => {
    const playerId = Object.keys(gameState.players).length === 0 ? 'A' : 'B';
    gameState.players[playerId] = { ws }; // Store WebSocket connection for communication

    // If both players are connected, initialize the game
    if (Object.keys(gameState.players).length === 2) {
        initializeGame();
        // Notify both players that the game has started
        wss.clients.forEach(client => {
            client.send(JSON.stringify({ type: 'gameStarted', gameState }));
        });
    }
});

// Start the server
server.listen(8080, () => {
    console.log('Server is listening on port 8080');
});
function isValidMove(character, move) {
    // Implement validation logic based on character type and move command
    return true; // Placeholder for actual validation
}

function handleMove(character, move) {
    // Validate the move
    if (!isValidMove(character, move)) {
        // Notify the client about the invalid move
        return;
    }
    // Update game state with the move
    updateGameState(character, move);
}

function updateGameState(character, move) {
    // Update the board and character positions
    // Check for win conditions
    if (checkWinCondition()) {
        // Notify clients about the game over
    }
}
