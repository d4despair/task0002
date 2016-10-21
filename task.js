/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var cityInput = document.getElementById("aqi-city-input");
var apiInput = document.getElementById("aqi-value-input");

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  var city = cityInput.value.trim();
  var api = apiInput.value.trim();
  var isCity = /^[\u4e00-\u9fa5]+|\w+\s?\w+$/.test(city);
  var isValue = /^\d+$/.test(api);
  if (!isCity) {
    alert("请输入城市中文/英文名称");
    return;
  }
  if (!isValue) {
    alert("空气质量指数必须为整数");
    return;
  }

  aqiData[city] = parseInt(api);
  console.log(aqiData);
  return aqiData;//应该已经完成了 by diocai 20161020
}

document.getElementById("add-btn").onclick = addAqiData;



/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var apiTable = document.getElementById("aqi-table");
  var contextStr = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
  for (var i in aqiData) {
    contextStr += "<tr><td>" + i + "</td><td>" + aqiData[i] + "</td><td><button>删除</button></td></tr>"
  }
  apiTable.innerHTML = contextStr;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
  delete apiData[city];
  console.log("deleted");
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.getElementById("add-btn").onclick = addBtnHandle;

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

  var aqiTable = document.getElementById("aqi-table");
  var delBtns = aqiTable.getElementsByTagName("button");
  console.log(delBtns);
  for (var i in delBtns) {
    delBtns[i].onclick = delBtnHandle;
  }

}

init();

console.log("lets go!");
