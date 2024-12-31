import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Contacts from '../../svg/filled/contacts.svg'
import type { IconProps } from '../../types'

export const ContactsFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Contacts, { className: 'contacts-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ContactsFilled.displayName = 'ContactsFilled'
