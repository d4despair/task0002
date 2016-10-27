
function $(id) {
    return document.getElementById(id);
}

function Tree(element) {
    this._root = element;
}

Tree.prototype = {
    constructor: Tree,
    traveseDLR: function (callback) {
        (function recurse(current) {
                callback.call(this, current);
            if (current.children.length >= 1) {
                recurse(current.children[0]);
            }
            if (current.children.length >= 2) {
                recurse(current.children[1]);
            }
        })(this._root);
    },
    traveseLDR: function (callback) {
        (function recurse(current) {
            if (current.children.length >= 1) {
                recurse(current.children[0]);
            }
            callback.call(this, current);
            if (current.children.length >= 2) {
                recurse(current.children[1]);
            }
        })(this._root);
    },
    traveseLRD: function (callback) {
        (function recurse(current) {
            if (current.children.length >= 1) {
                recurse(current.children[0]);
            }
            if (current.children.length >= 2) {
                recurse(current.children[1]);
            }
            callback.call(this, current);
        })(this._root);
    }
}

tree = new Tree($("a"));



$("DLR").addEventListener("click", function () {
    tree.traveseDLR(function (element) {
        element.style.background = "#0cc";
        setTimeout(function () {
            element.style.background = "#fff";
        }, 500)
    });
});

$("LDR").addEventListener("click", function () {
    tree.traveseLDR(function (element) {
        console.log(element.id);
        element.style.background = "#0cc";

    });
});

$("LRD").addEventListener("click", function () {
    tree.traveseLRD(function (element) {
        console.log(element.id);
        element.style.background = "#0cc";
    });
});

console.log(tree);
