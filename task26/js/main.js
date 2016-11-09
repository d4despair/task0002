function $(id) {
    return document.getElementById(id);
}

function addEvent(ele, event, handler) {
    if (ele.addEventListener) {
        ele.addEventListener(event, handler, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on" + event, handler);
    } else {
        ele["on" + event] = handler;
    }
}

var fuel = 100;

function Spaceship(num) {
    this._id = num;
    this.ship = $("ship" + num);
    this.state = "STOP";
    this.fuel = 100;
    this.consumeRate = 5;
    this.chargeRate = 2;
    this.speed = 5;
    this.rate = 1000 / this.speed;
    this.animaition = null;
}

Spaceship.prototype = {
    launch: function () {
        if (!this.ship) {
            this.ship = document.createElement("div");
            this.ship.id = "ship" + this._id;
            this.ship.className = "spaceship" + " ship" + this._id;
            var test = document.createElement("div");
            test.id = "test";
            test.innerHTML = "100%";
            this.ship.appendChild(test);
            $("universe").appendChild(this.ship);
        } else {
            console.log("already launched");
        }
    },
    start: function () {
        var that = this;
        that.ship.style.animationPlayState = "running";
        that.state = "RUN";
        clearInterval(that.animaition);
        that.animaition = setInterval(function () {
            console.log(that.fuel);
            $("test").innerHTML = that.fuel + "%";
            $("test").style.width = that.fuel + "%";
            that.fuel -= that.consumeRate;
            if (that.fuel <= 0) {
                that.fuel = 0;
                clearInterval(that.animaition);
                that.animaition = null;
                console.log("run out");
                $("test").innerHTML = that.fuel + "%";
                $("test").style.width = that.fuel + "%";
                that.stop();
            }
        }, that.rate)
    },
    stop: function () {
        var that = this;
        that.ship.style.animationPlayState = "paused";
        that.state = "STOP";
        clearInterval(that.animaition);
        that.animaition = setInterval(function () {
            console.log(that.fuel);
            $("test").innerHTML = that.fuel + "%";
            $("test").style.width = that.fuel + "%";
            that.fuel += that.chargeRate;
            if (that.fuel >= 100) {
                that.fuel = 100;
                clearInterval(that.animaition);
                that.animaition = null;
                console.log(that.fuel);
                $("test").innerHTML = that.fuel + "%";
                $("test").style.width = that.fuel + "%";
            }
        }, this.rate)
    },
    destroy: function () {
        this.ship.parentNode.removeChild(this.ship);
    },
    init: function () {
        var that = this;
        addEvent(document, "click", function (event) {
            var target = event.target;
            switch (target.id) {
                case "launch": that.launch();
                    break;
                case "start": that.start();
                    break;
                case "stop": that.stop();
                    break;
                case "destroy": that.destroy();
                    break;
            }
        })
    }
}

var ship1 = new Spaceship(2);

ship1.init();

/**
 * 报告时间
 */
function getTime() {
    var date = new Date();
    var year = ("0000" + date.getFullYear()).substr(-4);
    var month = ("00" + (date.getMonth() + 1)).substr(-2);
    var day = ("00" + date.getDay()).substr(-2);
    var hour = ("00" + date.getHours()).substr(-2);
    var minute = ("00" + date.getMinutes()).substr(-2);
    var second = ("00" + date.getSeconds()).substr(-2);
    var millisecond = ("000" + date.getMilliseconds()).substr(-3);
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second + "." + millisecond;
}

/**
 * 拖动大法好
 */
(function () {
    var isDragging = 0;
    var start = {};
    var draggingElement = null;

    addEvent(document, "mousedown", function (e) {
        var target = e.target;
        if (target.className == "dragable") {
            //寻找失散多年的父亲
            (function (dragable) {
                draggingElement = dragable.parentNode;
                if (draggingElement.className == "dragable-parent") {
                    return;
                } else {
                    arguments.callee(draggingElement);
                }
            })(target);
            //初始化位置
            if (!isDragging) {
                isDragging = 1;
                start.x = e.clientX;
                start.y = e.clientY;
                //为right、bottom定制的条件
                if (draggingElement.style.right) {
                    draggingElement.style.left = window.innerWidth - draggingElement.offsetWidth - draggingElement.style.right.replace("px", "");
                    draggingElement.style.right = "";
                }
                if (draggingElement.style.bottom) {
                    draggingElement.style.top = window.innerHeight - draggingElement.offsetHeight - draggingElement.style.bottom.replace("px", "");
                    draggingElement.style.bottom = "";
                }
                start.left = draggingElement.style.left.replace("px", "");
                start.top = draggingElement.style.top.replace("px", "");
                console.log("drag!!!");
            }
        }
    });

    addEvent(document, "mousemove", function (e) {
        if (isDragging) {
            var x = e.clientX;
            var y = e.clientY;
            //修正拖动对象的坐标位置
            var a = start.x - start.left;
            var b = start.y - start.top;
            var leftBoundary = 0;
            var topBoundary = 0;
            var rightBoundary = window.innerWidth - draggingElement.offsetWidth;
            var bottomBoundary = window.innerHeight - draggingElement.offsetHeight;
            draggingElement.style.left = x - a;
            draggingElement.style.top = y - b;
            if (x - a < leftBoundary) {
                draggingElement.style.left = leftBoundary;
            }
            if (y - b < topBoundary) {
                draggingElement.style.top = topBoundary;
            }
            if (x - a > rightBoundary) {
                draggingElement.style.left = rightBoundary;
            }
            if (y - b > bottomBoundary) {
                draggingElement.style.top = bottomBoundary;
            }
        }
    })

    addEvent(document, "mouseup", function () {
        isDragging = 0;
        draggingElement = null;
    })
})();
