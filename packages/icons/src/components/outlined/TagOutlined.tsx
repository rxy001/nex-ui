import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Tag from '../../svg/outlined/tag.svg'
import type { IconProps } from '../../types'

export const TagOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Tag, { className: 'tag-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

TagOutlined.displayName = 'TagOutlined'
