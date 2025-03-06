declare module '*.svg' {
  const content: React.ForwardRefExoticComponent<
    React.ComponentPropsWithRef<'svg'>
  >
  export default content
}
