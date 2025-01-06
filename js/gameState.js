export class GameState {
    constructor() {
        this.score = 0;
        this.health = 100;
    }

    update() {
        if (this.health <= 0) {
            alert('Game Over! Score: ' + Math.floor(this.score));
            this.reset();
        }
    }

    reset() {
        this.score = 0;
        this.health = 100;
    }

    addScore(points) {
        this.score += points;
    }

    takeDamage(amount) {
        this.health -= amount;
    }
}