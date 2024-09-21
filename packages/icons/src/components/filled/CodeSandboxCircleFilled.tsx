import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CodeSandboxCircle from '../../svg/filled/code-sandbox-circle.svg'
import type { IconProps } from '../../types'

export const CodeSandboxCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CodeSandboxCircle)
    return <Icon {...props} ref={ref} />
  },
)
