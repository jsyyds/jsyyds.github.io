---
title: 妙用 JavaScript 中的 call、apply、bind
description: 妙、妙、妙啊！
img: https://images.unsplash.com/photo-1617472600356-d6cc97119a0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTIzfHxqYXZhc2NyaXB0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80
alt: 妙用 JavaScript 中的 call、apply、bind
tags:
  - javascript
---

## call、apply

在 JavaScript 中，call 和 apply 都是为了改变某个函数运行时的上下文（context）而存在的。换句话说，就是为了改变函数体内部 this 的指向。

JavaScript 的一大特点是，函数存在**定义时上下文**和**运行时上下文**以及**上下文是可以改变的**这样的概念。

先来一个栗子：

```js
function fruits() {}

fruits.prototype = {
    color: "red",
    say: function(){
        console.log("My color is " + this.color)
    }
}

var apple = new fruits
apple.say() // My color is red
```

但是如果我们有一个对象 `banana = {color:"yellow"}`，我们不想对它重新定义 say 方法，那么我们可以通过 call 或 apply 用 apple 的 say 方法：

```js
var banana = {
    color:"yellow"
}
apple.say.call(banana) // My color is yellow
apple.say.apply(banana) // My color is yellow
```

所以，可以看出 call 和 apply 是为了动态改变 this 而出现的，当一个 object 没有某个方法（本栗子中 banana 没有 say 方法），但是其他的有（本栗子中 apple 有 say 方法），我们可以借助 call 或 apply 用其他对象的方法来操作。

***

### call、apply 的区别

对于 call、apply 二者而言，作用完全一样，只是接收参数的方式不太一样。例如，有一个函数定义如下：

```js
var func = function(arg1, arg2){

}
```

就可以通过如下方式来调用：

```js
func.call(this, arg1, arg2)
func.apply(this, [arg1, arg2])
```

其中 this 是你想指定的上下文，他可以是任何一个 JavaScript 对象（JavaScript 中一切皆对象），call 需要把参数**按顺序传递**进去，而 apply 则是**把参数放在数组里**。

JavaScript 中，某个函数的参数数量是不固定的，因此要说适用条件的话，当你的参数是明确知道数量时用 call，而不确定的时候用 apply，然后把参数 push 进数组传递进去。

当参数数量不确定时，函数内部也可以通过 arguments 这个伪数组来遍历所有的参数。

为了巩固加深记忆，下面列举一些常用用法：

**数组之间追加**

```js
var array1 = [12, "foo", {name: "Joe"}, -2458]
var array2 = ["Doe", 555, 100]
Array.ptototype.push.apply(array1, array2)
// array1 的值为 [12, "foo", {name: "Joe"}, -2458, "Doe", 555, 100]
```

**获取数组中的最大值和最小值**

```js
var numbers = [5, 458, 120, -215]
var maxInNumbers = Math.max.apply(Math, numbers), // 458
    maxInNumbers = Math.max.call(Math, 5, 458, 120, -215) // 458
```

number 本身没有 max 方法，但是 Math 有，我们就可以借助 call 或者 apply 使用其方法。

**验证是否是数组（前提是 toString() 方法没有被重写过）**

```js
function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]'
}
```

**类（伪）数组使用数组方法**

```js
var domNodes = Array.ptototype.slice.call(document.getElementsByTagName("*"))
```

JavaScript 中存在一种名为伪数组的对象结构。比较特别的是**arguments**对象，还有像调用**getElementsByTagName**、**document.childNodes**之类的，它们返回的 NodeList 对象都属于伪数组。不能应用 Array 下的 push、pop 等方法。

但是我们能通过 Array.prototype.slice.call 转换为真正的数组的带有 length 属性的对象，这样 domNodes 就可以应用 Array 下的所有方法了。

### 深入理解运用 call、apply

下面就借用一道面试题，来更深入的去理解下 call 和 apply。

定义一个 log 方法，让它可以代理 console.log 方法，常见的解决方法是：

```js
function log(msg){
    console.log(msg);
}
log(1) // 1
log(1, 2) // 1
```

上面的方法可以解决最基本的需求，但是当传入参数的个数是不确定的时候，上面的方法就失效了，这个时候就可以考虑使用 call 或者 apply，注意这里**传入多少个参数是不确定的**，所以使用 apply 是最好的，方法如下：

```js
function log(){
    console.log.apply(console, arguments)
}
log(1) // 1
log(1, 2) // 1 2
```

接下来的要求是给每一个 log 消息添加一个 "(app)" 的前缀，比如：

```js
log("hello world") // (app)hello world
```

该怎么做比较优雅呢？这个时候需要想到 arguments 参数是个伪数组，通过 Array.prototype.slice.call 转化为标准数组，在使用数组方法 unshift，像这样：

```js
function log(){
    var args = Array.prototype.slice.call(arguments)
    args.unshift('(app)')

    console.log.apply(console, args)
}
```

***

## bind 详解

说完了 call 和 apply，再来说说 bind。bind() 方法与 call 和 apply 很相似，也是可以改变函数体内 this 的指向。

MDN 的解释是：bind() 方法会创建一个新函数，称为绑定函数，当调用这个绑定函数时，绑定函数会以创建它时传入 bind() 方法的第一个参数作为 this，传入 bind() 方法的第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数。

直接来看看具体如何使用，在常见的单体模式中，通常我们会使用 _this、that、self 等保存 this，这样我们可以在改变了上下文之后继续引用到它。像这样：

```js
var foo = {
    bar: 1,
    eventBind: function(){
        var _this = this
        $('.someClass').on('click', function(event){
            // Act on the event
            console.log(_this.bar) // 1
        })
    }
}
```

由于 JavaScript 特有的机制，上下文环境在 eventBind:function(){} 过渡到 $('.someClass').on('click',function(event){}) 发生了改变，上述使用变量保存 this 这些方式都是有用的，也没有什么问题。当然使用 bind() 可以更加优雅的解决这个问题：

```js
var foo = {
    bar: 1,
    eventBind: function(){
        $('.someClass').on('click', function(event){
            // Act on the event
            console.log(this.bar)
        }.bind(this))
    }
}
```

在上述代码里，bind() 创建了一个函数，当这个 click 事件绑定被调用的时候，它的 this 关键词会被设置成被传入的值（这里指调用 bind() 时传入的参数）。因此，这里我们传入想要的上下文 this（其实就是 foo）到 bind() 函数中。然后，当回调函数被执行的时候，this 便指向 foo 对象。

再来一个简单的栗子：

```js
var bar = function(){
    console.log(this.x)
}
var foo = {
    x: 3
}
bar() // undefined
var func = bar.bind(foo)
func() // 3
```

这里我们创建了一个新的函数 func，当使用 bind() 创建一个绑定函数之后，它被执行的时候，它的 this 会被设置成 foo，而不是像我们调用 bar() 时的全局作用域。

有个有趣的问题，如果连续 bind() 两次，亦或者时连续 bind() 三次那么输出的值时什么呢？像这样：

```js
var bar = function(){
    console.log(this.x)
}
var foo = {
    x: 3
}
var sed = {
    x: 4
}

var func = bar.bind(foo).bind(sed)
func() // ?

var fiv = {
    x: 5
}

var func = bar.bind(foo).bind(sed).bind(fiv)
func() // ?
```

答案是，两次都仍将输出 3，而非期待中的 4 和 5。原因是，在 JavaScript 中，多次 bind() 是无效的。更深层次的原因，bind() 的实现，相当于使用函数在内部包了一个 call/apply，第二次 bind() 相当于再包住第一次 bind()，故第二次以后的 bind 是无法生效的。

***

## call、apply、bind 比较

那么 call、apply、bind 三者相比较，之间又有什么异同呢？何时使用 call、apply，何时使用 bind 呢？简单的一个栗子：

```js
var obj = {
    x: 81
}
var foo = {
    getX: function(){
        return this.x
    }
}

console.log(foo.getX.call(obj)) // 81
console.log(foo.getX.apply(obje)) // 81
console.log(foo.getX.bind(obj)()) // 81
```

三个输出都是 81，但是注意看使用 bind() 方法的时候，它后面多了对括号。

也就是说，区别是当你希望改变上下文环境后并非立即执行，而是回调执行的时候，使用 bind() 方法。而 call/apply 则会立即执行函数。

再总结一下：

* call、apply、bind 三者都是用来改变函数的 this 对象的指向的
* call、apply、bind 三者第一个参数都是 this 要指向的对象，也就是想指定的上下文
* call、apply、bind 三者都可以利用后续参数传参
* bind 是返回对应函数，便于稍后调用；call、apply则是立即调用