export class HealthBar {
    constructor(maxHealth = 100) {
        this.maxHealth = maxHealth;
        this.width = 50;
        this.height = 5;
    }

    draw(ctx, x, y, currentHealth, showBar = false) {
        if (!showBar) return;

        const healthPercentage = Math.max(0, currentHealth) / this.maxHealth;
        
        // Background
        ctx.fillStyle = '#333';
        ctx.fillRect(x - this.width/2, y - 30, this.width, this.height);
        
        // Health
        ctx.fillStyle = healthPercentage > 0.5 ? '#2ecc71' : healthPercentage > 0.25 ? '#f1c40f' : '#e74c3c';
        ctx.fillRect(x - this.width/2, y - 30, this.width * healthPercentage, this.height);
    }
}