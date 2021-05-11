---
title: JavaScript 中奇葩的假值
description: 我真的是个假值！
img: https://images.unsplash.com/photo-1556195332-95503f664ced?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWFnaWN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80
alt: JavaScript 中奇葩的假值
tags: 
  - javascript
---
## JavaScript 中奇葩的假值

通常在以下语句结构中需要判断真假：

1. if 分支语句
2. while 循环语句
3. for 循环中的第二个语句

如：

```js
if(boo){
    // do something
}

while(boo){
    // do something
}

for(var i = 0; i<=3; i++){
    // do something
}
```

JavaScript 中有 6 个值为“假”，这六个值是：

1. false
2. null
3. undefined
4. 0(+0、-0)
5. ""('')(空字符串)
6. NaN

这里面 false 本身是布尔类型，其它 5 个则不是。

除了这 6 个外，其它均为“真”，包括对象、数组、正则、函数等。

**注意：‘0’、‘null'、'false'、{}、[] 也都是真值。

当然，对于这一切，查看下规范是最踏实的，ES 中的 ToBoolean 阐述了所有情形：
**ToBoolean Conversions**
Argument Type | Result
-|-
Completion Record | if argument is an abrupt completion, return argument. Otherwise return ToBoolean(argument,[[value]]).
Undefined | Return **false**.
Null | Return **false**.
Boolean | Return argument.
Number | Return **false** if argument is **+0**, **-0**, or **NaN**; otherwise return **true**.
String | Return **false** if argument is the empty String(its length is zero); otherwise return **true**
Symbol | Return **true**
Object | Return**true**

直接了当可以看到，undefined、null 直接返回 false；Symbol、Object 永远返回 true，本身就是 Boolean 型直接返回原本值；Number 型的除 +0、-0 和 NaN 返回 false 以外，其余都返回 true；String 型中空字符串（即长度为 0）返回 false，其他情况返回 true。

**总结一下自身进行判断(toBoolean),假值的有 6 种情况：false、null、undefined、""('')(空字符串)、0(+0、-0)、NaN。**

## 扩展

虽然上面讨论的六个值都为“假”，它们之间并非都相等(非严格相等)：

```js
console.log( false == null )      // false
console.log( false == undefined ) // false
console.log( false == 0 )         // true
console.log( false == '' )        // true
console.log( false == NaN )       // false
 
console.log( null == undefined ) // true
console.log( null == 0 )         // false
console.log( null == '' )        // false
console.log( null == NaN )       // false
 
console.log( undefined == 0)   // false
console.log( undefined == '')  // false
console.log( undefined == NaN) // false
 
console.log( 0 == '' )  // true
console.log( 0 == NaN ) // false
```

对于相等运算符(==)，可以参考[相等运算符(==)详解](/blog/相等运算符(==)详解)
