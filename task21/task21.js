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
    deleteHandler: function (e) {
        var str = e;
        this.dataArr = this.dataArr.filter(function (e) {
            return !str.match(new RegExp("^" + e + "$"));
        });
    },
    insertHandler: function (self) {
        var str = self.input.value.trim();
        var type = this.button ? "button" : "keyboard";
        if (type == "button") {
            if (str.length > 0) {
                self.dataArr = self.dataArr.concat(str.split(/[^0-9a-z\u4E00-\u9FA5]+/i));
            }
        } else {
            var str = this.input.value.match(/(^[^,\， ]*)/)[0];
            if (str.length > 0) {
                self.dataArr.push(str);
            }
        }
        //数列去重
        self.dataArr.forEach(function (e) {
            while (self.dataArr.indexOf(e) !== self.dataArr.lastIndexOf(e)) {
                self.dataArr.splice(self.dataArr.lastIndexOf(e), 1);
            }
        });
        if (self.dataArr.length > 10) {
            self.dataArr.splice(0, self.dataArr.length - 10);
        }
    },
    render: function (self) {
        self.output.innerHTML = self.dataArr.map(function (item) {
            return "<div>" + item + "</div>";
        }).join(" ");
    },
    init: function () {
        var self = this;
        self.output.addEventListener("mouseover", function (event) {
            console.log(event.target.id);
            if (event.target.id == "") {
                setTimeout(function () {
                    event.target.innerHTML = "点击删除：" + event.target.innerHTML;
                },50)
            }
        });

        self.output.addEventListener("mouseout", function (event) {
            setTimeout(function () {
                event.target.innerHTML = event.target.innerHTML.replace(/点击删除：/, "");
            }, 50);

        });
        self.output.addEventListener("click", function (event) {
            self.deleteHandler(event.target.innerText.trim());
            self.render(self);
        });
        var type = this.button ? "button" : "keyboard";
        switch (type) {
            case "keyboard":
                self.input.addEventListener("keyup", function (event) {
                    var code = event.keyCode;
                    console.log(code);
                    console.log(self.input.value)
                    if (/[,，;；、\s\n]+/.test(self.input.value) || event.keyCode === 13) {
                        self.insertHandler(self);
                        self.render(self);
                        self.input.value = "";
                    }
                });
                break;
            case "button":
                self.button.addEventListener("click", function (event) {
                    self.insertHandler(self);
                    self.render(self);
                    self.input.value = "";
                }, false);
                break;
        }
    }

}


var person1 = new Tag("tag-input", "tag-output");
var person2 = new Tag("hobby-input", "hobby-output", "hobby-button");

person1.init();
person2.init();