---
title: 深入理解 CSS 盒模型
description: 宽度算不准？看看盒模型
img: https://images.unsplash.com/photo-1612955625275-08aebd897b3a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTZ8fGJveHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80
alt: 深入理解 CSS 盒模型
tags: 
  - css
---
如果你在面试的时候面试官让你谈谈对盒模型的理解，你是不是不止从何谈起。这种看似简单的题其实是最不好答的。

下面本文章将会从一下几个方面谈谈盒模型：

- 什么是盒子模型
- 标准模型和 IE 模型
- CSS 如何设置这两种模型
- 最佳实践
- JS 如何获取盒模型对应的宽和高
- 实例题（根据盒模型解释边距重叠）
- BFC（边距重叠解决方案）

## 什么是盒子模型

说起盒子模型，作为前端开发的我们，相信大家都有了解过的。这里套用 MDN 官网的解释：

> 在一个文档中，每个元素都被表示为一个矩形的盒子。去顶这些盒子的尺寸，属性——像它的颜色，背景，边框方面——和位置是渲染引擎的目标。<br>
> 在 `CSS` 中，使用标准盒模型描述这些矩形盒子中的每一个。这个模型描述了元素所占空间的内容。每个盒子有四个边：外边距边，边框边，内填充边与内容边。

官方语言总是那么的晦涩难懂，那我直接用 chrome 的控制台的截图来说明

![标准模型](/img/盒模型_0.jpg)

最外面橙色的就是外边距区域（margin area），往里黄色的就是边框区域（border area），再往里的绿色的就是内边距区域（padding area），最里面蓝色的就是内容区域（content area）了。

默认情况下，设置 width、height 等作用对象是内容区域，所以设置的 width 仅仅是内容区域的宽度，加上左右内边距大小，导致了元素的整体尺寸变大了。这和我们对现实世界中盒子的认识有差异的。比如，我们说房子面积，并不单单指可用面积，还要包括墙壁厚度、阳台、电梯之类的空间。

## 标准模型和 IE 模型

盒模型是有两种标准的，一个是标准模型，一个是 IE 模型。

![标准模型](/img/盒模型_1.png)

![IE 模型](/img/盒模型_2.png)

从上面两图不难看出在标准模型中，盒模型的宽高只是内容（content）的宽高，而在 IE 模型中盒模型的宽高是内容（content）+ 填充（padding）+ 边框（border）的总宽高。

## CSS 如何设置两种模式

为了把 CSS 和现实世界对应起来，这时候 box-sizing 就派上用场了。box-sizing 是用来设置 width、height 的作用对象的。有两个值，分别是 content-box、border-box，默认值是 content-box。可能有人会问，为什么没有 margin-box 和 padding-box 啊？具体原因就不知道了，可以参考张鑫旭老师在《CSS 世界》一书中提到的没有 margin-box 的两个原因：

> margin-box 本身没有多大的价值。<br>
> 和 margin 的规范会冲突。因为 margin 规范写着“margin 的背景永远是透明的”，如果来个 margin-box，那 background 怎么办？

```css
box-sizing:content-box; /* 标准模式 */

box-sizing:padding-box; /* FireFox 曾经支持*/

box-sizing:border-box; /* IE 模式，全线支持 */

box-sizing:margin-box; /* 从未支持过 */
```

## 最佳实践

为了布局上的方便，一些专家建议我们将所有元素都设置为 `box-sizing:border-box;`，具体原因可以参考这篇文章：[https://css-tricks.com/international-box-sizing-awareness-day/](https://css-tricks.com/international-box-sizing-awareness-day/)

```css
*, *:before, *:after {
  /* Chrome 9-, Safari 5-, iOS 4.2-, Android 3-, Blackberry 7- */
  -webkit-box-sizing: border-box; 

  /* Firefox (desktop or Android) 28- */
  -moz-box-sizing: border-box;

  /* Firefox 29+, IE 8+, Chrome 10+, Safari 5.1+, Opera 9.5+, iOS 5+, Opera Mini Anything, Blackberry 10+, Android 4+ */
  box-sizing: border-box;
}
```

后来，专家又建议用继承的方式，如果不考虑低版本浏览器或使用了 Autoprefixer 的话，可以用下面的代码：

```css
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
```

这种方法被称为最佳实践，具体原因就不说了，参考这里：[https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/](https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/)

既然是专家推荐，那我们以后可以把第二种方法的代码段放到 reset.css 里面。

## JS 获取宽高

通过 JS 获取盒模型对应的宽和高，有一下几种方法：

为了方便书写，以下用 `dom` 来表示获取的 HTML 的节点。

1. dom.style.width/height  
   这种方法只能获取到 dom 元素内联样式所设置的宽高，也就是说如果该节点的样式是在 style 标签中或外联的 CSS 文件中设置的话，通过这种方法是获取不到 dom 的宽高的。

2. dom.currentStyle.width/height  
   这种方法获取的是在页面渲染完成后的结果，就是说不管是哪种方法设置的样式，都能获取到。
   但这种方法只有 IE 浏览器支持。

3. window.getComputedStyle(dom).width/height  
   这种方式的原理和 2 是一样的，这个可以兼容更多的浏览器，通用性好一些。支持现代浏览器和 IE9+。

4. dom.getBoundingClientRect().width/height  
   这种范式是根据元素在视窗中的绝对位置来获取宽高的。

5. dom.offsetWidth/offsetHeight  
   这个就没什么好说的了，最常用的，也是兼容最好的。

## 边距重叠

### 什么是边距重叠

边距重叠是指两个或多个盒子（可能相邻也可能嵌套）的相邻边距（其间没有任何非空内容、补白、边框）重合在一起而形成一个单一边距。

两个或多个块级盒子的垂直相邻边距会重合，它们的边距宽度是相邻边距宽度中的最大值。注意水平边距是不会重合的。

**父子元素的边距重叠**

```html
<style>
    .parent {
        background: #E7A1C5;
    }
    .parent .child {
        background: #C8CDF5;
        height: 100px;
        margin-top: 10px;
    }
</style>
<section class="parent">
    <article class="child"></article>
</section>
```

以为期待的效果：

![盒模型](/img/盒模型_3.png)

而实际上效果如下：

![盒模型](/img/盒模型_4.png)

父元素没有设置 margin-top，而子元素设置了 margin-top: 20px; 可以看出，父元素也一起有了边距。

<style>
  .demo {
    margin: 0;
    padding: 0;
  }
  .demo .header {
    height: 100px;
    background: #eee;
  }
  .demo .parent {
    height: 200px;
    background: #88f;
  }
  .demo .child {
    height: 100px;
    margin-top: 20px;
    background: #0ff;
    width: 200px;
  }
</style>

<div class="demo">
  <div class="header">
    <h2>此部分是为了能更容易看出下面元素的 margin-top</h2>
  </div>
  <div class="parent">
    <div class="child">
      <h2>子元素</h2>
      margin-top:20px;
    </div>
    <h2>父元素</h2>
    没有设置 margin-top
  </div>
</div>

上图的代码：

```html
<style>
  .demo {
    margin: 0;
    padding: 0;
  }
  .demo .header {
    height: 100px;
    background: #eee;
  }
  .demo .parent {
    height: 200px;
    background: #88f;
  }
  .demo .child {
    height: 100px;
    margin-top: 20px;
    background: #0ff;
    width: 200px;
  }
</style>

<div class="demo">
  <div class="header">
    <h2>此部分是为了能更容易看出下面元素的 margin-top</h2>
  </div>
  <div class="parent">
    <div class="child">
      <h2>子元素</h2>
      margin-top:20px;
    </div>
    <h2>父元素</h2>
    没有设置 margin-top
  </div>
</div>
```

如果块元素的 margin-top 与它的第一个子元素的 margin-top 之间没有 border、padding、inline content、clearance 来分隔，或者块元素的 margin-bottom 与它的最后一个子元素的 margin-bottom 之间没有 border、padding、inline content、height、min-height、max-height 分隔，那么外边距会塌陷。子元素多余的外边距会被父元素的外边距截断。

**兄弟元素的边距重叠**

```html
<style>
  #margin {
    background: #E7A1C5;
    overflow: hidden;
    width: 300px;
  }
  #margin>p {
    background: #C8CDF5;
    margin: 20px auto 30px;
  }
</style>
<section id="margin">
  <p>1</p>
  <p>2</p>
  <p>3</p>
</section>
```

![盒模型](/img/盒模型_5.png)

可以看到 1 和 2，2 和 3 之间的间距不是 50px，发生了边距重叠并取了它们之间的最大值 30px。

**空元素的边距重叠**

假设有一个空元素，它有外边距，但是没有边框或填充。在这种情况下，上外边距与下外边距就碰到了一起，它们会发生合并：

![盒模型](/img/盒模型_7.png)

## 边距重叠解决方案（BFC）

首先要明确 BFC 是什么意思，其全英文拼写为 Block Formatting Context 直译为“块级格式化上下文”

**BFC 的原理**

一个 BFC 有如下特性：

* 内部的 box 会在垂直方向，一个接一个的放置
* 每个元素的 margin box 的左边，与包含块 border box 的左边相接触（对于从左往右的格式化，否则相反）
* box 垂直方向的距离由 margin 决定，属于同一个 BFC 的两个相邻 box 的 margin 会发生重叠
* BFC 的区域不会与浮动区域的 box 重叠
* BFC 是一个页面上的独立的容器，外面的元素不会影响 BFC 里的元素，反过来，里面的也不会影响外面的
* 计算 BFC 高度的时候，浮动元素也会参与计算

**怎么去创建 BFC**

创建 BFC 的方法如下：

* 浮动（float 属性不为 none，即脱离文档流）
* 绝对定位元素（position 的值为 absolute 或 fixed）
* 行内块（display 为 inline-block）
* 表格单元（display 为 table、table-cell、table-caption 等 HTML 表格相关属性
* 弹性盒（display 为 flex 或 inline-flex）
* overflow 不为 visible

**应用场景**

**防止垂直 margin 重叠**

父子元素的边距重叠的解决方法：
在父元素上加上 overflow:hidden; 使其成为 BFC。

```css
.parent {
    background: #E7A1C5;
    overflow: hidden;
}
```

![盒模型](/img/盒模型_3.png)

兄弟元素的边距重叠，在第二个子元素创建一个 BFC 上下文：

```html
<section id="margin">
    <p>1</p>
    <div style="overflow:hidden;">
        <p>2</p>
    </div>
    <p>3</p>
</section>
```

![盒模型](/img/盒模型_6.png)


**清除内部浮动**

```html
<style>
  #float {
    background: #FEC688;
  }
  #float .float {
    float: left;
  }
</style>
<section id="float">
  <div class="float">我是浮动元素</div>
</section>
```

父元素 #float 的高度为 0，解决方案为为父元素 #float 创建 BFC，这样浮动子元素的高度也会参与到父元素的高度计算：

```css
#float {
  background: #FEC688;
  overflow: hidden; /* 这里也可以用 float:left; */
}
```

![盒模型](/img/盒模型_8.png)


**自适应两栏布局**

```html
<section id="layout">
    <style>
        #layout {
            background: red;
        }
        #layout .left {
            float: left;
            width: 100px;
            height: 100px;
            background: pink;
        }
        #layout .right {
            height: 110px;
            background: #ccc;
        }
    </style>
    <!--左边宽度固定，右边自适应-->
    <div class="left">左</div>
    <div class="right">右</div>
</section>
```

在这里设置右边的高度高于左边，可以看到左边超出的部分跑到右边去了，这是由于由于浮动框不在文档的普通流中，所以文档的普通流中的块框表现得就像浮动框不存在一样导致的。

![盒模型](/img/盒模型_9.png)

解决方案为给右侧元素创建一个 BFC，原理是 BFC 不会与 float 元素发生重叠。

```css
#layout .right {
    height: 110px;
    background: #ccc;
    overflow: auto;
}
```

![盒模型](/img/盒模型_10.png)

**看一个垂直 margin 重叠的例子**

代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        *{
            margin:0;
            padding:0;
        }
        .top{
            background: #0ff;
            height:100px;
            margin-bottom:30px;
        }
        .bottom{
            height:100px;
            margin-top:50px;
            background: #ddd;
        }
    </style>
</head>
<body>

    <section class="top">
        <h1>上</h1>
        margin-bottom:30px;
    </section>
    <section class="bottom">
        <h1>下</h1>
        margin-top:50px;
    </section>

</body>
</html>
```

效果：

<style>
    .demo2{
        margin:0;
        padding:0;
    }
    .demo2 .top{
        background: #0ff;
        height:100px;
        margin-bottom:30px;
    }
    .demo2 .bottom{
        height:100px;
        margin-top:50px;
        background: #ddd;
    }
</style>

<div class="demo2">
    <section class="top">
        <h1>上</h1>
        margin-bottom:30px;
    </section>
    <section class="bottom">
        <h1>下</h1>
        margin-top:50px;
    </section>
</div>

上下的间距高度是 50px，上下边距重叠，取大值。

用 BFC 可以解决垂直 margin 重叠的问题。

关键代码：

```html
<section class="top">
    <h1>上</h1>
    margin-bottom:30px;
</section>

<!-- 给下面这个块添加一个父元素，在父元素上创建bfc -->
<div style="overflow:hidden">
    <section class="bottom">
        <h1>下</h1>
        margin-top:50px;
    </section>
</div>
```

效果图：

<div class="demo2">
    <section class="top">
        <h1>上</h1>
        margin-bottom:30px;
    </section>
    <div style="overflow:hidden">
        <section class="bottom">
            <h1>下</h1>
            margin-top:50px;
        </section>
    </div>
</div>

此时，上下间距的高度为 50 + 30 = 80px。

>参考链接：[https://segmentfault.com/a/1190000012265930](https://segmentfault.com/a/1190000012265930)
