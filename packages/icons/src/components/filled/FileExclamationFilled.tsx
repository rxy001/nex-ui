import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileExclamation from '../../svg/filled/file-exclamation.svg'
import type { IconProps } from '../../types'

export const FileExclamationFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FileExclamation, {
      className: 'file-exclamation-filled',
    })
    return <Icon {...props} ref={ref} />
  },
)
