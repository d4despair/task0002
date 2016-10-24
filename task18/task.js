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
            if (/^\d+$/.test(num)) {
                this.str.unshift(num);
                this.paint();
            } else {
                alert("please enter an interger");
            }
        },

        rightPush: function (num) {
            if (/^\d+$/.test(num)) {
                this.str.push(num);
                this.paint();
            } else {
                alert("please enter an interger");
            }
        },

        leftPop: function () {
            alert(this.str.splice(0, 1));
            this.paint();
        },

        rightPop: function () {
            alert(this.str.pop());
            this.paint();
        },

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