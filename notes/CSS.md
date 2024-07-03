# CSS 方案

1.  sass、less.

    - 优点

      1. 编译后的 css 文件，可直接由浏览器解析，主题之间无缝切换，无额外的性能消耗.
      2. css 文件浏览器缓存.

    - 缺点
      1. 灵活定制主题的能力不足。
         在多主题以及嵌套主题时，使用 css 变量有很多欠缺点. 例如在 Antd(5.x 开启 css 变量) 采用抽取出一套 tokens 和定制的 classname ，消费者只能使用这些 tokens 定制主题. 假设想要修改 primary = type、 small = size 的 Button 组件样式时，只能通过 classname, 而这种方式在嵌套主题下还需要使用额外的选择器.
      2. 无法使用 JS 常量。
         根据 props、state 使用不同的样式非常常见，css 只用人肉映射。
      3. css 与 js 分布与不同的位置，随着应用的发展，难以发现现有 css 文件中的 dead code。
      4. 无样式静态类型。

2.  css-in-js. 这也是 Antd、MUI 等组件库的实现方案。

    - 优点

      1. 无样式冲突, 无优先级烦恼, 也无需顾虑 css 插入顺序.
      2. 能够使用 js 变量. 利用 props、state 灵活应用不同的样式. 定制主题时动态生成 css.

    - 缺点

           1. CSS-in-JS增加了运行时开销。当你的组件渲染时，css-in-js 库必须将你的样式“序列化”为可以插入到文档中的普通CSS. (重要)
           2. CSS-in-JS会增加包的大小。这是显而易见的——每个访问你网站的用户现在都必须下载CSS-in-JS库的JavaScript代码. (无关紧要)
           3. CSS-in-JS搅乱了React开发者工具。对于每个使用了css prop的元素，Emotion将渲染 `<EmotionCssPropInternal>` 和 `<Insertion>`组件。如果你在许多元素上使用css prop, Emotion的内部组件会扰乱React开发者工具. (无关紧要)
           4. 频繁地插入CSS规则会迫使浏览器做很多额外的工作。Sebastian Markbåge是React核心团队的成员，也是React Hooks的最初设计者，他在React 18工作组中写了一篇内容丰富的讨论，讨论了CSS-in-JS库需要如何更改才能与React 18一起工作，以及一般的CSS-in-JS运行时的未来。他特别指出:
              在并发渲染中，React可以在渲染之间屈服于浏览器。如果你在组件中插入一个新规则，那么React会产生结果，然后浏览器必须查看这些规则是否适用于现有的树。所以它会重新计算样式规则。然后React渲染下一个组件，然后该组件发现一个新规则，然后它再次发生。
              这实际上导致React在渲染时，对每一帧的所有DOM节点重新计算所有CSS规则。这非常慢。 (重要)

           ```jsx
           function MyComponent() {
             return (
               <div
                 css={{
                   backgroundColor: 'blue',
                   width: 100,
                   height: 100,
                 }}
               />
             )
           }
           ```

           `MyComponent` 组件的重复渲染，都将重新序列化 style 并插入，造成巨大的性能开销。

           ```jsx
           const myCss = css({
             backgroundColor: 'blue',
             width: 100,
             height: 100,
           })

           function MyComponent() {
             return <div css={myCss} />
           }
           ```

           移动外组建外后，序列化只在组建加载时执行一次，而不是每次渲染时。 但失去了访问 props/state 的能力。

      https://juejin.cn/post/7165670146017591309

上述是运行时 css-in-js, 目前还有另外一种方案编译时 css-in-js，没有运行时的消耗，在编译时生成所需 css 文件，有点类似于 module css。

3. Atomic CSS
   - 当项目达到一定体量时，CSS 体积保持稳定，没有重复的 CSS 规则，大幅减少 CSS 体积
   - 提高可维护性，随意修改元素样式，无需担心会影响其他元素
   - 但会将所有 css 打包成一个 css 文件

放弃 vanilla-extract:

- 实现主题系统灵活不足.
  主题方案采用的是像 MUI、ChakraUI 具备定制组件在不同状态下的全部样式.
  编译型 css-in-js, 还是不如运行时灵活. 在定制主题时需预先定义 css，再传入类名. 此设计像scss、 plain css等方案无法动态跟随 prefixCls 同时修改. 且多次覆盖其样式还有选择器优先级的问题.如果使用 style 又不具备修改伪类、伪元素等能力.
- 无法设置通过子选择器设置样式, (& > a) 无效.

主题系统实现
使用 css 变量替换 utilities 中的值

- 避免 emotion 序列化;
- 减少主题上下文中token值的运行时计算;
