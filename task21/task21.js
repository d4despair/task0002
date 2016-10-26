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

var dataArr = [];

/**
 * 插入tag，调用渲染
 */
function insertHandler() {
    var hobby = $("hobby-input").value.trim();
    if (hobby.length > 0) {
        dataArr = dataArr.concat(hobby.split(/[^0-9a-z\u4E00-\u9FA5]+/i));

        //数列去重
        dataArr.forEach(function (e) {
            while (dataArr.indexOf(e) !== dataArr.lastIndexOf(e)) {
                    dataArr.splice(dataArr.lastIndexOf(e), 1);
            }
        });

        if (dataArr.length > 10) {
            dataArr.splice(0, dataArr.length - 10);
        }
    }
    render();
}


/**
 * 删除点击的tag
 */
function deleteHandler(str) {
    dataArr = dataArr.filter(function (e) {
        return !str.match(new RegExp(e));
    });
    render();
}

function showDelete(ele) {
    if (ele.id.length == 0 && /^[^删除]/.test(ele.innerText)) {
        ele.innerHTML = "删除 " + ele.innerText;
    } else if (/^删除/.test(ele.innerText)) {
        ele.innerHTML = ele.innerHTML.replace(/^删除/, "").trim();
    }
}

/**
 * 渲染html
 */
function render() {
    $("hobby-list").innerHTML = dataArr.map(function (item) {
        return "<div>" + item + "</div>";
    }).join(" ");
}

addEventHandler($("insert"), "click", insertHandler);

addEventHandler($("hobby-list"), "click", function (event) {
    deleteHandler.call(this, event.target.innerText.trim());
});
/*
addEventHandler($("hobby-list"), "mouseover", function (event) {
    showDelete.call(this, event.target);
});
addEventHandler($("hobby-list"), "mouseout", function (event) {
    showDelete.call(this, event.target);
});
*/