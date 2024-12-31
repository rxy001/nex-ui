import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CodepenSquare from '../../svg/filled/codepen-square.svg'
import type { IconProps } from '../../types'

export const CodepenSquareFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(CodepenSquare, { className: 'codepen-square-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CodepenSquareFilled.displayName = 'CodepenSquareFilled'
