declare module '*.svg' {
  import type { FC, SVGProps } from 'react'

  const ReactComponent: FC<SVGProps<SVGElement>>

  export default ReactComponent
}
