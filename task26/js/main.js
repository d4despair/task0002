function $(id) {
    return document.getElementById(id);
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
    this.state = "STOP";
    this.fuel = 100;
    this.consumeRate = 5;
    this.chargeRate = 2;
}

Spaceship.prototype = {
    launch: function () {

    },
    start: function () {

    },
    stop: function () {

    },
    destroy: function () {

    }
}

var ship1 = new Spaceship(1);
ship1.state = "RUNNING";
var ship2 = new Spaceship(2);
console.log(ship1.state);
console.log(ship2.state);