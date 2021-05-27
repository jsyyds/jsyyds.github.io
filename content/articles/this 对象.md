---
title: this 对象
description: 百变星君——this
img: https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhbmdlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80
alt: this 对象
tags:
  - javascript
---
## 全局环境中的 this

**不管是严格模式，还是非严格模式，全局环境中的 this 都指向全局对象。**

在浏览器中，它就是 window 对象。

```js
'use strict';
console.log(this === window); // true

this.abc = 'abc';
console.log(window.abc) // 'abc'
```

在浏览器环境中，操作 this 对象，就是在操作 window 对象。

虽然代码可以正常运行，但在实际开发中，很少在全局环境中使用 this。此时，建议显式的使用 window，语义更加清晰明确。

## 函数中的 this

**函数中的 this 对象，取决于函数是如何被调用的。**

调用函数一般有四中方法，分别是：

* 简单调用
* 对象方法调用
* call 和 apply 调用
* 构造函数调用

### 简单调用

```js
function f() {
    console.log(this) // Window
}
f()
```

简单调用，就是直接使用一对括号来调用函数。示例代码直接调用 f，this 就是 window 对象。

这个结果肯定不是我们想要的，在严格模式下修改了这个设定，this 是 undefined。

```js
function f() {
    'use strict'
    console.log(this) // undefined
}
f()
```

这么修改在开发阶段就能修改错误，因为如果 this 是 undefined，此时再去操作 this 时，代码就会报错。

在实际开发中，如果代码这么写，逻辑上肯定会出现问题，所以一般也不大会犯这样的错误。

### 对象方法调用

```js
let obj = {
    f() {
        console.log(this) // obj
    }
}
obj.f()
```

对象 obj 有一个属性 f，它的值是一个函数，此时调用 `obj.f()` 方法，输出的 this 就是 obj 对象。也就是说，作为对象方法调用时，函数中的 this 指向的是对象本身。

说明一个很多人都会遇到的坑：

```js
let obj = {
    f() {
        console.log(this) // obj
        function g() {
            console.log(this) // Window
        }
        g()
    }
}
obj.f()
```

在方法 f 中，我们再声明一个 g，然后调用它。此时，在函数 g 中的 this，指向的是 window 对象。很多人认为这里的 this 应该是 obj 对象才符合人的思维。函数 g 还有可能是异步的，比如说是一个 ajax 请求。

那如何修改这段代码，使得函数 g 中的 this 指向的是 obj 对象呢，可以使用 call 和 apply 方法。

### call 和 apply 调用

我们用 call 和 apply 方法修改前面遇到的坑：

```js
let obj = {
    f() = {
        console.log(this) // obj
        function g() {
            console.log(this) // obj
        }
        g.call(this) // this 指向 obj
        // g.apply(this)
    }
}
obj.f()
```

可以使用 `g.call(this)` 或者 `g.apply(this)` 在这个示例中它们的效果是一样的。

call() 和 apply() 方法的第一个参数是指定函数中的 this 对象，它们的区别在函数课程中讲解了。

### 构造函数调用

```js
function C() {
    this.a = 'a'
}
let o = new C()
console.log(o.a) // 'a'
```

我们声明了一个函数 C，注意，它是大写的，这意味着我们把它当作一个类来使用了。它只有一条语句，就是给 this 对象添加了一个属性 a，值是字符串 'a'，然后用 new 创建了一个实例 o。这里需要注意，o 是一个普通对象，通过 new 一个 function 来创建一个普通对象，有点不可思议，但这个特性非常强大，是在 JS 中实现面向对象编程的基础。因为在 ES6 之前，JS 没有显式的类的概念，ES6 中新增的 class 也只是一种语法糖。大家可以暂时认为 class 语法是构造函数方式的进化版本，对象 o 就是构造函数 C 的返回值。如果没有显式的返回值，最后就返回 this。它相当于下面这段代码：

```js
function C() {
    this.a = 'a'
    return this
}
let o = new C()
console.log(o.a) // 'a'
```

this 是可以省略的，所以如果最后返回的是其他对象，那 o 的值就是这个对象，比如这段代码：

```js
let obj = {
    a: 'b'
}
function C() {
    this.a = 'a'
    return obj
}
let o = new C()
console.log(o.a) // 'b'
console.log(o === obj) // true
```

这里再强调一下，如果 C 是作为普通函数使用，那它里面的 this 指向的是全局对象。如果它没有显式的返回值，默认返回的是 undefined。如果 C 是作为构造函数使用，那它里面的 this 就是实例对象，如果它没有显式的返回值，默认返回的是 this 对象。