export function checkCollision(player1, player2) {
    const dx = player2.x - player1.x;
    const dy = player2.y - player1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    return distance < player1.radius + player2.radius;
}