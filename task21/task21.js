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
//工厂模式实验下方
function List(name) {
    var o = new Object;
    o.name = name;
    o.dataArr = [];
    return o;
}

var tag = List("tag");
var hobby = List("hobby");

//上方工厂模式实验

var dataArr = [];

/**
 * 插入tag，调用渲染
 */
function insertHandler(ele) {
    console.log(ele);
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
    $("hobby-input").value = "";
}

function insertHandler2(ele) {
    console.log(ele);
    var str = $("tag-input").value.trim();
    if (str.length > 0) {
        dataArr = dataArr.concat(str.split(/[^0-9a-z\u4E00-\u9FA5]+/i));

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
    render2();
    $("tag-input").value = "";
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

function render2() {
    $("tag-list").innerHTML = dataArr.map(function (item) {
        return "<div>" + item + "</div>";
    }).join(" ");
}

addEventHandler($("insert"), "click", function (event) {
    insertHandler(event.target);
});

addEventHandler($("hobby-list"), "click", function (event) {
    deleteHandler.call(this, event.target.innerText.trim());
});








addEventHandler($("tag-input"), "keydown", function (event) {
    var e = event.keyCode;
    if (e == "32" || e == "118" || e == "229" || e == "13") {
        insertHandler2(event.target);
    };
});


/*
addEventHandler($("hobby-list"), "mouseover", function (event) {
    showDelete.call(this, event.target);
});
addEventHandler($("hobby-list"), "mouseout", function (event) {
    showDelete.call(this, event.target);
});
*/


function $(id) {
    return document.getElementById(id);
}
function Tag(input, output, button) {
    this.input = $(input);
    this.output = $(output);
    this.button = $(button);
    this.dataArr = [];
}

Tag.prototype = {
    sayInput: function () {
        console.log(this.input);
    },
    deleteHandler: function (str, self) {
        self.dataArr = self.dataArr.filter(function (e) {
            return !str.match(new RegExp(e));
        });
        self.render();
    }
    ,
    render: function (self) {

        self.output.innerHTML = self.dataArr.map(function (item) {
            return "<div>" + item + "</div>";
        }).join(" ");
    },
    init: function () {
        var self = this;
        self.button.addEventListener("click", function () {
            var str = self.input.value.trim();
            if (str.length > 0) {
                self.dataArr = self.dataArr.concat(str.split(/[^0-9a-z\u4E00-\u9FA5]+/i));

                //数列去重
                self.dataArr.forEach(function (e) {
                    while (self.dataArr.indexOf(e) !== self.dataArr.lastIndexOf(e)) {
                        self.dataArr.splice(self.dataArr.lastIndexOf(e), 1);
                    }
                });

                if (self.dataArr.length > 10) {
                    self.dataArr.splice(0, self.dataArr.length - 10);
                }
            }
            console.log(self.dataArr);
            self.render(self);
            self.input.value = "";
        }, false);

        self.output.addEventListener("click", function (event) {
            var str = event.target.innerText.trim();
            self.dataArr = self.dataArr.filter(function (e) {
                return !str.match(new RegExp(e));
            });
            self.render(self);
        });

    }
};

var person1 = new Tag("tag-input", "tag-output", "tag-button");
var person2 = new Tag("hobby-input", "hobby-output", "hobby-button");

person1.init();
person2.init();
