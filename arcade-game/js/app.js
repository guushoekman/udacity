var timerRockElement = document.querySelector('.timer-rock');
var timerGrassElement = document.querySelector('.timer-grass');
var timerBestRockElement = document.querySelector('.timer-best--rock');
var timerBestGrassElement = document.querySelector('.timer-best-grass');
var winNotification = document.querySelector('.win-notification');

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player('images/char-boy.png');
var allEnemies = [
    new Enemy(),
    new Enemy(),
    new Enemy()
];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (ctx) {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});