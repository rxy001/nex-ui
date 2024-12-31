import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CodeSandbox from '../../svg/outlined/code-sandbox.svg'
import type { IconProps } from '../../types'

export const CodeSandboxOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(CodeSandbox, { className: 'code-sandbox-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CodeSandboxOutlined.displayName = 'CodeSandboxOutlined'
