---
title: Proxy
description: Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）
img: https://images.unsplash.com/photo-1602902261548-691bc39d7004?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJveHl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80
alt: Proxy
tags:
  - javascript
---
## Proxy 定义

Proxy 用于修改对象的某些默认行为，获取值、设置值等。

## Proxy 语法

```js
let p = new Proxy(target, handler);
```

target: 用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。

handler: 一个对象，其属性时当执行一个操作时定义代理的行为的函数。

最后返回的 p 就是我们需要的代理。

## Proxy.revocable() 方法

```js
let {proxy, revoke} = Proxy.revocable(target, handler)
```

target，handler 参数和 new Proxy() 一致；

proxy 与上个方法中用 new Proxy 创建的对象是一致的。

revoke() 方法是一个没有参数的函数，用于撤销 Proxy。调用后，代理会变为无效状态。这个时候，我们去执行 Proxy 的任何操作都会抛出异常。revoke() 方法不可以重复调用。

来看一个例子：

```js
let student = {}
let handler = {
    get: (target, property, receiver) => {
        return '小明'
    }
}
let {proxy, revoke} = Proxy.revocable(student, handler)
console.log(proxy.name) // 小明
revoke()
console.log(proxy.name) // 抛出异常 TypeError
```

## handler 对象

handler 对象支持的配置项，包括以下 13 个方法：

* get
* set
* deleteProperty
* ownKeys
* apply
* construct
* getPrototypeOf
* setPrototypeOf
* isExtensible
* preventExtensions
* getOwnPropertyDescriptor
* defineProperty
* has

### handler get

拦截对象属性值的获取。

```js
get(target, property, receiver)
```

target: 目标对象；

property: 属性名；

receiver: 所操作的对象。

我们来看一个具体的例子：

```js
let student = {
    _key: 'xiaoming',
    name: '小明'
}
let handler = {
    get: function(target, property, receiver) {
        if(property.startsWith('_')){
            throw Error(`${property} is private.`)
        } else {
            return Reflect.get(target, property, receiver)
        }
    }
}
let proxy = new Proxy(student, handler)
console.log(proxy.name) // 小明
console.log(proxy._key) // error
```

### handler set

拦截对象属性值的设置。

```js
set(target, property, value, receiver)
```

target: 目标对象;

property: 属性名;

value: 属性值;

receiver: 所操作的对象。

来看一个例子：

```js
let student = {
    _key: 'xiaoming',
    name: '小明'
}
let handler = {
    set: function(target, property, value, receiver){
        if(property.startsWith('_'))｛
        throw Error(`${}`)
    }
}
let proxy = new Proxy(student, handler)
proxy.name = '小兰' // 小兰
proxy._key = 'xiaolan' // error
```

### handler deleteProperty

拦截对象属性的删除。

```js
deleteProperty(target, property)
```

target: 目标对象;

property: 属性名。

来看一个具体的例子：

```js
let student = {
    _key: 'xiaoming',
    name: '小明'
}
let handler = {
    deleteProperty: function(target, property){
        if(property.startsWith('_')){
            throw Error(`${property} is private.`)
        } else {
            return Reflect.deleteProperty(target, property)
        }
    }
}
let proxy = new Proxy(student, handler)
delete proxy.name // true
delete proxy._key // error
```

### handler getOwnProertyDescriptor

拦截获取对象属性描述。

```js
getOwnProertyDescriptor(target, property)
```

target: 目标对象;

property: 属性名。

例子：

```js
let student = {
    _key: 'xiaoming',
    name: '小明'
}
let handler = {
    getOwnPropertyDescriptor: function(target, property) {
        if(property.startsWith('_')){
            return
        } else {
            return Reflect.getOwnPropertyDescriptor(target, property)
        }
    }
}
let proxy = new Proxy(student, handler)
console.log(Reflect.getOwnPropertyDescriptor(proxy, '_key')) // undefined
console.log(Reflect.getOwnPropertyDescriptor(proxy, 'name')) // {value: "小明", writable: true, enumerable: true, configurable: true}
```

### handler defineProperty

拦截定义对象属性描述。

```js
defineProperty(target, property, descriptor)
```

target: 目标对象;

property: 属性名;

descriptor: 属性描述。

例子：

```js
let student = {}
let handler = {
    defineProperty: function(target, property, descriptor){
        if(property.startsWith('_')){
            return false
        } else {
            reutrn Reflect.defineProperty(target, property, descriptor)
        }
    }
}
let proxy = new Proxy(student, handler)
Reflect.defineProperty(proxy, 'name', {value: "小明", writable: true, enumerable: true, configurable: true})
Reflect.defineProperty(proxy, '_key', {value: "xiaoming", writable: true, enumerable: true, configurable: true})
console.log(proxy) // {name: "小明"}
```

### handler has

拦截判断对象属性是否存在。

包括 property in proxy 和 Reflect.has，不包括 Object.prototype.hasOwnProperty。

```js
has(target, property)
```

target: 目标对象;

property: 属性名。

例子：

```js
let student = {}
let handler = {
    has: function(target, property) {
        return true
    }
}
let proxy = new Proxy(target, handler)
console.log(proxy.hasOwnProperty('name')) // false
console.log(Reflect.has(proxy, 'name')) // true
console.log('name' in proxy) // true
```

### handler ownKeys

拦截对象自身属性 key 值的读取操作，返回字符串或 Symbol 值数组。

* Object.getOwnPropertyNames()
* Object.getOwnPropertySymbols()
* Object.keys()
* for...in 循环

```js
ownKey(target)
```

target: 目标对象

例子：

```js
let o = {id:0}
let o2 = Object.create(o)
o2.a = 1
o2.b = 2
o2.c = 3
let handler = {
    ownKeys(target) {
        return ['a', 'b', 'c', 'd', Symbol.for('e')]
    }
}
let proxy = new Proxy(o2, handler)
console.log(Object.getOwnPropertyNames(proxy)) // 只过滤出 string 类型的
console.log(Object.getOwnPropertySymbols(proxy)) // 只过滤出 Symbol 类型的
console.log(Object.keys(proxy)) // 只过滤出 string 类型的，并且在目标对象上存在的属性
for(let p in proxy){
    console.log(p) // 只过滤出 string 类型的，在目标对象或者原型链上存在的属性
}

// 输出
["a","b","c","d"]
[Symbol(e)]
["a","b","c"]
a
b
c
id
```

### handler apply

拦截函数调用。

```js
apply(target, ctx, args)
```

target: 目标对象；

ctx: 目标对象的上下文执行环境；

args: 目标对象的参数数组。

例子：

```js
function add(a, b){
    return a + b
}
let handler = {
    apply(target, ctx, args){
        return Reflect.apply(target, ctx, args) + 1
    }
}
let proxy = new Reflect(add, handler)
console.log(proxy(1, 1)) // 3
console.log(proxy.call(null, 1, 1)) // 3
console.log(proxy.apply(null, [1, 1])) // 3
```

apply 拦截正常的函数调用、call、apply 方法。

### handler construct

拦截构造函数调用。

```js
construct(target, args)
```

target: 目标对象；

args: 目标对象的参数数组。

例子：

```js
function createStudent(name){
    this.name = name
}
let handler = {
    index: 0,
    construct(target, args){
        let o = new target(...args)
        o.id = this.index++
        return 0
    }
}
let proxy = new Proxy(createStudent, handler)
let student0 = new createStudent('丁丁')
let student1 = new proxy('小明')
let student2 = new proxy('小兰')
console.log(student0) // {name: "丁丁"}
console.log(student1) // {name: ”小明", id: 0}
console.log(student2) // {name: “小兰", id: 1}
```

### handler getPrototypeOf

拦截获取对象的原型。

* Object.prototype.__proto__
* Object.prototype.isPrototypeOf()
* Object.getPrototypeOf()
* Reflect.getPrototypeOf()
* instanceof

```js
getPrototypeOf(target)
```

target: 目标对象。

例子：

```js
let student = {}
let handler = {
    getPrototypeOf(target) {
        return student
    }
}
let proxy = new Proxy(student, handler)
console.log(Object.getPrototypeOf(proxy) === student) // true
```

### handler setPrototypeOf

拦截设置对象的原型。

* Object.prototype.__ptoto__
* Object.setPrototypeOf()
* Reflect.setPrototypeOf()

```js
setPrototypeOf(target, proto)
```

target: 目标对象；

proto: 具体的目标原型。

例子：

```js
let student = {}
let handler = {
    setPrototypeOf(target, proto) {
        throw new Error(`the prototype can't be change`)
    }
}
let proxy = new Proxy(student, handler)
Object.setPrototypeOf(proxy, {}) // error
proxy.__proto__ = {} // error
Reflect.setPrototypeOf(proxy, {}) // error
```

### handler isExtensible

拦截判断对象是否可扩展。

```js
isExtensible(target)
```

### handler preventExtensions

拦截对象的阻止扩展方法。

```js
preventExtensions(target)
```

例子：

```js
let student = {}
let proxy = new Proxy(student, {
    preventExtensions: function(target){
        return Reflect.preventExtensions(target)
    }
    isExtentsible: function(target){
        return Reflect.isExtensible(target)
    }
})
Reflect.preventExtensions(proxy)
console.log(Reflect.isExtensible(proxy)) // false
```

### handler

更多关于 handler 规范，请参照 ES2015 规范的 26.2.2 章节。

## 综合应用

监控某个对象，在执行该对象的所有函数时，打印执行前后的日志。

```js
let target = {
    id: '100',
    getName: function(){
        console.log('getName exex')
        return '小明'
    }
}
let handler = {
    get: function(target, property, receiver){
        let value = Reflect.get(target, property, receiver)
        if(typeof value === 'function'){
            return function(...rest){
                console.log(`before ${property} exec.`)
                let result = Reflect.apply(value, target, rest)
                console.log(`after ${property} exec.`)
                return result
            }
        } else {
            return value
        }
    }
}
let proxy = new Proxy(target, handler)
console.log(proxy.id) // 100
proxy.getName() // before getName exec -> getName exec -> after getName exec
```
