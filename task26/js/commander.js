addEvent($("createNewSpaceship"),"click",function () {
    console.log("new ship launched!");
    createNewSpaceship();
    newSpaceshipLaunch();
    consoleLog();
});

function createNewSpaceship(){
    var controlList = $("control-list").innerHTML  ;
    controlList+="<div><span>对1号飞船下达指令：</span><input id='start' type='button' value='开始飞行'><input id='stop' type='button' value='停止飞行'><input id='destroy' type='button' value='自爆'></div>";
    $("control-list").innerHTML = controlList;
}

function newSpaceshipLaunch(){

}

function consoleLog(){
    $("log-content").innerHTML += getTime()+" "+"<span>新的飞船起飞了</span></br>"; 
}