function $(id) {
    return document.getElementById(id);
}


var stop = document.getElementById("stop");
stop.addEventListener("click", function () {
    document.getElementById("ship1").style.animationPlayState = "paused";

}, false)

var start = document.getElementById("start");
start.addEventListener("click", function () {
    document.getElementById("ship1").style.animationPlayState = "running";
    /*  (function () {
          var deg = 0;
          var i = 0;
          var timer = setInterval(function () {
              if (i >= 3) {
                  console.log("yes");
                  document.getElementById("ship1").style.animation = "myfirst 5s linear infinite";
                  clearInterval(timer);
              }
              i++;
          }, 1000)
  
      })();*/
}, false)

$("launch1").addEventListener("click", function () {
    var ship1 = document.createElement("div");
    ship1.id = "ship1";
    ship1.className = "ship1 spaceship";
    $("universe").appendChild(ship1);
}, false);

$("destroy").addEventListener("click", function () {
    $("universe").removeChild($("ship1"));
})