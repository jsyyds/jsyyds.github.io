---
title: async/await 的含义和用法
description: 异步编程的最终解决方案！
img: https://images.unsplash.com/photo-1622206699823-9687bada23a2?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80
alt: async/await 的含义和用法
tags:
  - javascript
---

本文主要是关于阮一峰大神的[async 函数的含义和用法](http://www.ruanyifeng.com/blog/2015/05/async.html)的学习与记录。

## 1. 终极解决方案

异步操作是 JavaScript 编程的麻烦事，麻烦到一直有人提出各种各样的方案，试图解决这个问题。

从最早的回调函数，到 Promise 对象，再到 Generator 函数，每次都有所改进，但又让人觉得不彻底。它们都有额外的复杂性，都需要理解抽象的底层运行机制。

异步 I/O 不就是读取一个文件吗，干嘛要搞得这么复杂？**异步编程的最高境界，就是根本不用关心它是不是异步。**

async 函数就是隧道尽头的光亮，很多人认为它是异步操作的终极解决方案。

## 2. async 函数是什么？

**一句话，async 函数就是 Generator 函数的语法糖。**

下面有一个 Generator 函数，依次读取两个文件。

```js
var fs = require('fs')

var readFile = function (fileName){
    return new Promise(function (resolve, reject){
        fs.readFile(fileName, function(error, data){
            if(error) reject(error)
            resolve(data)
        })
    })
}

var gen = function* (){
    var f1 = yield readFile('/etc/fstab')
    var f2 = yield readFile('/etc/shells')
    console.log(f1.toString())
    console.log(f2.toString())
}
```

写成 async 函数，就是下面这样：

```js
var syncReadFile = async function(){
    var f1 = await readFile('/etc/fstab')
    var f2 = await readFile('/etc/shells')
    console.log(f1.toString())
    console.log(f2.toString())
}
```

一比较就会发现，async 函数就是将 Generator 函数的星号（*）替换成了 async，将 yield 替换成 await，仅此而已。

## 3. async 函数的优点

async 函数对 Generator 函数的改进，体现在以下三点：

1. **内置执行器。** Generator函数的执行必须靠执行器，所以才有了 co 函数库，而 async 函数自带执行器。也就是说，async 函数的执行，与普通函数一模一样，只要一行：

   ```js
   var result = asyncReadFile()
   ```

2. **更好的语义。** async 和 await，比起星号和 yield，语义更清楚了。async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果。

3. **更广的适用性。** co 函数库约定，yield 命令后面只能是 Thunk 函数或者 Promise 对象，而 async 函数的 await 命令后面，可以跟 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。

## 4. async 函数的实现

**async 函数的实现，就是将 Generator 函数和自动执行器，包装在一个函数里。**

```js
async function fn(args){
    // ...
}
// 等同于
function fn(args){
    return spawn(function*(){
        // ...
    })
}
```

所有的 async 函数都可以写成上面的第二种形式，其中的 spawn 函数就是自动执行器。

下面各处 spawn 函数的实现：

```js
function spawn(genF){
    return new Promise(function(resolve, reject){
        var gen = genF()
        function step(nextF){
            try{
                var next = nextF()
            } catch(e) {
                return reject(e)
            }
            if(next.done){
                return resolve(next.value)
            }
            Promise.resolve(next.value).then(function(v){
                step(function() { return gen.next(v) })
            }, function(e){
                step(function() {return gen.throw(e) })
            })
        }
        step(function() {return gen.next(undefined)})
    })
}
```

async 函数是非常新的语法功能，新到都不属于 ES6，而是属于 ES7。目前，转码器 Babel 已经支持，转码后就能使用。

## 5. async/await 的使用

同 Generator 函数一样，async 函数返回一个 Promise 对象，可以使用 then 方法添加回调函数。当函数执行的时候，一旦遇到 await 就会先返回，等到触发的异步操作完成，再接着执行函数体内后面的语句。

下面是一个例子：

```js
async function getStockPriceByName(name){
    var symbol = await getStockSymbol(name)
    var stockPrice = await getStockPrice(symbol)
    return stockPrice
}

get StockPriceByName('goog').then(function(result){
    console.log(result)
})
```

上面代码是一个获取股票报价的函数，函数面前的 async 关键字，表明该函数内部有异步操作。调用该函数时，会立即返回一个 Promise 对象。

下面的例子，指定多少毫秒后输出一个值：

```js
function timeout(ms){
    return new Promise((resolve)=>{
        setTimeout(resolve, ms)
    })
}

async function asyncPrint(value, ms){
    await timeout(ms) // 等待完成后再运行后面的语句
    console.log(value) // 打印
}

asyncPrint('hello world', 50)
```

上面代码指定 50 毫秒以后，输出 "hello world"。

## 6. 注意点

await 命令后面的 Promise 对象，运行结果可能是 rejected，所以最好把 await 命令放在 try...catch 代码块中。

```js
async function myFunction(){
    try{
        await somethingThatReturnsAPromise()
    } catch(err) {
        console.log(err)
    }
}

// 另一种写法

async function myFunction(){
    await somethingThatReturnsAPromise().catch(function(err){
        console.log(err)
    })
}
```

await 命令只能用在 async 函数之中，如果用在普通函数中，就会报错:

```js
async function dbFunc(db){
    let docs = [{},{},{}]

    // 报错
    docs.forEach(function(doc){
        await db.post(doc)
    })
}
```

上面代码会报错，因为 await 用在普通函数之中了。但是，如果将 forEach 方法的参数改成 async 函数，也有问题：

```js
async function dbFunc(db){
    let docs = [{},{},{}]

    // 可能得到错误的结果
    docs.forEach(async function(doc){
        await db.post(doc)
    })
}
```

上面代码可能不会正常工作，原因是这时三个 db.post 操作将是并发执行，也就是同时执行，而不是继发执行。这时因为 forEach 已经完成了一次对循环的封装，而这个函数本身并没有使用 async/await 来处理异步，所以使用时在回调函数里加上 async/await 是没有作用的。

正确的写法是采用 for 或者 while 循环：

```js
async function dbFunc(db){
    let docs = [{},{},{}]

    for(let doc of docs){
        await db.post(doc)
    }
}
```

如果确实希望多个请求并发执行，可以使用 Promise.all 方法：

```js
async function dbFunc(db){
    let docs = [{},{},{}]
    let promises = docs.map((doc) => db.post(doc))

    let results = await Promise.all(promises)
    console.log(results)
}

// 或者使用下面的写法

async function dbFunc(db){
    let docs = [{},{},{}]
    let promises = docs.map((doc) => db.post(doc))

    let results = []
    for(let promise of pormises){
        results.push(await promise)
    }
    console.log(results)
}
```

**注意：不得为了编写的方便，将可以并行的 IO 过程串行化**

并行 IO 消耗时间约等于 IO 时间最大的那个过程，串行的话消耗时间将是所有过程的时间之和。

示例：

```js
requestData().then(function(data){
    renderTags(data.tags);
    renderArticles(data.articles);
})

// good
async function requestData() {
    const [tags, articles] = await Promise.all([
        requestTags(),
        requestArticles()
    ]);
    return {tags, articles};
}

// bad
async function requestData() {
    let tags = await requestTags();
    let articles = await requestArticles();

    return Promise.resolve({tags, articles});
}
```