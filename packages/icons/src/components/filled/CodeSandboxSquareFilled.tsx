import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CodeSandboxSquare from '../../svg/filled/code-sandbox-square.svg'
import type { IconProps } from '../../types'

export const CodeSandboxSquareFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CodeSandboxSquare)
    return <Icon {...props} ref={ref} />
  },
)
