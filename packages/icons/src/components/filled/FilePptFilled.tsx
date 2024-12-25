import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FilePpt from '../../svg/filled/file-ppt.svg'
import type { IconProps } from '../../types'

export const FilePptFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FilePpt, { className: 'file-ppt-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
