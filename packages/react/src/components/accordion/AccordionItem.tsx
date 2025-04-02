import { forwardRef, useDefaultProps } from '../utils'

export const AccordionItem = forwardRef((inProps, ref) => {
  const props = useDefaultProps({
    name: 'AccordionItem',
    props: inProps,
  })
})
