---
title: ES6 函数默认参数与剩余参数
description: 好用！！
img: https://images.unsplash.com/photo-1603851887849-35b99ea8f7be?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDl8fHJlc3R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80
alt: ES6 函数默认参数与剩余参数
tags:
  - javascript
---
## 函数默认参数

在 ES6 中，可以为函数的参数指定默认值。函数默认参数允许在**没有值或者传入 undefined** 时使用默认形参。

```js
function log(x, y = 'World'){
    console.log(x, y)
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello
log('Hello',null) // Hello null
log('Hello',undefined) // Hello World

// 与解构赋值默认值结合
function f({x, y = 2}){
    console.log("x: " + x, "y: " + y)
}
f({}) // x: undefined y: 2
f({x: 100}) // x: 100 y: 2
f({x: 100, y: 200}) // x: 100 y: 200

// 双重默认值
function f2({x = 1, y = 2} = {}) {
    console.log("x: " + x, "y: " + y)
}

f2() // x: 1 y: 2
f2({x: 100}) // x: 100 y: 2
f2({x: 100, y: 200}) // x: 100 y: 200
```

### 默认参数使用注意

#### 1. 参数变量是默认声明的，所以不能用 let 或 const 再次声明。

```js
function foo(x = 5){
    let x = 1 // error
    const x = 2 // error
}
```

#### 2. 使用参数默认值时，函数不能有同名参数。

```js
// 不报错
function foo(x, x, y) {
  // ...
}

// 报错
function foo(x, x, y = 1) {
  // ...
}
// SyntaxError: Duplicate parameter name not allowed in this context
```

#### 3. 显式传入 `undefined` 或不传值时使用函数默认参数值；传入 `''` 或 `null` 时使用传入的参数值。

```js
function test(num = 1) {
  console.log(typeof num);
}

test();          // 'number' (num is set to 1)
test(undefined); // 'number' (num is set to 1 too)

// test with other falsy values:
test('');        // 'string' (num is set to '')
test(null);      // 'object' (num is set to null)
```

#### 4. **参数默认值不是传址的，而是在函数被调用时，参数默认值才会被解析。**

```js
function append(value, array = []) {
  array.push(value);
  return array;
}

append(1); //[1]
append(2); //[2], not [1, 2]
```

#### 5. 位置在前的默认参数可用于后面的默认参数。

```js
function greet(name = 'lucas', greeting = 'cool', message = greeting + ' ' + name) {
    return [name, greeting, message];
}

greet() // ["lucas", "cool", "cool lucas"]
greet('David', 'Hi');  // ["David", "Hi", "Hi David"]
greet('David', 'Hi', 'Happy Birthday!');  // ["David", "Hi", "Happy Birthday!"]
```

#### 6. 通常情况下，**定义了默认值的参数，应该是函数的尾参数**。因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的。

```js
// 例一
function f(x = 1, y){
    return [x, y]
}

f() // [1, undefined]
f(2) // [2, undefined]
f(,1) // 报错
f(undefined, 1) // [1, 1]

// 例二
function f(x, y = 5, z){
    return [x, y, z]
}

f() // [undefined, 5, undefined]
f(1) // [1, 5, undefined]
f(1, ,2) // 报错
f(1, undefined, 2) // [1, 5, 2]
```

#### 7. 指定了默认值以后，函数的 length 属性，将返回没有指定默认值的参数个数。如果设置了默认值的参数，那么 length 属性也不再计入后面的参数了。后文的剩余参数也不会计入 length 属性。

```js
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2

(function(...args) {}).length // 0

(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1
```

## 剩余参数

ES6 引入了剩余参数，用于获取函数的多余参数，这样就不需要使用 arguments 对象了。剩余参数搭配的变量是一个数组，该变量将多余的参数放到数组中。

```js
function add(...values) {
    let sum = 0
    for(const val of values){
        sum += val
    }
    return sum
}
add(2, 5, 3) // 10
```

### 剩余参数使用注意

#### 1. 剩余参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。

```js
// 报错
function f(a, ...b, c) {
  // ...
}
```

#### 2. 函数的 length 属性，不包括剩余参数

```js
(function(a) {}).length  // 1
(function(...a) {}).length  // 0
(function(a, ...b) {}).length  // 1
```

#### 3. 剩余参数可以被解构，这意味着他们的数据可以被解包到不同的变量中。

```js
function f(...[a, b, c]) {
  return a + b + c;
}

f(1)          // NaN (b and c are undefined)
f(1, 2, 3)    // 6
f(1, 2, 3, 4) // 6 (the fourth parameter is not destructured)
```

#### 4. 剩余参数和 arguments 对象的区别

* 剩余参数只包含那些没有对应形参的实参，而 arguments 对象包含了传给函数的所有实参。
* arguments 对象不是一个真正的数组，而剩余参数是真正的 Array 实例，也就是说你能够在它上面直接使用所有的数组方法，比如 sort，map，forEach 或 pop。
* arguments 对象还有一些附加的属性（如 callee 属性）。