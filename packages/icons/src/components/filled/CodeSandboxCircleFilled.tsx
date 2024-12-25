import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CodeSandboxCircle from '../../svg/filled/code-sandbox-circle.svg'
import type { IconProps } from '../../types'

export const CodeSandboxCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(CodeSandboxCircle, {
          className: 'code-sandbox-circle-filled',
        }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
