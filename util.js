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
    var objType =  Object.prototype.toString.call(src);

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

}


// 测试用例：
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript",
        b3: true,
        b4: new Date(Date.now()),
        b5:/gi/i,
        b6:isArray
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";
srcObj.b.b3 = false;

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"

console.log(abObj);
console.log(tarObj);
