export class Trap {
    constructor() {
        this.damage = 25;
        this.radius = 20;
        this.active = true;
        this.ownerId = null;
    }

    use(x, y, playerId) {
        this.x = x;
        this.y = y;
        this.ownerId = playerId;
    }

    draw(ctx) {
        if (!this.active) return;

        ctx.beginPath();
        ctx.moveTo(this.x - 10, this.y - 10);
        ctx.lineTo(this.x + 10, this.y + 10);
        ctx.moveTo(this.x + 10, this.y - 10);
        ctx.lineTo(this.x - 10, this.y + 10);
        ctx.strokeStyle = '#ff0000';
        ctx.stroke();
    }

    checkCollision(player) {
        if (!this.active || player.id === this.ownerId) return false;
        
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        return Math.sqrt(dx * dx + dy * dy) < this.radius + player.radius;
    }
}