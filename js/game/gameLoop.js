export class GameLoop {
    constructor(game) {
        this.game = game;
        this.isRunning = false;
    }

    start() {
        this.isRunning = true;
        this.loop();
    }

    stop() {
        this.isRunning = false;
    }

    loop() {
        if (!this.isRunning) return;

        this.game.update();
        this.game.draw();
        requestAnimationFrame(() => this.loop());
    }
}