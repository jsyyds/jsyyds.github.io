---
title: 页面可见性改变事件——visibilitychange 详解
description: 以一场尴尬的面试为起因的一篇文章😂
img: https://images.unsplash.com/photo-1543839482-6a65ff225d59?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dmlzaWJpbGl0eXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80
alt: 页面可见性改变事件——visibilitychange 详解
tags:
  - javascript
---
面试的时候发生了些尴尬的事情，简单来说就是打小抄被发现了😂。我们是用浏览器页面进行视频面试的，面试官直接告诉我他可以看到我这边有标签页切换的动作。emmm，好吧，只好承认是在翻笔记。面试还是继续进行了，后面答的其实还不错，但估计印象分没了。算了，不能白丢人一场，好歹知道页面可以监听切换标签页这类操作了，记个笔记😂。

***

## visibilitychange

MDN 上的解释是：

当其选项卡的内容变得可见或被隐藏时，会在文档上触发 `visibilitychange` (能见度更改)事件。

简单的说，**浏览器标签页被隐藏或显示的时候会触发`visibilitychange`事件。**

奇怪的是，这个事件中不包含文档更新的可见性状态，需要从文档的 `visibilityState` 属性中获取该信息。

### 例子

```js
document.addEventListener('visibilitychange', function() {
    console.log(document.visibilityState)
})
```

<script>
    document.addEventListener('visibilitychange', function() {
        console.log(document.visibilityState)
    })
</script>

你可以现在就打开浏览器的开发工具，然后切换标签页、最小化、最大化、用另一个窗口遮挡页面、甚至是在这个页面前用鼠标拉伸另一个窗口使之不断遮挡和离开页面，都可以触发 `visibilitychange` 事件。

## Document.visibilityState

刚刚已经看到事件打印输出 `visibilityState` 的值：`visible` 和 `hidden`，其实还有一个表示(正在)预渲染的值 `prerender`。关于 `visibilityState`，MDN 中的详细介绍如下：

**Document.visibilityState** (只读属性)，返回 document 的可见性，即当前可见元素的上下文环境。由此可以知道当前文档(即为页面)是在背后，或是不可见的隐藏的标签页，或者(正在)预渲染。可用的值如下：

* `'visible'`：此时此时页面内容至少是部分可见。即此页面在前景标签页中，并且窗口没有最小化。
* `'hidden'`：此时页面对用户不可见。即文档处于背景标签页或者窗口处于最小化状态，或者操作系统正处于 '锁屏状态'。
* `'prerender'`：页面此时正在渲染中, 因此是不可见的 (considered hidden for purposes of document.hidden)。文档只能从此状态开始，永远不能从其他值变为此状态。注意：浏览器支持是可选的。

## 使用场景

页面可见性API对于节省资源和提升性能特别有用，它使页面在文档不可见时避免执行不必要的任务。

当用户最小化窗口或者切换到另一个选项卡时，API 会发送 visibilitychange 事件，让开发者知道页面状态已更改。你可以检测事件并执行某些操作或行为。例如，如果你的网络应用正在播放视频，则可以在用户将标签页放入背景时暂停视频，并在用户返回标签页时恢复播放。用户不会在视频中丢失位置，视频的音轨不会干扰新前景选项卡中的音频，并且用户在此期间不会错过任何视频。这种体验是用户无感知的，并且对于用户体验是非常友好的。

因此规范的使用这个API可以减少对用户宽带的占用，减少服务器压力，节省用户内存，以及达到更好的播放效果。

### 罗列一些使用场景

1. 网站有图片轮播效果，只有在用户观看轮播的时候，才会自动展示下一张幻灯片。
2. 显示信息仪表盘的应用程序不希望在页面不可见时轮询服务器进行更新。
3. 页面想要检测是否正在渲染，以便可以准确的计算网页浏览量（埋点使用场景）。
4. 当设备进入待机模式时，网站想要关闭设备声音（用户按下电源键关闭屏幕）。