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

    var patt = /^[\da-z]+((\.?|[\-\_]+)?[\da-z]+)*\@[\da-z]+\.[\da-z]{3}(\.[a-z]{2})?$/i;

    var a = patt.test(emailStr);
    var str = String(emailStr) + (a ? "是邮箱地址" : "不是邮箱地址");
    console.log(str);
    return patt.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    return /^1[0-9]{10}$/.test(phone);
}


//判断元素中是否已经存在某class
function hasClass(element, className) {
    var classNames = element.className;
    if (!classNames) {
        return 0;//不存在任何类，返回数值0
    }
    classNames = classNames.split(/\s+/);
    for (var i in classNames) {
        if (classNames[i] === className) {
            return 1;//已存在参数中的类，返回数值1
        }
    }
    return -1;//不存在参数中的类，但是存在其他类，返回数值-1
}

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    //只有当返回值小于等于0时才添加新的类，即元素中不存在即将添加的类时
    if (hasClass(element, newClassName) <= 0) {
        //element.className为真时，element中存在其他类；为假时，不存在任何类
        element.className = element.className ? [element.className, newClassName].join(" ") : newClassName;
        return true;
    }
    return false;
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    if (hasClass(element, oldClassName) === 1) {
        var patt = new RegExp("\\s*" + oldClassName + "\\s*", "g");//用变量形式创建正则表达式，等价于/\s*要删除的类\s*/g
        element.className = element.className.replace(patt, " "); //移除已存在的类
        element.className = element.className.replace(/^\s+|\s+$/, ""); //删除字符串头尾空格，没有这个语句整个函数也没有影响
        return true;
    }
    return false;
}

/**
 *  <div id="test1">
		<p>element<span>1</span></p>  //firstChild
		<p>element<span>1</span></p>  //lastChild
	</div>
----------------------------------------
    var d1 = document.getElementById("test1").firstChild.firstChild;
    var d2 = document.getElementById("test1").lastChild.firstChild;
    console.log(d1==d2); // true
 * ----------------------------------
 * 以下函数存在漏洞，不能解决如上的问题：d1是firstChild的span元素，d2是lastChild的span元素，但是两者相等
 * function isSiblingNode(element, siblingNode) {
    if (element.parentNode == siblingNode.parentNode) {
        return true;
    }
    return false;
}

 */
// note：element.childNodes与 element.children的区别
// 用childNodes属性会把父元素中的textNode也算进去（包括空格），使用children的话，只会考虑elementNode
function isSiblingNode(element, siblingNode) {
    for (var node = element.parentNode.firstChild; node; node = node.nextSibling) {
        if (node === siblingNode) {
            return true;
        }
    }
    return false;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var x = element.offsetLeft;
    var y = element.offsetTop;
    return { x, y };
}
function getPosition2(element) {
    var box = element.getBoundingClientRect();
    return box;
}

// 实现一个简单的Query
function $(selector) {
    var selectors = selector.split(/\s+/);
    console.log(selectors);
    for (var i in selectors) {
        console.log(selectors[i]);
        if (/^#\w+/.test(selectors[i])) {
            var idSelector = selectors[i].replace("#", "");
            var element = document.getElementById(idSelector);
            console.log(element);
        }
        if (/^\w+/.test(selectors[i])){
            var tagName = selectors[i];
            var element = document.getElementsByTagName(tagName)[0];
            console.log(element);
        }

        if (/^\.\w+/.test(selectors[i])){
            var className = selectors[i].replace(".", "");
            var element = document.getElementsByClassName(className)[0];
            console.log(element);
        }


    }


}

// 可以通过id获取DOM对象，通过#标示，例如
console.log($("#adom .classa")); // 返回id为adom的DOM对象
console.log($("div"));
