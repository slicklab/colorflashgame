import { checkCollision } from '../utils/collision.js';

export class CollisionManager {
    constructor(territory) {
        this.territory = territory;
    }

    checkPlayerCollisions(players) {
        const playerArray = Array.from(players.values());
        const collisions = [];

        for (let i = 0; i < playerArray.length; i++) {
            for (let j = i + 1; j < playerArray.length; j++) {
                const p1 = playerArray[i];
                const p2 = playerArray[j];
                
                if (checkCollision(p1, p2)) {
                    collisions.push({ player1: p1, player2: p2 });
                }
            }
        }

        return collisions;
    }

    handleCollisions(collisions, players) {
        for (const { player1, player2 } of collisions) {
            if (player1.takeDamage(10)) {
                this.territory.transfer(player1.id, player2.id, player2.color);
                players.delete(player1.id);
            }
            if (player2.takeDamage(10)) {
                this.territory.transfer(player2.id, player1.id, player1.color);
                players.delete(player2.id);
            }
        }
    }
}