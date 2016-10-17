// 创建一个JavaScript文件，比如util.js；
// 实践判断各种数据类型的方法，并在util.js中实现以下方法


// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return '[object Array]' === Object.prototype.toString.call(arr);
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return '[object Function]' === Object.prototype.toString.call(fn);
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    var objType = Object.prototype.toString.call(src);
    var obj = null;
    var isOK = true;
    switch (objType) {
        case '[object Number]':
        case '[object String]':
        case '[object Boolean]':
        case '[object Date]':
            obj = src;
            break;
        case '[object Object]':
            obj = new Object();
            for (var propName in src) {
                obj[propName] = cloneObject(src[propName]); //用递归的方式判断src[proName]是什么类型的数据，然后再返回给新建的obj[propName]
            }
            break;
        case '[object Array]':
            obj = new Array();
            for (var i = 0, len = src.length; i < len; i++) {
                obj.push(src[i]);
            }
            break;
        default:
            console.log(objType + ":无法克隆");
            isOK = false;
            break;
    }
    if (isOK) {
        return obj;
    }
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var arrNew = [];
    for (var i = 0; i < arr.length; i++) {
        arrNew.push(arr[i]);
    }
    for (var i = 0; i < arrNew.length; i++) {
        for (var j = 1; j < arrNew.length; j++) {
            // i!=j 防止把最后一个元素也删除了
            // j-=1 由于arrNew.splice(j,1)删除了一个元素[j]，那么原本的[j]以后的元素就会往前进一个元素
            if (i != j) {
                if (arrNew[i] === arrNew[j]) {
                    arrNew.splice(j, 1); // arr.splice(j, n)，删除arr[j]及以后的n-1个元素，arr变成删除后的数列，slice对arr不造成影响
                    j -= 1;
                }
            }
        }
    }
    return arrNew;
}

// 中级班同学跳过此题
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    var trimmer = /^[\s+]+|\s+$/g;
    return str.replace(trimmer, "");
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for (var i = 0, len = arr.length; i < len; i++) {
        fn(arr[i], i);
    }
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var len = 0;
    for (var i in obj) {
        len++;
    }
    return len;
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
    var patt = /^(\w)+(\.\w)*@\w+\.\w+$/;
    console.log(patt.exec(emailStr));
    return patt.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    // your implement
}

var mail = "2_2@gmail.com";

//console.log(isEmail(mail));

var patt=/^[\da-zA-Z]+([\.\_\-]?[\da-zA-Z]+)*\@/i;
var str="123Aadf-sss-@"
console.log(patt.exec(str));