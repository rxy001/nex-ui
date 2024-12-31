import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Eye from '../../svg/filled/eye.svg'
import type { IconProps } from '../../types'

export const EyeFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Eye, { className: 'eye-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})

EyeFilled.displayName = 'EyeFilled'
