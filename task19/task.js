function $(id) {
    return document.getElementById(id);
}

function addEventHandler(element, event, handler) {
    if (element.addEventListener) {
        element.addEventListener(event, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + event, handler);
    } else {
        element["on" + event] = handler;
    }
}

<<<<<<< HEAD

=======
>>>>>>> d42f27a748a1c9b6df7bfc887b1135540b3e82ae
window.onload = function () {

    var queue = {

        str: [],

        leftPush: function (num) {
            if (this.overLimit()) {
                $("deleted").innerHTML = "排列数量超过最大限制";
            } else if (this.inputCheck(num)) {
                this.str.unshift(num);
                this.paint();
            } else {
                $("deleted").innerHTML = "请输入一个[10-100]的整数";
            }
        },

        rightPush: function (num) {
            if (this.overLimit()) {
                $("deleted").innerHTML = "排列数量超过最大限制";
            } else if (this.inputCheck(num)) {
                this.str.push(num);
                this.paint();
            } else {
                $("deleted").innerHTML = "请输入一个[10-100]的整数";
            }
        },

        leftPop: function () {
            if (!this.isEmpty()) {
                $("deleted").innerHTML = this.str.splice(0, 1);
                this.paint();
            }
        },

        rightPop: function () {
            if (!this.isEmpty()) {
                $("deleted").innerHTML = this.str.pop();
                this.paint();
            }
        },
        random: function () {
            this.str = [];
            for (var i = 0; i < 50; i++) {
                this.str[i] = Math.ceil(Math.random() * 90) + 10;
            }
            this.paint();
        },

        bubble: function () {

            for (var i = 1; i < this.str.length; i++) {
                if (this.str[i - 1] > this.str[i]) {
                    var temp = this.str[i];
                    this.str[i] = this.str[i - 1];
                    this.str[i - 1] = temp;
                    this.flag = 1;
                }
            }
            this.paint();
            if (flag == 0) window.clearInterval(window.setInterval(queue.bubble(), 50));
        },

        isEmpty: function () {
            return (this.str.length == 0);
        },

        inputCheck: function (num) {
            num = num.trim();
            return (/^\d+$/.test(num) && (num >= 10) && (num <= 100));
        },

        overLimit: function () {
            return (this.str.length >= 60);
        },

        deleteDiv: function (arr) {
            $("deleted").innerHTML = this.str.splice(arr, 1);
            this.paint();
        },
        bubble: function () {
            for (var i = 0; i < this.str.length; i++) {
                for (var j = i + 1; j < this.str.length; j++) {
                    if (this.str[i] > this.str[i + 1]) {
                        var x = this.str[i + 1];
                        this.str[i + 1] = this.str[i];
                        this.str[i] = x;
                        this.paint();
                        this.bubble();
                    }
                    
                }
            }
            
        },

        paint: function () {
            var str = "";
            for (var i = 0, len = this.str.length; i < len; i++) {
                str += "<div class='num-block' data-arr=" + i + " title=" + this.str[i] + " style='height:" + this.str[i] + "'></div>";
            }
            $("num-block-warp").innerHTML = str;
        }

    }

    addEventHandler($("input-form"), "click", function (event) {
        switch (event.target.id) {
            case "left-push": queue.leftPush($("text").value);
                break;
            case "right-push": queue.rightPush($("text").value);
                break;
            case "left-pop": queue.leftPop();
                break;
            case "right-pop": queue.rightPop();
                break;
            case "random": queue.random();
                break;
<<<<<<< HEAD
            case "bubble": queue.bubble();
=======
            case "bubble": {
                var Clock;
                var count = 0, i = 0;
                console.log(queue.str.length)
                Clock = setInterval(function () {
                    if (count >= queue.str.length) {
                        clearInterval(Clock);
                    }
                    if (i == queue.str.length - 1 - count) {
                        i = 0;
                        count++;
                    }
                    if (queue.str[i] > queue.str[i + 1]) {
                        var temp = queue.str[i];
                        queue.str[i] = queue.str[i + 1];
                        queue.str[i + 1] = temp;
                        queue.paint();
                    }
                    i++;
                }, 100);
            }
>>>>>>> d42f27a748a1c9b6df7bfc887b1135540b3e82ae
                break;
            default: return;
        }
    });

    addEventHandler($("num-block-warp"), "click", function (event) {
        var dataset = event.target.dataset.arr;
        if (!isNaN(dataset)) { queue.deleteDiv(parseInt(dataset)); }
    });
}
