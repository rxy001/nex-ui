export type HTMLElements = keyof React.JSX.IntrinsicElements

export type Overwrite<T, U> = Omit<T, keyof U> & U

export type HTMLProps<Element extends HTMLElements> =
  React.ComponentPropsWithRef<Element> & {
    [index: `data-${string}`]: unknown
  }

export type RenderProp<
  State,
  Props = React.HTMLAttributes<any> & {
    ref?: React.Ref<any>
  },
> = ((props: Props, state: State) => React.ReactNode) | React.JSX.Element

export type HookProps<
  Element extends HTMLElements,
  OwnProps extends Record<string, any>,
> = Overwrite<HTMLProps<Element>, OwnProps>

export type Directory<T = any> = Record<string, T>
