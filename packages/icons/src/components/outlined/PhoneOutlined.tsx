import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Phone from '../../svg/outlined/phone.svg'
import type { IconProps } from '../../types'

export const PhoneOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Phone, { className: 'phone-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PhoneOutlined.displayName = 'PhoneOutlined'
