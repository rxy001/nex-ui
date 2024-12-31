import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileUnknown from '../../svg/filled/file-unknown.svg'
import type { IconProps } from '../../types'

export const FileUnknownFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FileUnknown, { className: 'file-unknown-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FileUnknownFilled.displayName = 'FileUnknownFilled'
