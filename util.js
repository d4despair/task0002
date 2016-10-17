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
            for (var i = 0; i < src.length; i++) {
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
/* 
//使用if语句写的函数
    if ((objType === '[object Number]')||(objType === '[object String]')||(objType === '[object Boolean]')||(objType === '[object Date]')){
        var obj = src;
        return obj;
    }
 
    if (objType === '[object Object]'){
        var obj = new Object();
        for (var propName in src){
            //用递归的方式判断src[proName]是什么类型的数据，然后再返回给新建的obj[propName]
            //令propName="Name"，则Object[propName]就相当于Object.Name；这是一个用变量访问对象属性的方法
            //错误的函数之一、我用obj.propName = src.propName做赋值，这样相当于把src的propName属性赋值给obj的probName属性
            //错误的函数之二、我在for-in中写了obj[propName]=src[propName]，这样两者的propName属性公用一个内存地址，修改其中一个，另一个就会跟着变动
            obj[propName] = cloneObject(src[propName]);          
        }
        return obj;
    }
 
 
    if (objType === '[object Array]'){
        var obj = new Array();
        for (var i=0;i<src.length;i++){
            obj[i]=src[i];
        }
        return obj;
    }
*/


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
    return str;
}
// 使用示例

var text = "mom and dad and baby";
var pattern = /mom( and dad( and baby)?)?/gi;
var matches = pattern.exec(text);
console.log(matches.index); // 0
console.log(matches.input); // "mom and dad and baby"
console.log(matches[0]); // "mom and dad and baby"
console.log(matches[1]); // " and dad and baby"
console.log(matches[2]); // " and baby"

console.log(matches);


var text = "cat, bat, sat, fat";
var pattern1 = /.at/g;
var arr = [];

while (pattern1.lastIndex < text.length) {
    var a = pattern1.exec(text);
    arr=arr.concat(a);
    console.log(a);
}
console.log(arr);

var text = "000-00-0000";
var pattern = /\d{3}-\d{2}-\d{4}/;
if (pattern.test(text)){
console.log("The pattern was matched.");
}
