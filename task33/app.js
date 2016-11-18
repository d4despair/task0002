var Application = function () {
    this.boxbot = new Boxbot();
    this.$text = document.querySelector('#command-text');
    this.$confirm = document.querySelector('#confirm');

    this.init();
}

Application.prototype.init = function () {
    document.addEventListener('keydown', this.hotkey.bind(this));
    this.$confirm.addEventListener('click', this.confirm.bind(this));
}

Application.prototype.confirm = function () {
    var command = this.$text.value.trim();
    console.log('command:' + command);
    this.boxbot.getCommand(command);
}

Application.prototype.hotkey = function (event) {
    if (event.target.tagName == 'BODY') {
        var commands = {
            37: 'turn left',
            38: 'go',
            39: 'turn right',
            40: 'turn back'
        }
        this.boxbot.getCommand(commands[event.keyCode]);
    }
}

new Application();