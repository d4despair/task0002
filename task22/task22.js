
function $(id) {
    return document.getElementById(id);
}

function Node(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;

    if (this.left) {
        var data = this.left;
        var left = data.children[0];
        var right = data.children[1];
        this.left = new Node(data, left, right);
    };
    if (this.right) {
        var data = this.right;
        var left = data.children[0];
        var right = data.children[1];
        this.right = new Node(data, left, right);
    };


    this.show = function () {
        return this.data;//显示保存在节点中的数据
    }
}

function preOrder(node) {
    if (node !== null) {
        console.log(node.show());
        preOrder(node.left);
        preOrder(node.right);
    }
}


nodeA = new Node($("a"), $("a").children[0], $("a").children[1]);

preOrder(nodeA);