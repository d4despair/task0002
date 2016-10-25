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

var x = function () {
    var input = $("text").value.trim();
    var str = [1, 2];
    input = input.split(/[\s.,，、\t]+/g);
    str = str.concat(input);
    console.log(str);
};


window.onload = function () {

    var queue = {

        str: [],

        leftPush: function (num) {
            this.str = this.splitInput().concat(this.str);
            this.paint();
        },

        rightPush: function (num) {
            this.str = this.str.concat(this.splitInput());
            this.paint();
        },

        leftPop: function () {
            if (!this.isEmpty()) {
                alert(this.str.splice(0, 1));
                this.paint();
            }
        },

        rightPop: function () {
            if (!this.isEmpty()) {
                alert(this.str.pop());
                this.paint();
            }
        },

        search: function () {
            var arr = [];
            var str = "";
            var reg = new RegExp("(" + $("search-text").value + ")", "g");
            for (var item in this.str) {
                arr[item] = this.str[item];
            }
            for (var i = 0, len = arr.length; i < len; i++) {
                if (reg.test(arr[i])) {
                    arr[i] = arr[i].replace(reg, "<span>$1</span>");
                    str += "<div class='num-block' data-arr=" + i + ">" + arr[i] + "</div>";
                } else
                    str += "<div class='num-block' data-arr=" + i + ">" + arr[i] + "</div>";
            }
            $("num-block-warp").innerHTML = str;
        },

        deleteDiv: function (arr) {
            alert(this.str.splice(arr, 1));
            this.paint();
        },

        isEmpty: function () {
            return (this.str.length == 0);
        },

        checkInput: function () {
            console.log("先不管");
        },

        splitInput: function () {
            var input = $("text").value.trim();
            input = input.split(/[\s.,，、\t]+/g);
            return input;
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
            case "left-push": queue.leftPush(parseInt($("text").value));
                break;
            case "right-push": queue.rightPush(parseInt($("text").value));
                break;
            case "left-pop": queue.leftPop();
                break;
            case "right-pop": queue.rightPop();
                break;
            case "search": queue.search();
                break;
        }
    });

    addEventHandler($("num-block-warp"), "click", function (event) {
        queue.deleteDiv(parseInt(event.target.dataset.arr));
    });
}

var numbers = ["1", 2, "3", 4, "", 4, 3, "", 1];
var everyResult = numbers.filter(function (e, d) {
    console.log(d + ":" + e);
    return (e.length>0);
});
console.log(everyResult);