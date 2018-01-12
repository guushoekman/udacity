/**
 * @description High level object that represents any object that interact with the user (and the user too).
 * @constructor
 * @param {string} sprite sprite of the object
 */
var GameEntity = function(sprite) {
  this.sprite = sprite;
  this.x = 0;
  this.y = 0;
  this.width = 0;
  this.height = 0;
  this.initialX = 0;
  this.initialY = 0;
};

/**
 * @description Update the game entity and game board.
 * @param {number} dt tick of the game on device
 */
GameEntity.prototype.update = function(dt) {};

/**
 * @description Render a object (with sprite) based on X and y coordinates. The first pixel position of the 
 * sprite is top left of canvas
 */
GameEntity.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description Reset the object to your initial position.
 */
GameEntity.prototype.reset = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
