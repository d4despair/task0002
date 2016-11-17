var NORTH = 0
var EAST = 90
var SOUTH = 180
var WEST = 270

var BoxbotBot = function (selector) {
    this.element = document.querySelector(selector);
    this.init();
}

BoxbotBot.prototype.init = function () {
    this.element.style.left = this.element.clientWidth + 'px';
    this.element.style.top = this.element.clientHeight + 'px';
    this.element.style.transform = 'rotate(0deg)';
}

BoxbotBot.prototype.forward = function () {
    var left = parseInt(this.element.style.left.replace('px', ''));
    if (left < 370) {
        this.element.style.left = left + this.element.clientWidth + 'px';
    }
}

BoxbotBot.prototype.turn = function (direction) {
    var CurrentAngle = this.getCurrentAngle();
    console.log(CurrentAngle);

    var whichWay = {
        right: 90,
        left: -90,
        back: 180
    }
    this.element.style.transform = 'rotate(' + (CurrentAngle + whichWay[direction]) + 'deg)'
}

BoxbotBot.prototype.go = function () {
    var currentDirection = this.getCurrentDirection();
    var currentPosition = this.getCurrentPositon();
    var distance = this.element.clientWidth;
    var whichWay = {
        0: [0, -distance],
        90: [distance, 0],
        180: [0, distance],
        270: [-distance, 0]
    }
    this.element.style.left = currentPosition[0] + whichWay[currentDirection][0];
    this.element.style.top = currentPosition[1] + whichWay[currentDirection][1];
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


/**
 * @param {string} command
 */
BoxbotBot.prototype.commandDecoder = function (command) {

}
