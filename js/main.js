import { Player } from './player.js';
import { Territory } from './territory.js';
import { PlayerForm } from './ui/playerForm.js';
import { ColorSelector } from './ui/colorSelector.js';
import { InputHandler } from './input/inputHandler.js';
import { GameLoop } from './game/gameLoop.js';
import { CollisionManager } from './game/collisionManager.js';
import { ItemManager } from './game/itemManager.js';

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 600;
        
        this.territory = new Territory();
        this.players = new Map();
        this.collisionManager = new CollisionManager(this.territory);
        this.itemManager = new ItemManager();
        this.gameLoop = new GameLoop(this);
        
        this.showPlayerForm();
    }

    showPlayerForm() {
        const playerForm = new PlayerForm((name) => {
            playerForm.hide();
            this.showColorSelector(name);
        });
        playerForm.show();
    }

    showColorSelector(playerName) {
        const colorSelector = new ColorSelector((color) => {
            colorSelector.hide();
            this.startGame(playerName, color);
        });
        colorSelector.show();
    }

    startGame(playerName, color) {
        this.localPlayerId = 'player1';
        
        const player = new Player(
            this.localPlayerId,
            playerName,
            this.canvas.width / 2,
            this.canvas.height / 2,
            color
        );
        this.players.set(this.localPlayerId, player);
        
        this.inputHandler = new InputHandler(player);
        this.gameLoop.start();
    }

    update() {
        // Update all players
        for (const [id, player] of this.players) {
            player.update(this.canvas.width, this.canvas.height);
            this.territory.claim(player.x, player.y, id, player.color);
        }

        // Handle collisions
        const collisions = this.collisionManager.checkPlayerCollisions(this.players);
        this.collisionManager.handleCollisions(collisions, this.players);

        // Update items
        this.itemManager.update(this.players);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw territory
        this.territory.draw(this.ctx, this.canvas.width, this.canvas.height);
        
        // Draw items
        this.itemManager.draw(this.ctx);
        
        // Draw players
        for (const player of this.players.values()) {
            player.draw(this.ctx);
        }
    }
}

// Start the game
new Game();