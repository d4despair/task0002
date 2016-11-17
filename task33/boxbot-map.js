var BoxbotMap = function (selector) {
    this.element = document.querySelector(selector);
}

BoxbotMap.prototype.create = function (rows, columns) {
    var html = '';
    for (var y = 0; y <= rows; y++) {
        html += '<tr>';
        for (var x = 0; x <= columns; x++) {
            if (x == 0 && y == 0) {
                html += '<td id="first-box"></td>';
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

BoxbotMap.prototype.getBoundary = function(){
    this.boundary = {};
}


/*
(function(bot){
    document.querySelector('.command-forward').addEventListener('click',function(event){
        bot.forward();
    },false);
})(b);
*/
