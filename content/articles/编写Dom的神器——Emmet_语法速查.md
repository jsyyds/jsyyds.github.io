---
title: 编写Dom的神器——Emmet 语法速查
description: 整个过程就像魔法，输入一串咒语，出现神奇的效果✨
img: https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fG1hZ2ljfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80
alt: 编写Dom的神器——Emmet 语法速查
tags:
  - html
  - web development
---
Emmet 是一款编辑器插件，主流的编辑器都是自带该插件的。在前端开发中，Emmet 使用缩写语法快速编写 HTML、CSS 以及实现其他的功能，极大的提高前端开发效率。

## 基本语法

### id( # )

```
div#app

p#item
```

输入上述代码，就可以快速生成下面的一个id="app"的div标签，所有标签的使用方法都一样。

```html
<div id="app"></div>

<p id="item"></p>
```

### class( . )

```
div.container

p.item
```

输入上述代码，就可以快速生成下面的一个类名为container的div标签，所有标签的使用方法都一样。

```html
<div class="container"></div>

<p class="item"></p>
```

### 后代( > )

```
ul>li
```

输入上述代码，就可以快速生成以下标签，标签间包含即可这么使用。

```html
<ul>
  <li></li>
</ul>
```

### 兄弟( + )

```
input+button
```

输入上述代码，就可以快速生成以下标签，两个标签如果是兄弟关系即可这样使用。

```html
<input type="text"><button></button>
```

### 上级( ^ )

```
ul>li^div

ul>li>a^^div
```

输入上述代码，就可以快速生成以下标签。如果一个元素子节点的父节点有一个兄弟，当然一个^代表父级元素，写两个就是父元素的父级，要翻几级就写几个，就可以采取这种语法规则。

```html
<ul>
  <li></li>
</ul>
<div></div>

<ul>
  <li><a href=""></a></li>
</ul>
<div></div>
```

### 乘法( * )

```
ul>li*3
```

输入上述代码，就可以快速生成以下标签，如果有多个相同的元素，都可以采取这种语法规则。

```html
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>
```

### 分组( () )

```
(ul>li)+div

(ul>li>a)+div
```

输入上述代码，就可以快速生成以下标签，比起（上级节点），我更喜欢这种写法，就够清晰明了。

```html
<ul>
  <li></li>
</ul>
<div></div>

<ul>
  <li><a href=""></a></li>
</ul>
<div></div>
```

### 自定义属性( [attribute] )

```
img[src='1.jpg']

input:radio

input:radio[id='radio']

a[href='https://www.baidu.com' target='_blank']
```

输入上述代码，就可以快速生成以下标签，表单元素的type属性比较特殊，可以采用：的语法规则可以快速生成表单元素，[]内的多个属性用空格隔开。

```html
<img src="1/jpg" />

<input type="radio">

<input type="radio"  id="radio">

<a href="https://www.baidu.com" target="_blank"></a>
```

### 文本( {} )

```
ul>li{我是li}
```

输入上述代码，就可以快速生成以下标签，{}中可以直接写入文本生成，当然主要用途还是和$搭配使用，继续往下看。

```html
<ul>
  <li>我是li</li>
</ul>
```

### 自增符号( $ )

```
div.item$*3

ul>li{我是li$}*3
```

输入上述代码，就可以快速生成以下标签，$序号从 1 开始。

```html
<div class="item1"></div>
<div class="item2"></div>
<div class="item3"></div>

<ul>
  <li>我是li1</li>
  <li>我是li2</li>
  <li>我是li3</li>
</ul>
```

### 隐式标签

```
#app

.item

ul>.item*3

select>.item*5

p>.list*3
```

输入上述代码，就可以快速生成以下标签，如果单独出现的没有标签限制的语法，就直接生成div元素，如果有父元素，那么生成的标签元素就是按照W3C标准规定的语法自动生成，这样也可以阻止标签的胡乱嵌套。虽然胡乱嵌套不会出错，但不符合标准语法。

```html
<div id="app"></div>

<div class="item"></div>

<ul>
  <li class="item"></li>
  <li class="item"></li>
  <li class="item"></li>
</ul>

<select>
   <option class="item"></option>
   <option class="item"></option>
   <option class="item"></option>
   <option class="item"></option>
   <option class="item"></option>
</select>

<p>
  <span class="list"></span>
  <span class="list"></span>
  <span class="list"></span>
</p>
```