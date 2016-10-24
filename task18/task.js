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

function inputTextCheck(element) {
    var text = $("input-text").value;
    if (text && text.match(/^\d+$/)) {
        element.dataset.block = $("input-text").value;
        element.innerHTML = $("input-text").value;
        element.className = "num-block";
        return true;
    } else {
        alert("请输入数字");
        return false;
    }
}


function addBlock(id) {
    if (id === "input-left-in") {
        var numBlock = document.createElement("DIV");
        var text = $("input-text").value;
        if (text && text.match(/^\d+$/)) {
            numBlock.dataset.block = $("input-text").value;
            numBlock.innerHTML = $("input-text").value;
            numBlock.className = "num-block";
        } else {
            alert("请输入数字");
            return;
        }
        $("num-block-warp").insertBefore(numBlock, $("num-block-warp").firstChild);

    }
    if (id === "input-right-in") {
        var numBlock = document.createElement("DIV");
        var text = $("input-text").value;
        if (text && text.match(/^\d+$/)) {
            numBlock.dataset.block = $("input-text").value;
            numBlock.innerHTML = $("input-text").value;
            numBlock.className = "num-block";
        } else {
            alert("请输入数字");
            return;
        }
        $("num-block-warp").appendChild(numBlock);
    }

}
function removeBlock(id) {
    if (id=="input-text"){
        return;
    }

    if (id === "input-left-out") {
        $("num-block-warp").removeChild($("num-block-warp").firstElementChild);
    }else
    if (id === "input-right-out") {
        $("num-block-warp").removeChild($("num-block-warp").lastElementChild);
    }else {
        id.remove();
    }
    
}

function initAddBlock() {
    addEventHandler($("input-form"), "click", function (event) {
        addBlock.call(event, event.target.id);
    });
}

function initRemoveBlock() {
    addEventHandler($("input-form"), "click", function (event) {
        removeBlock.call(event, event.target.id);
    });
    addEventHandler($("num-block-warp"), "click", function (event) {
        removeBlock.call(event, event.target);
    });
}

console.log("hello world");

initAddBlock();
initRemoveBlock();