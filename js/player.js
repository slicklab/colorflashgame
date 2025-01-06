import { HealthBar } from './ui/healthBar.js';
import { Inventory } from './items/inventory.js';
import { Bomb } from './items/bomb.js';
import { Trap } from './items/trap.js';

export class Player {
    constructor(id, name, x, y, color) {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.radius = 20;
        this.speed = 5;
        this.color = color;
        this.velocityX = 0;
        this.velocityY = 0;
        this.health = 100;
        this.healthBar = new HealthBar(100);
        this.inventory = new Inventory();
        this.showHealthBar = false;
        this.healthBarTimeout = null;

        // Start with some items
        this.inventory.addItem(new Bomb());
        this.inventory.addItem(new Trap());
    }

    update(canvasWidth, canvasHeight) {
        this.x += this.velocityX;
        this.y += this.velocityY;

        this.x = Math.max(this.radius, Math.min(canvasWidth - this.radius, this.x));
        this.y = Math.max(this.radius, Math.min(canvasHeight - this.radius, this.y));
    }

    draw(ctx) {
        // Draw player circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();

        // Draw player name
        ctx.font = '14px Arial';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText(this.name, this.x, this.y - this.radius - 5);

        // Draw health bar
        this.healthBar.draw(ctx, this.x, this.y, this.health, this.showHealthBar);
    }

    takeDamage(amount) {
        this.health -= amount;
        this.showHealthBar = true;
        
        // Clear existing timeout
        if (this.healthBarTimeout) {
            clearTimeout(this.healthBarTimeout);
        }
        
        // Hide health bar after 3 seconds
        this.healthBarTimeout = setTimeout(() => {
            this.showHealthBar = false;
        }, 3000);

        return this.health <= 0;
    }

    useItem() {
        this.inventory.useActiveItem(this.x, this.y, this.id);
    }
}