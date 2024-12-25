declare module '*.svg' {
  const content: React.ForwardRefExoticComponent<
    React.SVGAttributes<SVGElement>
  >
  export default content
}
