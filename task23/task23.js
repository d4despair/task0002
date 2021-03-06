
function $(id) {
    return document.getElementById(id);
}

function Tree(element) {
    this.traveseList = [];
    this.flag = 0;//用于判断是否在遍历中
    this.active = null;
    this._root = element;
    this.init();
}

Tree.prototype = {
    render: function (type) {
        var that = this;
        if (that.flag == 0) {
            that.toElementArray(type);
            that.changeColor();
        } else {
            alert("正在遍历中...");
        }
    },
    toElementArray: function (type) {
        var that = this;
        this.traveseList = [];//清空traveseList
        this.travese(function (element) {
            that.traveseList.push(element);
        }, type);
    },
    /**
     * 遍历整个树
     * @param {callback} function 用于处理每个元素的函数
     * @param {type} string 遍历的类型
     */
    travese: function (callback, type) {
        (function recurse(current) {
            if (/DF/.test(type)) {
                callback.call(this, current);
            }
            for (var i = 0; i < current.children.length; i++) {
                recurse(current.children[i]);
            }
            if (/BF/.test(type)) {
                callback.call(this, current);
            }
        })(this._root);
    },
    search: function (str) {
        var that = this;
        var list = that.traveseList;
        str = str.trim();
        if (str.length > 0) {
            var reg = new RegExp("^\s*" + str, "i");
            var i = 0;
            var result = [];//用于标记匹配查询的结果
            var timer = setInterval(function () {
                if (i < list.length) {
                    list[i].className = "travesing";
                    if (i - 1 >= 0 && result.every(function (e) { return (e != (i - 1)); })) {
                        list[i - 1].className = "";
                    }
                    if (reg.test(list[i].innerText)) {
                        list[i].className = "result";
                        result.push(i);
                    }
                } else {
                    clearInterval(timer);
                    list[i - 1].className = "";
                }
                i++;
            }, 500)
        } else {
            alert("太小了");
        }
    }
    ,
    changeColor: function (str) {
        var i = 0;
        var list = this.traveseList;
        var that = this;
        var timer = null;
        that.flag = 1;
        list[0].className = "travesing";
        timer = setInterval(function () {
            //实际上下面的不等式是以i=1为初始值
            if (i++ < list.length) {
                console.log(list[i - 1].id);
                list[i - 1].className = "";
                //防止最后一次错误
                if (i < list.length) {
                    list[i].className = "travesing";
                }
                console.log(i);
            } else {
                clearInterval(timer);
                that.flag = 0;
            }
        }, 500)
    }
    ,
    //这里的按钮绑死了，所以无法复用
    init: function () {
        var that = this;
        $("DF").addEventListener("click", function (event) {
            that.render.call(that, event.target.id);//将that作用环境带入到render中
        });
        $("BF").addEventListener("click", function (event) {
            that.render.call(that, event.target.id);
        });
        $("searchDF").addEventListener("click", function (event) {
            that.toElementArray.call(that, event.target.id);
            that.search.call(that, $("searchText").value);
        });
        $("searchBF").addEventListener("click", function (event) {
            that.toElementArray.call(that, event.target.id);
            that.search.call(that, $("searchText").value);
        });
        document.addEventListener("click", function (event) {
            if (event.target.tagName == "DIV") {
                if (that.active != null) {
                    that.active.className = "";
                }
                if (that.active == event.target) {
                    that.active.className = "";
                    that.active = null;
                    return;
                }
                that.active = event.target;
                that.active.className = "active";
                console.log(that.active);
            }
        });
        $("delete").addEventListener("click", function (event) {
            console.log(that.active);
            if (that.active != null) {
                that.active.parentNode.removeChild(that.active);
                that.active = null;
            } else {
                alert("请选择一个节点");
            }
        });
        $("add").addEventListener("click", function (event) {
            if (that.active != null) {
                var value = $("addText").value.trim();
                if (value.length > 0) {
                    var text = document.createTextNode($("addText").value);
                    var div = document.createElement("div");
                    div.appendChild(text);
                    that.active.appendChild(div);
                } else {
                    alert("请输入字符");
                }
            } else {
                alert("请选择一个节点");
            }
        });
    }
}

var tree = new Tree($("super"));

var flag = 0;

$("ul").addEventListener("click", function () {
    console.log(event.target.nodeType);
    var target = event.target;
    console.log(target.nodeName);
    if (target.nodeName == "LI") {
        if (target.children[0].style.display == "") {
            for (var i = 0; i < target.children.length; i++) {
                target.children[i].style.display = "none";
                target.className = "test";
            }

            flag = 0;
        } else {
            for (var i = 0; i < $("ul").children.length; i++) {
                target.children[i].style.display = "";
                target.className = "";
            }
            flag = 1;
        }
    }
    /*
        if (flag == 0) {
            for (var i = 0; i < $("ul").children.length; i++) {
                $("ul").children[i].style.display = "none";
            }
    
            flag = 1;
        } else {
            for (var i = 0; i < $("ul").children.length; i++) {
                $("ul").children[i].style.display = "list-item";
            }
            flag = 0;
        }
        */
})