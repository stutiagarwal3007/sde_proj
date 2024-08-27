import React, { useEffect, useState } from 'react';

function App() {
    const [gameState, setGameState] = useState(null);
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const websocket = new WebSocket('ws://localhost:8080');
        websocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setGameState(data);
        };
        setWs(websocket);
        return () => websocket.close();
    }, []);

    const sendMove = (move) => {
        if (ws) {
            ws.send(JSON.stringify(move));
        }
    };

    return (
        <div>
            <h1>Chess-like Game</h1>
            {/* Render game board and controls */}
        </div>
    );
}

export default App;
const renderBoard = () => {
    return (
        <div className="board">
            {gameState.board.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, colIndex) => (
                        <div key={colIndex} className="cell">
                            {cell || ' '}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};
const handleCharacterClick = (character) => {
    // Display valid moves
};
