import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Snippets from '../../svg/outlined/snippets.svg'
import type { IconProps } from '../../types'

export const SnippetsOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Snippets, { className: 'snippets-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

SnippetsOutlined.displayName = 'SnippetsOutlined'
