// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $(".siteList");
var $lastLi = $siteList.find("li.last"); //在siteList里找到li.last

var x = localStorage.getItem('x'); //localStorage:在本地读取'x'的值

var xObject = JSON.parse(x); //把字符串'x'转化为对象

var hashMap = xObject || [{
  logo: 'A',
  url: 'https://www.acfun.cn/'
}, {
  logo: 'B',
  url: 'https://www.bilibili.com/'
}, {
  logo: 'C',
  url: 'https://www.cctv.com/'
}, {
  logo: 'D',
  url: 'http://www.dangdang.com/'
}]; //初始hashmap

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, ''); //删除 / 开头的内容
}; //简化url地址


var render = function render() {
  $siteList.find('li:not(.last)').remove(); //把li列表里的不包含last的全部移除

  hashMap.forEach(function (node, index) {
    var $li = $("<li>\n            <div class=\"site\"> \n                <div class=\"logo\">".concat(node.logo, "</div>\n                <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n                <div class=\"close\">\n                    <svg class=\"icon\">\n                        <use xlink:href=\"#icon-close\"></use>\n                    </svg>\n                </div>\n            </div>\n    </li>")).insertBefore($lastLi); //遍历hashMap，传node参数创建<li>放在lastli之前

    $li.on('click', function () {
      window.open(node.url);
    }); //用JS点击事件来控制打开链接代替a标签

    $li.on('click', '.close', function (e) {
      e.stopPropagation(); //阻止冒泡

      console.log(hashMap);
      hashMap.splice(index, 1);
      render();
    });
  });
};

render(); //渲染hashMap

$('.addButton').on('click', function () {
  var url = window.prompt('请问你要添加的网址是啥？');

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  } //自动将网站添加"https://"


  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url
  }); //将添加的网站push到hashMap

  render(); //渲染hashMap
});

window.onbeforeunload = function () {
  //js用户关闭页面前把当前的hashMap存到'x'内
  var string = JSON.stringify(hashMap); //把hashMap对象转化成字符串(localStorage只能存字符串)

  localStorage.setItem('x', string); //localStorage在本地存储里设置'x',值为string
};

window.onload = function () {
  function $(id) {
    return document.getElementById(id);
  } //获取焦点


  $("searchmain").onfocus = function () {
    if ($("searchmain").value == "请输入关键字~") {
      $("searchmain").value = "";
      $("searchmain").style.color = "#64afe0";
    }
  };

  $("searchmain").onblur = function () {
    if ($("searchmain").value == "") {
      $("searchmain").value = "请输入关键字~";
      $("searchmain").style.color = "#ccc";
    }
  };
}; // $(document).on('keydown',(e)=>{
//     const {key}= e //等价于const key= e.key
//     console.log(key)
//     for(let i =0;i< hashMap.length; i++){
//         if(hashMap[i].logo.toLowerCase()=== key){
//             window.open(hashMap[i].url)
//         }
//     }
// })
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.23a3d0aa.js.map