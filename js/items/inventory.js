export class Inventory {
    constructor() {
        this.items = new Map();
        this.activeItemIndex = 0;
        this.maxItems = 3;
    }

    addItem(item) {
        if (this.items.size < this.maxItems) {
            this.items.set(this.items.size, item);
            return true;
        }
        return false;
    }

    getActiveItem() {
        return this.items.get(this.activeItemIndex);
    }

    cycleActiveItem() {
        this.activeItemIndex = (this.activeItemIndex + 1) % this.maxItems;
    }

    useActiveItem(x, y, playerId) {
        const item = this.getActiveItem();
        if (item) {
            item.use(x, y, playerId);
            this.items.delete(this.activeItemIndex);
        }
    }
}