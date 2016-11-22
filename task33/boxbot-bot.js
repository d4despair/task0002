var BoxbotBot = function (selector) {
    this.element = document.querySelector(selector);
    this.init();
}

BoxbotBot.prototype.init = function () {
    this.element.style.left = this.element.clientWidth + 'px';
    this.element.style.top = this.element.clientHeight + 'px';
    this.element.style.transform = 'rotate(0deg)';
}

/**
 * @param {int} direction 用角度代表方向，0 = TOP 90 = RIGHT 180 = BOTTOM 270 = LEFT
 */
BoxbotBot.prototype.turn = function (direction) {
    var LEFT = 270
    if (direction == LEFT) {
        direction = -90;
    }
    this.element.style.transform = 'rotate(' + (this.getCurrentAngle() + direction) + 'deg)';
}

BoxbotBot.prototype.rotate = function (direction) {
    var currentAngle = this.getCurrentAngle();
    var currentDirection = this.getCurrentDirection();
    var differAngle = (direction - currentDirection) % 360;
    this.element.style.transform = 'rotate(' + (currentAngle + differAngle) + 'deg)';
}

BoxbotBot.prototype.getCurrentAngle = function () {
    return parseInt(/-?\d+/.exec(this.element.style.transform)[0]);
}

BoxbotBot.prototype.getCurrentDirection = function () {
    var angle = this.getCurrentAngle() % 360;
    return angle >= 0 ? angle : angle + 360;
}

BoxbotBot.prototype.getCurrentPositon = function () {
    var x = parseInt(this.element.style.left.replace('px', ''));
    var y = parseInt(this.element.style.top.replace('px', ''));
    return [x, y]
}