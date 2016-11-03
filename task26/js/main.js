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


var stop = document.getElementById("stop");
stop.addEventListener("click", function () {
    document.getElementById("ship1").style.animationPlayState = "paused";

}, false)


var fuel = 100;

var start = document.getElementById("start");
start.addEventListener("click", function () {
    document.getElementById("ship1").style.animationPlayState = "running";
    var timer = setInterval(function () {
        if (fuel <= 0) {
            $("ship1").style.animationPlayState = "paused";
            clearInterval(timer);
            var timer2 = setInterval(function () {
                console.log(fuel);
                if (fuel >= 100) {
                    clearInterval(timer2);
                }
                fuel += 3;
                $("test").innerHTML = fuel + "%";
            }, 200);
        }
        console.log(fuel);
        fuel -= 5;
        $("test").innerHTML = fuel + "%";
    }, 200);
}, false)

$("launch1").addEventListener("click", function () {
    if (!$("ship1")) {
        var ship1 = document.createElement("div");
        ship1.id = "ship1";
        ship1.className = "ship1 spaceship";
        $("universe").appendChild(ship1);
    }
}, false);

$("destroy").addEventListener("click", function () {
    $("universe").remsoveChild($("ship1"));
})

function Spaceship(num) {
    this._id = num;
    this.id = $("ship" + num);
    this.state = "STOP";
    this.fuel = 100;
    this.consumeRate = 5;
    this.chargeRate = 2;
    this.speed = 5;
    this.rate = 1000 / this.speed;
}

Spaceship.prototype = {
    launch: function () {
    },
    start: function () {
        var that = this;
        this.id.style.animationPlayState = "running";
        this.state = "RUN";
        var running = setInterval(function () {
            console.log(that.fuel);
            $("test").innerHTML = that.fuel + "%";
            $("test").style.width = that.fuel + "%";
            that.fuel -= that.consumeRate;
            if (that.fuel <= 0) {
                that.fuel = 0;
                clearInterval(running);
                console.log("run out");
                $("test").innerHTML = that.fuel + "%";
                $("test").style.width = that.fuel + "%";
                that.stop();
            }
        }, this.rate)
    },
    stop: function () {
        var that = this;
        this.id.style.animationPlayState = "paused";
        this.state = "STOP";
        var recharge = setInterval(function () {
            console.log(that.fuel);
            $("test").innerHTML = that.fuel + "%";
            $("test").style.width = that.fuel + "%";
            that.fuel += that.chargeRate;
            if (that.fuel >= 100) {
                that.fuel = 100;
                clearInterval(recharge);
                console.log(that.fuel);
                $("test").innerHTML = that.fuel + "%";
                $("test").style.width = that.fuel + "%";
            }
        }, this.rate)
    },
    destroy: function () {
    }
}
var ship1 = new Spaceship(1);

var ship2 = new Spaceship(2);
console.log(ship2.id);
ship2.start();
console.log(ship1.state);
console.log(ship2.state);