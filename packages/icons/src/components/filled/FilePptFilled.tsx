import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FilePpt from '../../svg/filled/file-ppt.svg'
import type { IconProps } from '../../types'

export const FilePptFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FilePpt, { className: 'file-ppt-filled' })
    return <Icon {...props} ref={ref} />
  },
)
