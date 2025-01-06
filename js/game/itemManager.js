export class ItemManager {
    constructor() {
        this.items = new Set();
    }

    addItem(item) {
        this.items.add(item);
    }

    update(players) {
        for (const item of this.items) {
            for (const player of players.values()) {
                if (item.checkCollision(player)) {
                    player.takeDamage(item.damage);
                    item.active = false;
                }
            }
        }

        // Clean up inactive items
        for (const item of this.items) {
            if (!item.active) {
                this.items.delete(item);
            }
        }
    }

    draw(ctx) {
        for (const item of this.items) {
            item.draw(ctx);
        }
    }
}