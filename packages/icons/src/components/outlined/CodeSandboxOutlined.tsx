import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CodeSandbox from '../../svg/outlined/code-sandbox.svg'
import type { IconProps } from '../../types'

export const CodeSandboxOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CodeSandbox, { className: 'code-sandbox-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
