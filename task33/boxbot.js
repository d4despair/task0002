var Boxbot = function (selector) {
    this.element = document.querySelector('.boxbot');
    this.bot = new BoxbotBot('.boxbot-bot');
    this.map = new BoxbotMap('.boxbot-map');
    this.map.create(10, 10);
}

var ba = new Boxbot();
document.querySelector('#left').addEventListener('click', function () { ba.bot.turn.call(ba.bot, 'left') }, false);
document.querySelector('#right').addEventListener('click', function () { ba.bot.turn.call(ba.bot, 'right') }, false);
document.querySelector('#back').addEventListener('click', function () { ba.bot.turn.call(ba.bot, 'back') }, false);
document.querySelector('#confirm').addEventListener('click', function () {
    var command = document.querySelector('#command-text').value.trim();
    console.log('command:' + command);
    if (command) {
        command = command.toLowerCase();
        command = command.split(/\s/);
        ba.bot[command[0]].call(ba.bot, command[1]);
    }
}, false);