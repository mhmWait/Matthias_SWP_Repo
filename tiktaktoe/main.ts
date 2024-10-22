import { serve } from "https://deno.land/std@0.106.0/http/server.ts";
import {
    acceptWebSocket,
    isWebSocketCloseEvent,
} from "https://deno.land/std@0.106.0/ws/mod.ts";

const PORT = 3741;
const server = serve({ port: PORT });

interface Board {
    f1: string;
    f2: string;
    f3: string;
    f4: string;
    f5: string;
    f6: string;
    f7: string;
    f8: string;
    f9: string;
}

let gameBoard: Board = {
    f1: " ",
    f2: " ",
    f3: " ",
    f4: " ",
    f5: " ",
    f6: " ",
    f7: " ",
    f8: " ",
    f9: " ",
};

let currentTurn = 1;
let gameResult: number = 0;
const playerConnections = new Map<number, WebSocket>();

console.log(`Server running at: http://localhost:${PORT}/`);

for await (const req of server) {
    if (req.url === "/ws") {
        const { conn, r: bufReader, w: bufWriter, headers } = req;
        acceptWebSocket({ conn, bufReader, bufWriter, headers })
            .then((socket) => handlePlayerConnection(socket))
            .catch((err) => {
                console.error("WebSocket connection failed:", err);
                req.respond({ status: 400 });
            });
    } else {
        req.respond({
            headers: new Headers({ "content-type": "text/html" }),
            body: await Deno.readTextFile("index.html"),
        });
    }
}

async function handlePlayerConnection(socket: WebSocket) {
    console.log("Player connected");

    const playerId = playerConnections.size + 1;
    playerConnections.set(playerId, socket);
    await socket.send(JSON.stringify({ playerNumber: playerId }));

    if (playerConnections.size === 2) {
        startGame();
    }

    for await (const event of socket) {
        if (typeof event === "string") {
            const receivedData = JSON.parse(event);
            if (!validateMove(receivedData.field, gameBoard)) {
                console.log("Invalid move detected");
                continue;
            }

            gameBoard = receivedData.field;
            currentTurn = toggleTurn(currentTurn);

            if (checkForWin(gameBoard)) {
                broadcastResult(playerId, receivedData.field);
                break;
            } else if (isDraw(gameBoard)) {
                broadcastResult(99, receivedData.field); // Draw
                break;
            }

            broadcastUpdate(currentTurn, gameBoard);
        } else if (isWebSocketCloseEvent(event)) {
            console.log(`Player ${playerId} disconnected`);
            playerConnections.delete(playerId);
        }
    }
}

function startGame() {
    console.log("Starting the game!");
    broadcastUpdate(1, gameBoard);
}

function broadcastUpdate(turn: number, board: Board) {
    const updateMessage = { turn, field: board };
    playerConnections.forEach(async (playerSocket) => {
        await playerSocket.send(JSON.stringify(updateMessage));
    });
}

function broadcastResult(winner: number, board: Board) {
    const resultMessage = { turn: winner, field: board };
    playerConnections.forEach(async (playerSocket) => {
        await playerSocket.send(JSON.stringify(resultMessage));
    });
}

function validateMove(newBoard: Board, oldBoard: Board): boolean {
    let differences = 0;
    const newFields = Object.values(newBoard);
    const oldFields = Object.values(oldBoard);

    for (let i = 0; i < newFields.length; i++) {
        if (oldFields[i] !== " " && newFields[i] !== oldFields[i]) {
            return false;
        }
        if (newFields[i] !== oldFields[i]) {
            differences++;
        }
    }

    if (differences !== 1) {
        console.log("Invalid move: more than one change detected");
        return false;
    }
    return true;
}

function checkForWin(board: Board): boolean {
    const winPatterns = [
        [board.f1, board.f2, board.f3],
        [board.f4, board.f5, board.f6],
        [board.f7, board.f8, board.f9],
        [board.f1, board.f4, board.f7],
        [board.f2, board.f5, board.f8],
        [board.f3, board.f6, board.f9],
        [board.f1, board.f5, board.f9],
        [board.f3, board.f5, board.f7],
    ];

    for (const pattern of winPatterns) {
        if (
            pattern[0] === pattern[1] &&
            pattern[1] === pattern[2] &&
            pattern[0] !== " "
        ) {
            gameResult = currentTurn + 90;
            return true;
        }
    }
    return false;
}

function isDraw(board: Board): boolean {
    if (Object.values(board).every((cell) => cell !== " ")) {
        gameResult = 99; // Draw
        return true;
    }
    return false;
}

function toggleTurn(current: number): number {
    return current === 1 ? 2 : 1;
}
