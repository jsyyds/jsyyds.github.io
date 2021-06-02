---
title: JS 中的 new 做了什么？
description: What happened?
img: https://images.unsplash.com/photo-1598705352140-be8e33a97d55?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fGNyZWF0ZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80
alt: JS 中的 new 做了什么？
tags:
  - javascript
---

面试遇到了这个问题，有印象但是记不清了，回答的模棱两可，自己也感觉不满意，重新复习一下。

## 当 `new Foo()` 时发生了什么

根据 MDN 的描述，当代码 `new Foo(...)` 执行时，会发生以下事情：

1. 一个继承自 `Foo.prototype` 的新对象被创建。
2. 使用指定的参数调用构造函数 `Foo`，并将 `this` 绑定到新创建的对象。`new Foo` 等同于 `new Foo()`，也就是没有指定参数列表，`Foo` 不带任何参数调用的情况。
3. 由构造函数返回的对象就是 `new` 表达式的结果。如果构造函数没有显式返回一个对象，则使用步骤1创建的对象。（一般情况下，构造函数不返回值，但是用户可以选择主动返回对象，来覆盖正常的对象创建步骤）

展示在代码中大概就是这样：

```js
// 构造函数
function Person(name, age) {
  // 1. 创建一个对象，赋予 this，这一步是隐性的
  // let this = {}
  console.log(this.__proto__ === Person.prototype) // true

  // 2. 给 this 指向的对象赋予构造属性
  this.name = name
  this.age = age

  // 3. 如果没有手动返回对象，则默认返回 this 指向的这个对象，这一步也是隐性的
  // return this
}

const person1 = new Person()
```

## 实现一个简单的 new 方法

根据上面的描述，我们可以简单实现一个 new 方法：

```js
// 构造函数
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.sayName = function() {
  console.log(this.name)
}

// 自己定义的 new 方法
function newMethod(Function, ...args) {
  // 1. 以构造函数的 prototype 属性为原型，创建新对象
  let obj = Object.create(Function.prototype)

  // 2. 将 this 和调用参数传给构造函数执行
  Function.apply(obj, args)

  // 3. 返回步骤1创建的对象
  return obj
}

// 创建实例，将构造函数 Person 和参数传入
const person1 = newMethod(Person, 'Tom', 26)
person1.sayName() // 'Tom'

// 最后检验，与使用 new 的效果相同
person1 instanceof Person // true
person1.hasOwnProperty('name') // true
person1.hasOwnProperty('age') // true
person1.hasOwnProperty('sayName') // false
```

到这里就结束了，文章很短但是值得经常复习回顾。
