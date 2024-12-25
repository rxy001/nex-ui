import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Book from '../../svg/filled/book.svg'
import type { IconProps } from '../../types'

export const BookFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Book, { className: 'book-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})
