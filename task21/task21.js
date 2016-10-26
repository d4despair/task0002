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
            return !str.match(new RegExp("^"+e+"$"));
        });
    },
    insertHandler: function (self) {
        var str = self.input.value.trim();
        if (str.length > 0) {
            var type = this.button ? "button" : "keyboard";
            if (type == "button") {
                self.dataArr = self.dataArr.concat(str.split(/[^0-9a-z\u4E00-\u9FA5]+/i));
            } else {
                self.dataArr.push(str);
                self.input.value = "";
                console.log(self.dataArr);
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
        }
    },
    render: function (self) {
        self.output.innerHTML = self.dataArr.map(function (item) {
            return "<div>" + item + "</div>";
        }).join(" ");
    },
    init: function () {
        var self = this;
        self.output.addEventListener("click", function (event) {
            self.deleteHandler(event.target.innerText.trim());
            self.render(self);
        });
        var type = this.button ? "button" : "keyboard";
        switch (type) {
            case "keyboard":
                self.input.addEventListener("keydown", function (event) {
                    var code = event.keyCode;
                    console.log(code);
                    if (/(,| |\，)$/.test(self.input.value) || event.keyCode === 13) {
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