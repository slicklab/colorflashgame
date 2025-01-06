export class InputHandler {
    constructor(player) {
        this.player = player;
        this.setupEventListeners();
    }

    setupEventListeners() {
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }

    handleKeyDown(e) {
        switch(e.key) {
            case 'ArrowLeft':
            case 'a':
                this.player.velocityX = -this.player.speed;
                break;
            case 'ArrowRight':
            case 'd':
                this.player.velocityX = this.player.speed;
                break;
            case 'ArrowUp':
            case 'w':
                this.player.velocityY = -this.player.speed;
                break;
            case 'ArrowDown':
            case 's':
                this.player.velocityY = this.player.speed;
                break;
            case 'e':
                this.player.inventory.cycleActiveItem();
                break;
            case ' ':
                this.player.useItem();
                break;
        }
    }

    handleKeyUp(e) {
        switch(e.key) {
            case 'ArrowLeft':
            case 'a':
            case 'ArrowRight':
            case 'd':
                this.player.velocityX = 0;
                break;
            case 'ArrowUp':
            case 'w':
            case 'ArrowDown':
            case 's':
                this.player.velocityY = 0;
                break;
        }
    }
}