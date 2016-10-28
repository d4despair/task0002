
function $(id) {
    return document.getElementById(id);
}

function Tree(element) {
    this.traveseList = [];
    this.flag = 0;//用于判断是否在遍历中
    this._root = element;
    this.init();
}

Tree.prototype = {
    render: function (type) {
        var that = this;
        if (that.flag == 0) {

            //清空traveseList
            that.traveseList = [];
            that.travese(function (element) {
                that.traveseList.push(element);
            }, type);
            that.changeColor.call(that);

        } else {
            alert("正在遍历中...");
        }
    },
    travese: function (callback, type) {
        (function recurse(current) {
            if (type == "DLR") {
                callback.call(this, current);
            }
            if (current.children.length > 0) {
                recurse(current.children[0]);
            }
            if (type == "LDR") {
                callback.call(this, current);
            }
            if (current.children.length > 1) {
                recurse(current.children[1]);
            }
            if (type == "LRD") {
                callback.call(this, current);
            }
        })(this._root);
    },
    changeColor: function () {
        var i = 0;
        var list = this.traveseList;
        var that = this;
        var timer = null;
        that.flag = 1;
        list[0].style.backgroundColor = "#0cc";
        timer = setInterval(function () {
            //实际上下面的不等式是以i=1为初始值
            if (i++ < list.length) {
                console.log(list[i - 1].id);
                list[i - 1].style.backgroundColor = "#fff";
                //防止最后一次错误
                if (i < list.length) {
                    list[i].style.backgroundColor = "#0cc";
                }
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
        $("DLR").addEventListener("click", function (event) {
            that.render.call(that, event.target.id);//将that作用环境带入到render中
        });
        $("LDR").addEventListener("click", function (event) {
            that.render.call(that, event.target.id);
        });
        $("LRD").addEventListener("click", function (event) {
            that.render.call(that, event.target.id);
        });
    }
}

var tree = new Tree($("a"));
