<!-- 1. 使用 customConditions 替换掉 clean-package -->
<!-- 2. stylesFn 支持 aliases -->
<!-- 3. system 支持 深色模式 响应式 -->
<!-- 4. .test.ts 需使用 `"types": ["@testing-library/jest-dom/jest-globals", "node", "react"],` -->

4. 提供 webpack 、vite 插件动态生成 sys-ts

<!-- 5. components 添加 sx api -->

6. 目前 component theme 支持定义默认 props 和以函数方式返回样式，是否抽离 styles 通过 provider 传入以支持完全自定义主题 和 unstyled ？

<!-- 7. tsx 运行报错 -->
<!-- 查看编译过程信息时，发现 packages/react 由于 customConditions: source, tsc 会通过源码引入 icons 中的 svg 文件，但又没有 svg 的声明，导致报错. 通过 exclude 也没能过滤掉 svg ？ -->

8. 写一个脚本，为 html 添加相应的 colorSchemeSelector ，在 ssr 入口引入解决闪烁

<!-- 9. build 输出 ts 保持目录结构 -->

<!-- 10. 单测时， const button = getByTestId('xxx'), 在触发 button 的事件后，无法正确获取 classes，参考 button.test.tsx - should support to change loading。猜测是因为 styled.button() 每次返回的是一个新的组件，在 react reconcile 阶段，由于 fiber.type 不同，之前的 styled.button() 卸载了，而 button 的引用是已卸载组件的 DOM. 因此获取不到 loading class.

重构 styled -->

<!-- 11. sx 的属性值映射到 token , 改为只支持 string 的属性值 -->

12. colorSchemeSelector = media ，手动设置 mode 为 dark 或 light 时并不会生效. 目前 getColorSchemeSelector 会生成一个媒体查询，而 js 又无法手动设置 prefers-color-scheme，因此只能跟随系统设置进行切换。无论是 CSS 变量还是 \_dark 都会出现 bug. 先禁用 media.
