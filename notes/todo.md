<!-- 1. 使用 customConditions 替换掉 clean-package -->
<!-- 2. stylesFn 支持 aliases -->
<!-- 3. system 支持 深色模式 响应式 -->
<!-- 4. .test.ts 需使用 `"types": ["@testing-library/jest-dom/jest-globals", "node", "react"],` -->

<!-- 4. 提供 webpack 、vite 插件动态生成 sys-ts -->

<!-- 5. components 添加 sx api -->

6. 目前 component theme 支持定义默认 props 和以函数方式返回样式，是否抽离 styles 通过 provider 传入以支持完全自定义主题 和 unstyled ？

<!-- 7. tsx 运行报错 -->
<!-- 查看编译过程信息时，发现 packages/react 由于 customConditions: source, tsc 会通过源码引入 icons 中的 svg 文件，但又没有 svg 的声明，导致报错. 通过 exclude 也没能过滤掉 svg ？ -->

<!-- 8. 写一个脚本，为 html 添加相应的 colorSchemeSelector ，在 ssr 入口引入解决闪烁 -->

<!-- 9. build 输出 ts 保持目录结构 -->

<!-- 10. 单测时， const button = getByTestId('xxx'), 在触发 button 的事件后，无法正确获取 classes，参考 button.test.tsx - should support to change loading。猜测是因为 styled.button() 每次返回的是一个新的组件，在 react reconcile 阶段，由于 fiber.type 不同，之前的 styled.button() 卸载了，而 button 的引用是已卸载组件的 DOM. 因此获取不到 loading class.

重构 styled -->

<!-- 11. sx 的属性值映射到 token , 改为只支持 string 的属性值 -->

12. colorSchemeSelector = media ，手动设置 mode 为 dark 或 light 时并不会生效. 目前 getColorSchemeSelector 会生成一个媒体查询，而 js 又无法手动设置 prefers-color-scheme，因此只能跟随系统设置进行切换。无论是 CSS 变量还是 \_dark 都会出现 bug. 先禁用 media.

<!-- 13. 删除组件 red color -->

<!-- 14. 为组件添加 slotProps ?
    在开发过程中，发现一个 props 优先级问题，例如 Input Props 的 onChange 和 slotProps.input.onChange，当两个 props 同时传入时该如何处理 ？
    目前的方案是只执行 props.onChange，忽略 slotProps.input.onChange -->

<!-- 15. 修改 useStyles 和 useUtilityClasses 以适配 slotProps -->

<!-- 16. docs 使用 alias eslint 报错 -->

<!-- 17. docs 会报错水合失败

使用 webpack 代替 turbopack 就没有在出错了， why? -->

<!-- 18. icons 无法在服务器组件使用 -->

<!--
19. defineTheme 打包后类型不对
    defineTheme 运行时的类型和编译后的类型不同，有些疑惑。 -->

20. [Tokens Format](https://tr.designtokens.org/format/)

<!-- 21. CSSObject 每个属性应该支持 {[selector in keyof selectors]: string} -->

<!-- 22. 重命名语义化颜色 -->

23. 修改 NexUIProvider api

<!-- 24. 调整 react pkg 的 ts 模块声明 -->

25. createTokens 延迟生成含有 token 引用语法的 token，以规避 token 定义顺序的限制

26. color token 支持 opacity 修饰符

27. 优化 useSlotProps 属性优先级，例如 accordionItems.trigger 的 tabIndex

28. 将 storybook 改为 sb，是因为 storybook cli 会将其识别为 storybook 包，导致服务启动失败。

29. 修改 recipes 中标签选择器

30. 样式系统 system 遇到的问题
    1. 条件式的样式与常规样式的合并。 例如在不同 variant 分别存在 color: red 和 color:{_dark: white}, 当这
    两个 variant 同时生效时，只会生成其中一种样式，这是因为样式合并过程仅为对象的合并。

    2. 复杂选择器的样式优先级。如下，这将导致元素在 focus 时，被 hover 的样式覆盖。colorPalette.primary 在 token 定义时也是使用条件式样式 {_DEFAULT: '{colors.blue.500}',_dark: '{colors.blue.600}'}，直观来看预期效果应该为深色模式下 borderColor 在 focus 时为 colorPalette.primary. 差异源自于定义 token 和样式中的 _dark 采用了两种不同的方式
    导致。
    ```
        ':hover': {
            borderColor: {
             // 权重为 3
              _dark: 'gray.400',
            },
        },
        _focusWithin: {
          // 权重为 2
          borderColor: 'colorPalette.primary',
        },
    ```
    
