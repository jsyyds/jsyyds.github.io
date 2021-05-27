---
title: Array.prototype.slice.call() 方法详解
description: 常见方法，理解掌握
img: https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c2xpY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80
alt: Array.prototype.slice.call() 方法详解
tags:
  - javascript
---
开发项目中常常能看到 Array.prototype.slice.call() 方法，下面就来深入理解一下：

在 JS 中 Array 是一个类，slice 是此类中的一个方法，那么使用此方法时应该 `Array.prototype.slice` 这样去调用。

slice 从字面上的意思很容易理解，就是截取（如果英语不好请背熟），这个方法的语法是 `arrayObj.slice(start[, end])`，很显然是截取一部分数组的意思。

我们再来看 call：

```js
call([thisObj[, arg1[, arg2[, argN]]]])
```

其中 thisObj 是你想指定的上下文，他可以是任何一个 JavaScript 对象（JavaScript 中一切皆对象），call 可以把参数按顺序传递进去。

想要具体了解的请转[《妙用 JavaScript 中的 call、apply、bind》](https://jsyyds.github.io/blog/%E5%A6%99%E7%94%A8JavaScript%E4%B8%AD%E7%9A%84call%E3%80%81apply%E3%80%81bind)。

那么 `Array.prototype.slice.call(arguments,1)` 这句话的意思就是说把调用方法的参数截取出来。如：

```js
function test(a,b,c,d){
    var arg = Array.prototype.slice.call(arguments,1)
    alert(arg)
    }
    test("a","b","c","d") // b,c,d
```

那为什么不直接用 `arguments.slice(1)` 呢？因为 `arguments` 并不是真正的数组对象，只是与数组类似而已，所以它没有 slice 这个方法，而 `Array.prototype.slice.call(arguments，1)` 可以理解为让 `arguments` 调用 `Array.prototype` 上的 slice 方法。

因此，`Array.prototype.slice.call(arguments)` 能将具有 length 属性的对象转成数组，除了 IE 下的节点集合，因为 IE 下的 dom 对象是以 com 对象的形式实现的，JS 对象与 com 对象不能进行转换。

```js
var a={length:2,0:'first',1:'second'};//类数组,有length属性，长度为2，第0个是first，第1个是second
console.log(Array.prototype.slice.call(a,0));// ["first", "second"],调用数组的slice(0);

var a={length:2,0:'first',1:'second'};
console.log(Array.prototype.slice.call(a,1));//["second"]，调用数组的slice(1);

var a={0:'first',1:'second'};//去掉length属性，返回一个空数组
console.log(Array.prototype.slice.call(a,0));//[]

function test(){
  console.log(Array.prototype.slice.call(arguments,0));//["a", "b", "c"]，slice(0)
  console.log(Array.prototype.slice.call(arguments,1));//["b", "c"],slice(1)
}
test("a","b","c");
```

总结：

将函数的实际参数转换成数组的方法：

方法一：`var args = Array.prototype.slice.call(arguments)`

方法二：`var args = [].slice.call(arguments, 0)`

方法三：

```js
var arr = []
for(var i = 0; i < arguments.length; i++){
    arr.push(arguments[i])
    // 或 arr[i] == arguments[i] 据说这样比 push 快
}
```

最后，附一个转成数组的通用函数：

```js
var toArray = function(arguments){
    try{
        return Array.prototype.slice.call(arguments);
    } catch(e) {
        var arr = [];
        for(var i = 0; i < arguments.length; i++){
            // args.push(arguments[i]);
            arr[i] == arguments[i]; //据说这样比 push 快
        }
        return arr;
    }
}
```