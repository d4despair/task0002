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

window.onload = function () {

    var queue = {

        str: [],

        leftPush: function (num) {
            if (this.overLimit()) {
                alert("排列数量超过最大限制");
            } else if (this.inputCheck(num)) {
                this.str.unshift(num);
                this.paint();
            } else {
                alert("请输入一个[10-100]的整数");
            }
        },

        rightPush: function (num) {
            if (this.overLimit()) {
                alert("排列数量超过最大限制");
            } else if (this.inputCheck(num)) {
                this.str.push(num);
                this.paint();
            } else {
                alert("请输入一个[10-100]的整数");
            }
        },

        leftPop: function () {
            if (!this.isEmpty) {
                alert(this.str.splice(0, 1));
                this.paint();
            }
        },

        rightPop: function () {
            if (!this.isEmpty) {
                alert(this.str.pop());
                this.paint();
            }
        },

        isEmpty: function () {
            return this.str.length == 0;
        },

        inputCheck: function (num) {
            num = num.trim();
            return (/^\d+$/.test(num) && (num >= 10) && (num <= 100));
        },

        overLimit: function () {
            return (this.str.length >= 60);
        }
        ,

        deleteDiv: function (arr) {
            alert(this.str.splice(arr, 1));
            this.paint();
        },

        paint: function () {
            var str = "";
            for (var i = 0, len = this.str.length; i < len; i++) {
                str += "<div class='num-block' data-arr=" + i + ">" + this.str[i] + "</div>";
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
        }
    });

    addEventHandler($("num-block-warp"), "click", function (event) {
        queue.deleteDiv(parseInt(event.target.dataset.arr));
    });
}