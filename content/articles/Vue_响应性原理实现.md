---
title: Vue 响应性原理实现
description: 百变星君——this
img: https://images.unsplash.com/photo-1579820010410-c10411aaaa88?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmVhY3R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80
alt: this 对象
tags:
  - javascript
  - vue
---
响应性是 Vue的一个核心特性，用于监听视图中绑定的数据，当数据发生改变时视图自动更新。人们往往对响应性这个术语有一些误解或困惑，会认为响应性就是类似RX之类的响应性编程。但是在这里只要状态发生改变，系统依赖部分发生自动更新就可以称为响应性。在 web应用中，数据的变化如何响应到DOM中，就是Vue解决的问题。

## 响应性问题

假设我们有个需求，b 永远等于 a 的十倍，如果使用命令式标称，可以很简单实现，可以像下面这样实现，但是当我们把 a 设置成 4 时，b 还是等于 30

```js
let a = 3
let b = a * 10
console.log(b) // 30
a = 4
console.log(b) // 30
```

为了让 b 等于 a 的十倍，那我们需要重新设置 b 的值，像下面代码

```js
let a = 3
let b = a * 10
console.log(b) // 30
a = 4
b = a * 10
console.log(b) // 40
```

假设我们有一个神奇函数叫 `onAchange`，它接收一个函数并且当 a 改变时自动被执行，这时候可以对 b 重新赋值，那上面的问题就解决了，那这个函数如何实现是问题的关键。

```js
onAchange(() => {
  b = a * 10
})
```

再举个更贴合 web 开发的例子，下面代码同样有个一个神奇函数 `onStateChange`，它会在 `state` 改变的时候自动运行，那我们只要在函数中编写 dom 操作的代码，就可以实现 dom 的自动更新了

```js
// DOM 元素
<span class="cell b1"></span>

// 神奇函数，当 state 值改变会自动重新运行
onStateChange(() => {
    document.querySelector('.cell.b1').textContent = state.a * 10
})
```

我们再进一步抽象，把 dom 的操作使用渲染引擎替换，但是我们不去研究渲染引擎的实现，只是简单的认为它会自动解析模板代码与数据关联即可，那代码就会变成下面这样。

```js
// DOM 元素
<span class="cell b1">
    {{ state.a * 10}}
</span>

// 神奇函数，当 state 值改变会自动重新运行
onStateChange(() => {
    view = render(state)
})
```

现在解决问题的核心就是如何实现 onStateChange 这个方法了，看到下面代码就是它具体的实现，首先定义一个外部 `update` 变量用于记录调用 `onStateChanged` 时传入的函数，如果需要改变 state 就必须调用 `setState` 方法，我们只需要在 `setState` 方法内部重新调用之前保存的 `update` 方法，即可达成自动更新。

```js
let update;
const onStateChange = _update => {
    // 把传入的 _update 函数保存给外部变量
    update = _update
}

// 用户更新数据必须调用 setState 函数，函数内把新的 state 更新并调用 update 方法
const setState = newState => {
    state = newState
    update()
}
```

调用例子，如果你有 react 开发经验，会发现这和 react 修改数据调用方法是一样的

```js
onStateChanged(() => {
    view = render(state) // 这里抽象的视图渲染伪代码，可以简单的理解为在更新视图
})

setState({ a: 5 })
```

其实在 angular 中，我们是不需要调用 setState 方法来更新数据，可以直接 `state.a = 5` 对变量赋值，即可触发视图更新。angular 使用脏值检测的方法，拦截你的事件然后判断是否改变。

```js
onStateChanged(() => {
    view = render(state) // 这里抽象的视图渲染伪代码，可以简单的理解为在更新视图
})

state.a = 5 // 在 angular 中，直接赋值即可触发视图更新
```

但是在 Vue 中实现方法不太一样，通过 `Object.definProperty` 修改对象属性的 `getter` 和 `setter` 让对象具有响应性，这种基于依赖跟踪的方式其实就是 vue.js、konckout.js 等框架实现的原理。

### getter 和 setter

ES5 的 `Object.definProperty` 提供监听属性变更的功能，下面将演示如何通过 `convert` 函数修改传入对象的 `getter` 和 `setter` 实现修改对象属性时打印日志的功能。

```js
const obj = { foo: 123 }
convert(obj)
obj.foo // 需要打印：'getting key "foo": 123'
obj.foo = 234 // 需要打印：'setting key "foo" to: 234'
obj.foo // 需要打印：'getting key "foo": 234'
```

convert 函数实现如下：

```js
function convert(obj) {
  // Object.keys获取对象的所有key值，通过forEach对每个属性进行修改
  Object.keys(obj).forEach(key => {
    // 保存属性初始值
    let internalValue = obj[key]
    Object.defineProperty(obj, key, {
      get () {
        console.log(`getting key "${key}": ${internalValue}`)
        return internalValue
      },
      set (newValue) {
        console.log(`setting key "${key}" to: ${newValue}`)
        internalValue = newValue
      }
    })
  })
}
```

### 依赖跟踪(发布订阅模式)

需要实现一个依赖跟踪类 `Dep`，类里有一个叫 `depend` 方法，该方法用于收集依赖项；另外还有一个 `notify` 方法，该方法用于触发依赖项的执行，也就是说只要在之前使用 `depend` 方法手机的依赖项，当调用 `notify` 方法时会被触发执行。

下面是 `Dep` 类期望达到的效果，调用 `dep.depend` 方法收集依赖，当调用 `dep.notify` 方法，控制台会再次输出 `update` 语句。

```js
const dep = new Dep()

autorun(() => {
  dep.depend()
  console.log('updated')
})
// 打印："updated"

dep.notify()
// 打印："updated"
```

`autorun` 函数接收一个函数，这个函数帮助我们创建一个相应区，当代码放在这个相应区内，就可以通过 `dep.depend` 方法注册依赖项

最终实现的 `Dep` 类代码如下：

```js
window.Dep = class Dep {
  constructor() {
    // 订阅任务队列，方式有相同的任务，用 Set 数据结构简单处理
    this.subscribers = new Set()
  }

  depend() {
    if (activeUpdate) {
      this.subscribers.add(activeUpdate)
    }
  }

  // 用于发布消息，触发依赖项重新执行
  notify() {
    this.subscribers.forEach(sub => sub())
  }
}

let activeUpdate = null

function autorun(update) {
  const wrappedUpdate = () => {
    activeUpdate = wrappedUpdate
    update()
    activeUpdate = null
  }
  wrappedUpdate()
}
```

### 实现迷你观察者

我们将前面的代码整合到一起，实现一个小型的观察者，通过在 getter 和 setter 中调用 `depend` 方法和 `notify` 方法，就可以实现自动更新数据的目的了，这也是 Vue 实现自动更新的核心原理。

期望实现的调用效果：

```js
const state = {
  count: 0
}

observe(state)

autorun(() => {
  console.log(`count is: ${state.count}`)
})
// 打印 "count is: 0"

state.count++
// 打印 "count is: 1"
```

最终整合代码如下：

```js
class Dep {
  constructor() {
    this.subscribers = new Set()
  }

  depend() {
    if (activeUpdate) {
      this.subscribers.add(activeUpdate)
    }
  }

  notify() {
    this.subscribers.forEach(sub => sub())
  }
}

function observe(obj) {
  Object.keys(obj).forEach(key => {
    let internalValue = obj[key]

    const dep = new Dep()
    Object.defineProperty(obj, key, {
      // 在 getter 收集依赖项，当触发 notify 时重新运行
      get() {
        dep.depend()
        return internalValue
      },

      // setter 用于调用 notify
      set(newVal) {
        const changed = internalValue !== newVal
        internalValue = newVal
        if (changed) {
          dep.notify()
        }
      }
    })
  })
  return obj
}

let activeUpdate = null

function autorun(update) {
  const wrappedUpdate = () => {
    activeUpdate = wrappedUpdate
    update()
    activeUpdate = null
  }
  wrappedUpdate()
}
```