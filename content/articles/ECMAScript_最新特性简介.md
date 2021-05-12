---
title: ECMAScript 最新特性简介
description: 学...学不动了也要学
img: https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c3R1ZHl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80
alt: ECMAScript 最新特性简介
tags: 
  - javascript
---
## TC39 技术委员会介绍

TC39 是推动 ECMAScript 规范发展的组织，它的成员都是些公司，其中包括了所有主要的浏览器厂商。这个组织会定期举行会议，由各公司派遣的代表和被邀请的专家参与。所有新的 ECMAScript 特性需要得到绝大多数与会成员的支持，并且支持的成员所代表的公司有义务实现新的特性。

### 从 ES6 吸取的教训

ES6 的推出一共花了差不多 6 年时间。这有很大的问题：在正式规范推出前，新特性需要一直被搁置。所以从 ES2016 开始，TC39 决定每年会发布一个新版本，名称就以年号为名，比如，ES2017、ES2018 等等。

### TC39 的解决方案

![TC39 的解决方案](/img/TC39-的解决方案.png)

## ES2016 & ES2017

### Array.prototype.includes

```js
arr.includes(searchElement[, fromIndex])
```

```js
[1, 2, 3].includes(2) // true
[1, 2, 3].includes(4) // false
[1, 2, 3].includes(3, 3) // false
[1, 2, 3].includes(3, -1) // true
[1, 2, NaN].includes(NaN) // true
[1, 2, NaN].indexOf(NaN) // -1
```

### 求幂运算符 **

```js
var1 ** var2 // Math.pow(var1, var2)
```

```js
6 ** 2 // 36
```

```js
2 ** 2 * 2 // 8
2 ** (2 * 2) // 16
```

```js
-2 ** 2 // Bash 中是 4，其他语言是 -4，在 JS 中会报错
-(2 ** 2) // 在 JS 中要这么写
```

### async function

```js
async function name([param[, param[, ...param]]]){
    statements
}
```

```js
async function foo() {}
const foo = async function () {}
let obj = { async foo () {} }
const foo = async () => {}
```

### async function 示例

```js
function resolveAfter2Seconds(){
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve('resolved')
        }, 2000)
    })
}
async function asyncCall(){
    console.log('calling')
    var result = await resolveAfter2Seconds()
    console.log(result) // "resolved"
}
asyncCAll()
```

### SharedArrayBuffer 和 Atomics

```js
const buffer = new SharedArrayBuffer(8)
console.log(buffer.byteLength) // 8
```

有兴趣可以点开下面这个链接：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Atomics

### Object.entries() and Object.values()

```js
const object1 = { foo: 'bar', baz: 42 }
console.log(Object.entries(object1)[1]) // ["baz", 42]
```

```js
const object1 = {
    a: 'somestring',
    b: 42,
    c: false
}
console.log(Object.values(object1)) // ["somestring", 42, false]
```

### 字符串的 padStart 和 padEnd 方法

```js
'x'.padStart(5, 'ab') // 'ababx'
'x'.padEnd(5, 'ab') // 'xabab'
```

### Object.getOwnPropertyDescriptors()

```js
const obj = {
    [Symbol('foo')]: 123,
    get bar() { return 'abc' }
}
console.log(Object.getOwnPropertyDescriptors(obj))
// Output:
// {
//     [Symbol('foo')]:
//         {
//             value: 123,
//             writable: true,
//             enumerable: true,
//             configurable: true
//         },
//     bar:
//         {
//             get: [Function: bar],
//             set: undefined,
//             enumerable: true,
//             configurable: true
//         }
// }
```

### 尾部逗号

```js
function foo(param1, param2,){}
foo('abc', 'def',)
let obj = {
    first: 'Jane',
    last: 'Doe',
}
let arr = ['red', 'green', 'blue',]
console.log(arr.length) // 3
```

## ES2018

### Asynchronous Iteration

```js
async function* createAsyncIterable(syncIterable){
    for(const elem of syncIterable){
        yield elem
    }
}
async function func(){
    for await (const x of createAsyncIterable(['a', 'b'])){
        console.log(x)
    }
}
func()
// output:
// 'a'
// 'b'
```

### Rest/Spread Properties

```js
const obj = {foo: 1, bar: 2, baz: 3}
const {bar, ...rest} = obj

console.log(bar) // 2
console.log(rest) // {foo: 1, baz: 3}
```

### 正则表达式的增强

* RegExp named capture groups: https://github.com/tc39/proposal-regexp-named-groups
* RegExp Unicode Property Escapes: https://github.com/tc39/proposal-regexp-unicode-property-escapes
* RegExp Lookbehind Assertions: https://github.com/tc39/proposal-regexp-lookbehind
* s(dotAll) flag for regular expressions: https://github.com/tc39/proposal-regexp-dotall-flag

### Promise.prototype.finally()

```js
promise.then(result => {
    // then statement
}).catch(err => {
    // catch statement
}).finally(()=>{
    // finally statement
})
```

### Template Literal Revision

```js
function latex(str){
    return {"cooked": str[0], "raw": str.raw[0]}
}

// 在老版本（ES2016 以及更早的版本）中会报语法错误，在 ES2018 中可以正常使用
// SyntaxError: malformed Unicode character escape sequence
latex`\unicode`

// 不过，在 ES2018 中，普通模板字符串仍旧会报错
let bad = `bad escape sequence: \unicode`
```

## ES 最新的 proposals

https://github.com/tc39/proposals
