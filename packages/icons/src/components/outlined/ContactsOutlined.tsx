import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Contacts from '../../svg/outlined/contacts.svg'
import type { IconProps } from '../../types'

export const ContactsOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Contacts, { className: 'contacts-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ContactsOutlined.displayName = 'ContactsOutlined'
