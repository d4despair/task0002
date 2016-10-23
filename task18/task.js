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
    var text = $("input-txt").value;
    if (text && text.match(/^\d+$/)) {
        element.dataset.block = $("input-txt").value;
        element.innerHTML = $("input-txt").value;
        element.className = "num-block";
        return true;
    } else {
        alert("请输入数字");
        return false;
    }
}


function addBlock(id) {
    /*
    var numBlock = document.createElement("DIV");
    var text = $("input-txt").value;
    if (text && text.match(/^\d+$/)) {
        numBlock.dataset.block = $("input-txt").value;
        numBlock.innerHTML = $("input-txt").value;
        numBlock.className = "num-block";       
    } else {
        alert("请输入数字");
        return;
    }*/
    if (id === "input-left-in") {
        var numBlock = document.createElement("DIV");
        var text = $("input-txt").value;
        if (text && text.match(/^\d+$/)) {
            numBlock.dataset.block = $("input-txt").value;
            numBlock.innerHTML = $("input-txt").value;
            numBlock.className = "num-block";
        } else {
            alert("请输入数字");
            return;
        }
        console.log("left");
        $("num-block-warp").insertBefore(numBlock, $("num-block-warp").firstChild);

    }
    if (id === "input-right-in") {
        var numBlock = document.createElement("DIV");
        var text = $("input-txt").value;
        if (text && text.match(/^\d+$/)) {
            numBlock.dataset.block = $("input-txt").value;
            numBlock.innerHTML = $("input-txt").value;
            numBlock.className = "num-block";
        } else {
            alert("请输入数字");
            return;
        }
        $("num-block-warp").appendChild(numBlock);
    }

}
function removeBlock(id) {
        if (id === "input-left-out") {
            $("num-block-warp").removeChild($("num-block-warp").firstElementChild);
        }
        if (id === "input-right-out") {
            $("num-block-warp").removeChild($("num-block-warp").lastElementChild);
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
        removeBlock.call(event, event.target.id);
    });
}

initAddBlock();
initRemoveBlock();