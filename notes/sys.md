token

- colors 支持 string | {50, 100, 200, 300, 400, 500, 600, 700, 800, 900, contrastText}
- 除了 FontFamilies 仅支持 string 其他 token 定义都支持 string | number

semanticTokens

- semanticTokens 支持的 token 类别与 tokens 一致, 且 semanticTokens 中 token 定义的类型除了支持 tokens 中 token 类型外还支持响应式设计。
- semanticTokens 可以嵌套创建 token, 将一些 token 组合在一起
- DEFAULT 定义嵌套 token 的默认值

```ts
semanticTokens = {
  colors: {
    primary: {
      DEFAULT: {
        _DEFAULT: '{blue.500}' // 默认颜色
        _dark: '{red.500}' // 深色模式下的颜色
        _light: '{yellow.500}' // 明亮模式下的颜色
      }
      hover: {
        _DEFAULT: '{blue.400}'
        _dark: '{red.400}'
        _light: '{yellow.400}'
      }
      active: {
        _DEFAULT: '{blue.600}'
        _dark: '{red.600}'
        _light: '{yellow.600}'
      }
    },
  },
}
```
