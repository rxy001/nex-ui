import { defineRecipe } from '@nex-ui/system'
import { useUnmount } from '@nex-ui/hooks'
import { useSlot } from '../utils'
import { usePopper } from './PopperContext'

const recipe = defineRecipe({
  base: {
    w: '2',
    h: '2',
    pos: 'absolute',
    zIndex: 1,
    borderTop: 'sm',
    borderLeft: 'sm',
    borderColor: 'gray.200',
    insetBlockStart: 'var(--popper-arrow-y)',
    insetInlineStart: 'var(--popper-arrow-x)',
    transform: 'translate(-50%, -50%) var(--popper-arrow-transform)',
    bg: 'content',
  },
})

const style = recipe()

export const PopperArrow = () => {
  const { hasArrowRef } = usePopper()

  hasArrowRef.current = true

  const [PopperArrowRoot, getPopperArrowRootProps] = useSlot({
    style,
    elementType: 'div',
  })

  useUnmount(() => (hasArrowRef.current = false))

  return <PopperArrowRoot {...getPopperArrowRootProps()} />
}

PopperArrow.displayName = 'PopperArrow'
