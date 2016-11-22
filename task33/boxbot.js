var Boxbot = function (selector) {
    this.element = document.querySelector('.boxbot');
    this.bot = new BoxbotBot('.boxbot-bot');
    this.map = new BoxbotMap('.boxbot-map');
    this.map.create(10, 10);
    this.map.boundary = {
        0: this.bot.element.clientHeight,
        90: this.map.element.clientWidth - this.bot.element.clientWidth,
        180: this.map.element.clientHeight - this.bot.element.clientHeight,
        270: this.bot.element.clientWidth
    }
}

Boxbot.prototype.getCommand = function (blackCode) {
    if (blackCode) {
        this.sendCommand(this.decodeCommand(blackCode));
    }
}

Boxbot.prototype.decodeCommand = function (blackCode) {
    var decoded = blackCode.toLowerCase().split(/\s/);
    var command = {
        action: decoded[0],
        direction: decoded[1] || 'forward',
    }
    return command;
}

Boxbot.prototype.sendCommand = function (command) {
    console.log(command);
    this.bot.rotate(90);
}
