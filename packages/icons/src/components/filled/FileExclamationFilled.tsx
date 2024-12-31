import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileExclamation from '../../svg/filled/file-exclamation.svg'
import type { IconProps } from '../../types'

export const FileExclamationFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(FileExclamation, { className: 'file-exclamation-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FileExclamationFilled.displayName = 'FileExclamationFilled'
