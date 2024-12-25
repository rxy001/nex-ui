import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Book from '../../svg/outlined/book.svg'
import type { IconProps } from '../../types'

export const BookOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Book, { className: 'book-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
