var ships = [];
var msg = {};


function createNewSpaceship(id) {
    var len = ships.length;
    ships[len] = new Spaceship(id);

    var controlList = $("control-list").innerHTML;
    controlList += "<div><span>对" + id + "号飞船下达指令：</span>"
        + "<input data-command='start' data-id=" + id + " type='button' value='开始飞行'>"
        + "<input data-command='stop' data-id=" + id + " type='button' value='停止飞行'>"
        + "<input data-command='destruct' data-id=" + id + " type='button' value='自爆'></div>";
    $("control-list").innerHTML = controlList;
}

function consoleLog() {
    $("log-content").innerHTML += getTime() + " " + "<span>新的飞船起飞了</span></br>";
}

addEvent($("createNewSpaceship"), "click", function () {
    console.log("new ship launched!");
    var id = ships.length + 1;
    createNewSpaceship(id);
    consoleLog();
});

addEvent($("control-list"), "click", function (e) {
    if (e.target.nodeName == 'INPUT') {
        msg.id = e.target.dataset.id;
        msg.command = e.target.dataset.command;
        console.log(msg);
    }
    for (var i in ships) {
        ships[i][msg.command].call(ships[i], msg.id);
    }
    if (msg.command == 'destruct') {
        ships = ships.splice(0, msg.id - 1);
        console.log(ships);
    }
})