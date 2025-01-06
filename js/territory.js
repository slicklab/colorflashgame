import { GRID_SIZE } from './constants.js';

export class Territory {
    constructor() {
        this.grid = new Map(); // Key: "x,y", Value: { owner: playerId, color: color }
    }

    claim(x, y, playerId, color) {
        const gridX = Math.floor(x / GRID_SIZE);
        const gridY = Math.floor(y / GRID_SIZE);
        const key = `${gridX},${gridY}`;
        this.grid.set(key, { owner: playerId, color });
    }

    remove(playerId) {
        for (const [key, value] of this.grid.entries()) {
            if (value.owner === playerId) {
                this.grid.delete(key);
            }
        }
    }

    transfer(fromPlayerId, toPlayerId, toColor) {
        for (const [key, value] of this.grid.entries()) {
            if (value.owner === fromPlayerId) {
                value.owner = toPlayerId;
                value.color = toColor;
            }
        }
    }

    draw(ctx, canvasWidth, canvasHeight) {
        for (const [key, value] of this.grid.entries()) {
            const [x, y] = key.split(',').map(Number);
            ctx.fillStyle = value.color;
            ctx.fillRect(
                x * GRID_SIZE,
                y * GRID_SIZE,
                GRID_SIZE,
                GRID_SIZE
            );
        }
    }
}