var Boxbot = function (selector) {
    this.element = document.querySelector('.boxbot');
    this.bot = new BoxbotBot('.boxbot-bot');
    this.map = new BoxbotMap('.boxbot-map');
    this.map.create(10, 10);
    this.map.boundary = {
        top:this.bot.element.clientHeight,
        left:this.bot.element.clientWidth,
        bottom:this.map.element.clientHeight,
        right:this.map.element.clientWidth
    }
}

var ba = new Boxbot();
console.log(ba);
console.log(ba.bot.getCurrentAngle());

document.querySelector('#left').addEventListener('click',function(){ba.bot.turn.call(ba.bot,'left')},false);