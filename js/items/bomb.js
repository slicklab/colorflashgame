export class Bomb {
    constructor() {
        this.damage = 50;
        this.radius = 30;
        this.active = true;
        this.ownerId = null;
        this.detonationTime = 2000; // 2 seconds
    }

    use(x, y, playerId) {
        this.x = x;
        this.y = y;
        this.ownerId = playerId;
        this.plantTime = Date.now();
    }

    draw(ctx) {
        if (!this.active) return;

        const timeLeft = (this.plantTime + this.detonationTime - Date.now()) / this.detonationTime;
        if (timeLeft <= 0) return;

        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 0, 0, ${timeLeft})`;
        ctx.fill();
    }

    checkCollision(player) {
        if (!this.active || player.id === this.ownerId || 
            Date.now() < this.plantTime + this.detonationTime) return false;

        const dx = player.x - this.x;
        const dy = player.y - this.y;
        return Math.sqrt(dx * dx + dy * dy) < this.radius + player.radius;
    }
}