
var BoxbotMap = function (selector) {
    this.element = document.querySelector(selector);
}

BoxbotMap.prototype.create = function (rows, columns) {
    var html = '';
    for (var y = 0; y <= rows; y++) {
        html += '<tr>';
        for (var x = 0; x <= columns; x++) {
            if (x == 0 && y == 0) {
                html += '<td></td>';
            } else {
                if (y == 0) {
                    html += '<td class="boxbot-box" data-type="x-axis">' + x + '</td>';
                } else if (x == 0) {
                    html += '<td class="boxbot-box" data-type="y-axis">' + y + '</td>';
                } else {
                    html += '<td class="boxbot-box" data-type="null"></td>';
                }
            }
        }
        html += '</tr>';
    }

    this.columns = columns;
    this.rows = rows;
    this.element.innerHTML = html;
}

var a = new BoxbotMap('.boxbot-map');
a.create(10, 10);


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
    var left = parseInt(this.element.style.left.replace('px',''));
    if (left < 370){
    this.element.style.left = left + this.element.clientWidth + 'px';
    }    
}



var b = new BoxbotBot('.boxbot-bot');

(function(bot){
    document.querySelector('.command-forward').addEventListener('click',function(event){
        bot.forward();
    },false);
})(b);