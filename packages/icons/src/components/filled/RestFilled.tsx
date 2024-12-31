import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Rest from '../../svg/filled/rest.svg'
import type { IconProps } from '../../types'

export const RestFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Rest, { className: 'rest-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})

RestFilled.displayName = 'RestFilled'
