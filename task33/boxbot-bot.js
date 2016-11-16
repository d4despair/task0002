var BoxbotBot = function (selector) {
    this.element = document.querySelector(selector);
    this.width = this.element.clientWidth;
    this.height = this.element.clientHeight;
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
    var angle = this.getCurrentAngle();

    switch (direction) {
        case 'left': this.element.style.transform = 'rotate(' + angle + 90 + 'deg)'
            break;
        default:
            break;
    }

}

BoxbotBot.prototype.getCurrentAngle = function () {
    return parseInt(/\d+/.exec(this.element.style.transform));
}

