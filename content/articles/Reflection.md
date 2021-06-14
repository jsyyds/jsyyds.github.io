---
title: Reflection
description: Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法
img: https://images.unsplash.com/photo-1543200226-409d35b65e09?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cmVmbGVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80
alt: Reflection
tags:
  - javascript
---
## 反射的概念

### 反射机制的定义

通俗来讲，反射机制指的是程序在运行时能够获取自身的信息。

### 静态语言反射

如果同学们使用过 Java 之类的静态语言，那应该对反射有比较强的概念。

在 Java 中使用反射：

```java
Class<?> clazz = Class.forName("com.netease.main.Person");

Method[] methods = clazz.getMethods();
```

这里，我们通过 class.forName 方法找到了 Person Class，并调用 getMethods() 方法获取了 Person 的所有方法。这就是 Java 中的反射。

### JavaScript 反射

假设有一个对象 obj，我们不知道他的内部结构和 Api。

这个时候我们通过某种机制获取一个对象的内部结构，这种机制就叫做反射。

我们来看一个例子：

```js
for(let p in window){
    console.log(p)
}
```

```js
window['open']('http://www.163.com')
```

这里，我们使用 for...in 循环查看 window 对象内部的结构，并输出到控制台。在了解了 window 的内部结构后，调用 window 对象上的 open 方法，打开一个新的页面。

上述过程实际上就是一种反射。

再来看一个例子。

使用 Object.keys 方法获取对象的内部结构：

```js
let obj = {
    id: 1,
    name: 'abc',
    run: function(){
        console.log('run')
    }
}
console.log(Object.keys(obj))
```

输出结果：

```js
["id", "name", "run"]
```

我们定义了一个 obj 对象，然后用 Object.keys() 方法获取该对象所有可枚举属性组成的数组。使用 keys() 与 使用 for...in 遍历时返回的顺序是一致的，区别是：for...in 循环还会循环其原型链上的属性。

## Reflect

### Reflect 定义

Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。

* Reflect 没有构造函数，不能使用 `new` 运算符去新建，也不能将其作为一个函数去调用。
* Reflect 的所有属性和方法都是静态的（类似 Math 对象）。

### 为什么需要 Reflect 对象？

* 把实现反射机制的方法重新归结在一起并且简化操作，保持 JS 语意清晰和语法简单。

来看一个例子：

```js
let key1 = 'id'
let key2 = Symbol.for('name')
let obj = {[key1]: 1,[key2]: 2}
let keys = Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj))
```

我们定义了一个 obj 对象，其中 key1 是字符串类型，key2 是 Symbol 类型，如果需要获取该对象所有的 key，使用原来的方法，需要先调用 Object.getOwnPropertyNames() 获取到 string 类型的 key，再调用 Object.getOwnPropertySymbols() 获取到 Symbol 类型的 key，然后再将它们拼接起来。

接下来，我们使用 Reflect 的方法来写：

```js
let keys = Reflect.ownKeys(obj)
```

大家可以看到，我们直接调用 Reflect.ownKeys() 方法，即可获取到 obj 对象所有的 key。

* 补充了一些 Object 对象没有的方法，比如 Reflect.apply。

来看一个例子：

```js
function fn(...rest){
    console.log(rest)
    console.log('hello :' + this.name)
}
fn.apply = null

fn.apply(1, 2, 3)// 错误
Function.prototype.apply.call(fn, {name: '小明'}, [1, 2, 3])// 正确
```

我们定义了一个函数 fn()，并且把 fn 的 apply 方法重置成 null，这时候如果调用 fn.apply() 就会出错，我们需要调用 prototype.apply.call() 方法对 fn 进行调用，但这种方法显然非常的麻烦。

下面，我们看换成 Reflect 的方式：

```js
Reflect.apply(fn, {name: '小明'}, [1, 2, 3])
```

我们只需要调用 Reflect.apply() 方法即可。

输出结果：

```js
[1, 2, 3]
hello :小明
```

* 让 Object 操作都变成函数行为，比如使用 Reflect.has(obj, name) 替换 name in boj。

看一例子：

```js
let obj = {id: 1}
if('id' in obj){
    console.log('ok')
}
```

我们这里判断 id 属性是不是属于 obj，使用了 in 操作。换成 Reflect 之后，我们可以用函数的方法去判断，使代码的可读性和可维护性更好：

```js
let obj = {id: 1}
if(Reflect.has(obj, 'id')){
    console.log('ok')
}
```

## Reflect 的方法

Reflect 提供 13 个静态方法：

* Reflect.apply()
* Reflect.construct()
* Reflect.defineProperty()
* Reflect.deleteProperty()
* Reflect.get()
* Reflect.getOwnPropertyDescriptor()
* Reflect.getPrototypeOf()
* Reflect.has()
* Reflect.isExtensible()
* Reflect.ownKeys()
* Reflect.preventExtensions()
* Reflect.set()
* Reflect.setPrototypeOf()

### Reflect.apply()

对一个函数进行调用操作，同时可以传入一个数组作为调用参数。

```js
Reflect.apply(target, thisArgument, argumentsList)
```

target 是目标函数；thisArgument 是 target 函数调用时绑定的 this 对象；argumentsList 是 target 函数调用时传入的实参列表，该参数应该是一个数组。

我们来看一个例子：

```js
Reflect.apply(Math.min, undefined, [1,2,3,4,5])

// 输出结果
1
```

### Reflect.construct()

对构造函数进行 new 操作，相等于执行 new target(...args)。

```js
Reflect.construct(target, argumentsList[, newTarget])
```

target：被运行的目标函数；

argumentsList：调用构造函数的数组；

newTarget：可选，该参数为构造函数；如果没有 newTarget 参数，默认和 target 一致。

来看一个例子：

```js
Reflect.constructor(Date, [2018, 4, 1])
```

我们会得到一个日期，该日期是 2018年4月1号。

### Reflect.defineProperty()

定义对象的一个属性。

```js
Reflect.defineProperty(target, property, attributes)
```

target: 目标对象；

property: 要定义或修改的属性名称；

attributes: 要定义或修改的属性描述。

来看一个例子：

```js
let student = {}
Reflect.defineProperty(student, "name", {value: "小明"})
console.log(student.name)

// 输出结果
小明
```

### Reflect.deleteProperty()

删除一个对象的一个属性。

```js
Reflect.deleteProperty(target, property)
```

target: 删除属性的目标对象；

property: 要删除的属性名称。

来看一个例子：

```js
let student = {name: '小明'}
Reflect.deleteProperty(student, 'name')
console.log(student.name)

// 输出结果
undefined
```

### Reflect.get()

查找并返回对象的属性值。

```js
Reflect.get(target,property[,receiver])
```

target: 目标对象；

property: 属性名；

receiver: 可选函数。如果遇到 getter，this 值将提供给目标调用。

先来看一个没有 receiver 的例子：

```js
let obj = {
    a: 1,
    b: 2,
    get c(){
        return this.a + this.b
    }
}
console.log(Reflect.get(obj,'a')) // 1
console.log(Reflect.get(obj,'b')) // 2
console.log(Reflect.get(obj,'c')) // 3
```

再来看一个有 receiver 的例子：

```js
let obj = {
    a: 1,
    b: 2,
    get c(){
        return this.a + this.b
    }
}
let receiver = {
    a: 4,
    b: 4
}
console.log(Reflect.get(obj,'a')) // 1
console.log(Reflect.get(obj,'b')) // 2
console.log(Reflect.get(obj,'c')) // 8
```

这里 obj 的 a 和 b 属性都不是 getter，而 c 是，所以 c 的 this 指向 receiver。

也就是说，我们在取 obj 的 c 属性的时候，实际上返回的结果是 receiver 中的 `this.a` 加上 receiver 中的 `this.b`，也就是 4 + 4，最后的结果是 8。

### Reflect.set()

设置对象的属性值。

```js
Reflect.set(target, property, value[, receiver])
```

target: 目标对象；

property: 属性名称；

value: 设置的值；

receiver: 可选。如果遇到 setter，this 将提供给目标调用。

我们来看一个没有 receiver 的例子：

```js
let student = {
    name: '小明'
}
console.log(student.name) // 小明
Reflect.set(student, 'name', '小兰')
console.log(student.name) // 小兰
```

下面是又 receiver 的情况：

```js
let student = {
    name: '小明',
    set nickname(value){
        return this.name = value
    }
}
let receiver = {
    name: '小明'
}
console.log(student.name); // 小明
console.log(receiver.name); // 小明
Reflect.set(student, 'nickname', '小兰', receiver);
console.log(student.name); // 小明
console.log(receiver.name); // 小兰
```

这是因为我们在设置 nickname 的时候，遇到了 setter，所以 receiver 对象将作为 this 提供给目标参数调用。导致在执行 this.name 的时候，实际上修改的是 receiver 对象。

### Reflect.getOwnPropertyDescriptor()

查找并返回对象的属性描述符。

```js
Reflect.getOwnPropertyDescriptor(target, propertyKey)
```

target: 目标对象；

propertyKey: 属性名称

下面来看一个例子：

```js
let student = { name: '小明' }
console.log(Reflect.getOwnPropertyDescriptor(student, 'name'))
// {value: "小明", writable: true, enumerable: true, configurable: true}
```

### Reflect.getPrototypeOf()

返回指定对象的原型，读取对象的 __proto__ 属性。

```js
Reflect.getPrototypeOf(target)
```

target: 目标对象。

下面来看一个例子：

```js
function createStudent(name){
    this.name = name
}
let student = new createStudent('小明')
console.log(Reflect.getPrototypeOf(student) === createStudent.prototype) // true
```

### Reflect.setPrototypeOf()

设置指定对象的原型。

```js
Reflect.setPrototypeOf(target, prototype)
```

target: 目标对象;

prototype: 目标的新原型；

下面来看一个例子：

```js
function createStudent(name){
    this.name = name;
}
let student = createStudent('小明');
console.log(Reflect.getPrototypeOf(student) === createStudent.prototype); // true
Reflect.setPrototypeOf(student, null);
console.log(Reflect.getPrototypeOf(student)); // null
```

### Reflect.has()

判断 obj 是否有某个属性。和 in 运算符的功能完全相同。

```js
Reflect.has(target, prototype)
```

target: 目标对象；

prototype: 属性名称。

来看一个例子：

```js
let student = {
    name: '小明'
}
// 旧写法
console.log('name' in student) // true
// 新写法
console.log(Reflect.has(student, 'name')) // true
```

旧写法和新写法两者的输出结果一致，但是 Reflect.has() 方法将 in 操作变成了函数式调用，写法更加清晰。

### Refelect.isExtensible()

判断一个对象是否可扩展。

```js
Reflect.isExtensible(target)
```

target: 目标对象;

### Reflect.preventExtensions()

让对象变为不可扩展。

```js
Reflect.preventExtensions(target)
```

target: 目标对象。

结合上一个方法来看一个例子：

```js
let student = {}
console.log(Reflect.isExtensible(student) ) // true

Reflect.preventExtensions(student)
console.log(Reflect.isExtensible(student)) // false
```

### Reflect.ownKeys()

返回一个包含所有自身属性（不包含继承属性）的数组。

```js
Reflect.ownKeys(target)
```

target: 目标对象。

来看一个例子：

```js
let student = {
    name: '小明'
}
console.log(Reflect.ownKeys(student)) // ["name"]

Reflect.ownKeys(1) // 错误
Reflect.ownKeys('小明') // 错误
```
