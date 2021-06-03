---
title: canvas 实现随机粒子特效
description: 实现一个类似于下雪的 canvas 粒子特效
img: /img/实现随机粒子特效_0.gif
alt: canvas 实现随机例子特效
tags:
  - javascript
---

实现一下类似下雪的 canvas 粒子特效，效果就如文章封面所示，不过封面是张 Gif 图不是真实的效果。

## 实现随机粒子

### 创建全屏 Canvas

首先，我们需要一个全屏的 Canvas 画布。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        html,body {
            margin:0;
            overflow:hidden;
            width:100%;
            height:100%;
            cursor:none;
            background:black;
        }
    </style>
</head>
<body>
<canvas id="canvas"></canvas>

<script>
    var ctx = document.getElementById('canvas'),
        content = ctx.getContext('2d'),
        WIDTH,
        HEIGHT;

    WIDTH = document.documentElement.clientWidth;
    HEIGHT = document.documentElement.clientHeight;

    ctx.width = WIDTH;
    ctx.height = HEIGHT;

</script>
</body>
</html>
```

我们使用 WIDTH、HEIGHT 两个常量储存屏幕宽度和高度信息，我们习惯使用大写来表示改变量为常量，不可变，将屏幕宽度和高度信息储存在常量中是因为我们在稍后还会用到。

这时，你应该得到一个全屏的并且为黑色的 Canvas。

### 设置 `Round_item` 类

在创建了一个全屏的 Canvas 之后，我们来创建单个的 `Round_item` 类。

首先我们 `Round_item` 类需要有什么参数呢？我们要设置的是位置随机、透明度随机、半径随机的圆。为了区分不同的圆，我们还应该设置一个唯一的 `index` 参数。

所以我们需要的参数有：

* x 坐标
* y 坐标
* 半径
* 透明度
* index

根据上面这些可以得出我们的 `Round_item` 类：

```js
function Round_item(index,x,y) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.r = Math.random() * 2 + 1;
    var alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
    this.color = "rgba(255,255,255," + alpha + ")";
}
```

这里我们使用了构造函数的方式来创建单个的圆，我们还需要一个变量 `initRoundPopulation` 来设置 round 的个数，然后我们便可以通过 `for` 循环创建出 `initRoundPopulation` 个圆。

```js
var ctx = document.getElementById('canvas'),
        content = ctx.getContext('2d'),
        round = [],
        WIDTH,
        HEIGHT,
        initRoundPopulation = 80; // 添加 initRoundPopulation
```

### 设置 `draw()` 方法

在设置了单个的 `Round_item` 类之后，我们还要给每一个 `round` 设置 `draw()` 方法，所以我们需要将 `draw()` 方法设置在 `Round_item` 的原型中，这样我们创建出来的每一个 `Round_item` 实例对象都拥有了 `draw()` 方法。

```js
Round_item.prototype.draw = function () {
  content.fillStyle = this.color;
  content.shadowBlur = this.r * 2;
  content.beginPath();
  content.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
  content.closePath();
  content.fill();
};
```

### 设置初始化 `init()` 函数

然后我们就需要设置初始化 `init()` 函数了，在 `init()` 函数中，我们的主要任务是创建单个的 `round`，然后使用其 `draw()` 方法。

```js
function init() {
    for(var i = 0; i < initRoundPopulation; i++ ){
        round[i] = new Round_item(i,Math.random() * WIDTH,Math.random() * HEIGHT);
        round[i].draw();
    }

}
```

至此，我们已经完成了随机粒子的实现，完整的代码如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        html,body {
            margin:0;
            overflow:hidden;
            width:100%;
            height:100%;
            cursor:none;
            background:black;
        }
    </style>
</head>
<body>
<canvas id="canvas"></canvas>

<script>
    var ctx = document.getElementById('canvas'),
        content = ctx.getContext('2d'),
        round = [],
        WIDTH,
        HEIGHT,
        initRoundPopulation = 80;


    WIDTH = document.documentElement.clientWidth;
    HEIGHT = document.documentElement.clientHeight;

    ctx.width = WIDTH;
    ctx.height = HEIGHT;

    function Round_item(index,x,y) {
        this.index = index;
        this.x = x;
        this.y = y;
        this.r = Math.random() * 2 + 1;
        var alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
        this.color = "rgba(255,255,255," + alpha + ")";
    }

    Round_item.prototype.draw = function () {
        content.fillStyle = this.color;
        content.shadowBlur = this.r * 2;
        content.beginPath();
        content.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        content.closePath();
        content.fill();
    };

    function init() {
        for(var i = 0; i < initRoundPopulation; i++ ){
            round[i] = new Round_item(i,Math.random() * WIDTH,Math.random() * HEIGHT);
            round[i].draw();
        }

    }

    init();
</script>
</body>
</html>
```

## 使你的粒子动起来

其实，Canvas 制作动画是一个不断擦除再重绘的过程，跟最原始实现动画的方式类似。在纸片上画每一帧，然后以很快的速度翻动小本本，就会有动画的效果。

现在我们实现动画需要在很短的时间内不断的清除内容再重新绘制，新的图形和原先清除的图形之间有某种位置关系，速度足够快的话，我们就会看到动画的效果。

所以我们需要一个 `animate()` 函数，这个函数的作用是帮助我们形成动画，我们在这个函数中首先需要清除当前屏幕，这里的清除函数用到的是 `content.clearRect()` 方法。

我们先来看一下 canvas 的 content.clearRect() 方法：

```js
context.clearRect(x,y,width,height);
```

* x：要清除的矩形左上角的 x 坐标
* y：要清除的矩形左上角的 y 坐标
* width：要清除的矩形的宽度，以像素计
* height：要清除的矩形的高度，以像素计

在刚刚的分析中可以得出，我们需要清除的区域是整个屏幕，所以 `content.clearRect()` 的参数就是 `content.clearRect(0, 0, WIDTH, HEIGHT)`;，这里我们就用到了之前获取的屏幕宽度和高度的常量：`WIDTH` 和 `HEIGHT`。这样我们就将屏幕上的所有内容都清除了。

清除了屏幕内容之后我们就要重新绘制图形，重新绘制的图形是需要和原图形之间有一定的关系，我们先制作一个简单的效果 —— 粒子匀速上升。粒子匀速下降，也就是 y 坐标在不断地变化，既然是匀速的，那么也就是在相同的时间位移是相同的。

我们将粒子位移的变化函数 `move()` 写在 `Round_item` 的原型上。稍后我们再实现。

重新绘制完图形之后，我们就完成了清除屏幕内容再重新绘制新的图形的任务。那么还需要有一个步骤 —— “ 不断”，要想实现动画的效果，就需要 “不断” 地进行清除再重绘，并且中间间隔的时间还不能过长。

这时你可能会想到使用 js 的 `setTimeout()` 方法，但是 `setTimeout` 和 `setInterval` 的问题是，它们都不精确。它们的内在运行机制决定了时间间隔参数实际上只是指定了把动画代码添加到浏览器 UI 线程队列中以等待执行的时间。如果队列前面已经加入了其他任务，那动画代码就要等前面的任务完成后再执行。

我们需要使用另外一个函数 —— `requestAnimationFrame()` 。

`window.requestAnimationFrame()` 方法告诉浏览器，你希望执行动画，并请求浏览器调用指定的函数在下一次重绘之前更新动画。该方法使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用。

`requestAnimationFrame()` 函数可以说是专门用来写动画的。那么 `requestAnimationFrame()` 有什么优点呢？

编写动画循环的关键是要知道延迟时间多长合适。一方面，循环间隔必须足够短，这样才能让不同的动画效果显得平滑流畅；另一方面，循环间隔还要足够长，这样才能确保浏览器有能力渲染产生的变化。

大多数电脑显示器的刷新频率是 60Hz，大概相当于每秒钟重绘 60 次。大多数浏览器都会对重绘操作加以限制，不超过显示器的重绘频率，因为即使超过那个频率用户体验也不会有提升。因此，最平滑动画的最佳循环间隔是 1000ms/60，约等于 16.6ms。

`requestAnimationFrame` 采用系统时间间隔，保持最佳绘制效率，不会因为间隔时间过短，造成过度绘制，增加开销；也不会因为间隔时间太长，使动画卡顿不流畅，让各种网页动画效果能够有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果。

所以我们就使用 `requestAnimationFrame()` 函数递归的调用 `animate()` 函数来实现动画的效果。

```js
function animate() {
    content.clearRect(0, 0, WIDTH, HEIGHT);

    for (var i in round) {
        round[i].move();
    }
    requestAnimationFrame(animate);
}
```

### 创建 `move()` 函数

使用 `move()` 函数来改变 `round` 的 y 坐标。那么我们就来实现一下。

* 将 move() 方法写在 Round_item 的原型上，这样我们创建的每一个 round 都具有了 move() 方法。
* 在 move() 方法中，我们只需要改变 round 的 y 坐标即可，并且设置边界条件，当 y 坐标的值大于 HEIGHT+10，代表该 round 已经超出了屏幕，这个时候我们要将其移动到屏幕的最顶端，这样才能保证我们创建的粒子数不变，一直是 initRoundPopulation 的值。
* 这样就是一个粒子在不断地下降，下降到了最底端再移动到最顶端的循环过程，看起来像是有源源不断的粒子，但其实总数是不变的。
* 在 y 坐标的变化之后，我们还需要使用新的 y 坐标再来重新绘制一下该 round。

经过上面的分析，move() 写起来是不是很简单呢？

```js
Round_item.prototype.move = function () {
    this.y -= 0.15;
    if (this.y >= HEIGHT + 10) {
        this.y = -10;
    }
    this.draw();
};
```

### 在 `init()` 中加入 `animate()`

* 我们想要实现动画的效果，还需要在 init() 中加入 animate() 函数。
* 最后，我们来看一下动画完整的实现代码吧:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        html, body {
            margin: 0;
            overflow: hidden;
            width: 100%;
            height: 100%;
            cursor: none;
            background: black;
        }
    </style>
</head>
<body>
<canvas id="canvas"></canvas>

<script>
    var ctx = document.getElementById('canvas'),
        content = ctx.getContext('2d'),
        round = [],
        WIDTH,
        HEIGHT,
        initRoundPopulation = 80;


    WIDTH = document.documentElement.clientWidth;
    HEIGHT = document.documentElement.clientHeight;

    ctx.width = WIDTH;
    ctx.height = HEIGHT;

    function Round_item(index, x, y) {
        this.index = index;
        this.x = x;
        this.y = y;
        this.r = Math.random() * 2 + 1;
        var alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
        this.color = "rgba(255,255,255," + alpha + ")";
    }

    Round_item.prototype.draw = function () {
        content.fillStyle = this.color;
        content.shadowBlur = this.r * 2;
        content.beginPath();
        content.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        content.closePath();
        content.fill();
    };

    function animate() {
        content.clearRect(0, 0, WIDTH, HEIGHT);

        for (var i in round) {
            round[i].move();
        }
        requestAnimationFrame(animate)
    }

    Round_item.prototype.move = function () {
        this.y -= 0.15;
        if (this.y <= -10) {
            this.y = HEIGHT + 10;
        }
        this.draw();
    };


    function init() {
        for (var i = 0; i < initRoundPopulation; i++) {
            round[i] = new Round_item(i, Math.random() * WIDTH, Math.random() * HEIGHT);
            round[i].draw();
        }
        animate();

    }

    init();
</script>
</body>
</html>
```

效果如下：

<img src="/img/实现随机粒子特效_0.gif" width="400">
