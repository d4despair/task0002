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

(function () {
    var flag = 0;
    var start = {};



    addEvent($("drag"), "mousedown", function (e) {
        var target = e.target;
        if (!flag) {
            flag = 1;
            start.x = e.clientX;
            start.y = e.clientY;
            start.left = target.style.left.replace("px", "");
            start.top = target.style.top.replace("px", "");
            console.log("drag!!!");
        }
    });

    addEvent(document, "mousemove", function (e) {
        var target = $("drag");
        if (flag) {
            var x = e.clientX;
            var y = e.clientY;
            //修正拖动对象的坐标位置
            var a = start.x - start.left;
            var b = start.y - start.top;
            var leftBoundary = 0;
            var topBoundary = 0;
            var rightBoundary = window.innerWidth - $("drag").offsetWidth;
            var bottomBoundary = window.innerHeight - $("drag").offsetHeight;
            target.style.left = x - a;
            target.style.top = y - b;
            if (x - a < leftBoundary) {
                target.style.left = leftBoundary;
            }
            if (y - b < topBoundary) {
                target.style.top = topBoundary;
            }
            if (x - a > rightBoundary) {
                target.style.left = rightBoundary;
            }
            if (y - b > bottomBoundary) {
                target.style.top = bottomBoundary;
            }
        }
    })

    addEvent(document, "mouseup", function () {
        flag = 0;
        console.log("drag done");
    })
})();