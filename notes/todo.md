
1. 目前 component theme 支持定义默认 props 和以函数方式返回样式，是否抽离 styles 通过 provider 传入以支持完全自定义主题 和 unstyled ？

2. [Tokens Format](https://tr.designtokens.org/format/)

3. createTokens 延迟生成含有 token 引用语法的 token，以规避 token 定义顺序的限制

4. 样式系统 system 遇到的问题
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

5. 当 recipe 没有 variants 时 runtimeFn 可传入任何值。

6. Checkbox 内 input element 无法添加 classname 和 sx.
    组件的 className 和 sx 都是用于 根元素。一般像控件组件内部的 input 都是隐藏的，所以感觉也不需要 classname 和 sx

7. 添加 css cascade layer

8. recipes 部分属性值改为 css 变量
