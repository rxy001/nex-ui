import { defineRecipe } from '@nex-ui/system'
import { useSlot } from '../utils'

const recipe = defineRecipe({
  base: {
    bg: 'content',
    d: 'flex',
    flexDirection: 'column',
    borderRadius: 'md',
    boxShadow: 'md',
    border: '1px solid {colors.gray.200}',
    outline: 'none',
    pos: 'relative',
  },
})

const style = recipe()

export const PopperContent = ({ children }) => {
  const [PopperContentRoot, getPopperContentRootProps] = useSlot({
    style,
    elementType: 'div',
    additionalProps: {},
  })

  return (
    <PopperContentRoot {...getPopperContentRootProps()}>
      {children}
    </PopperContentRoot>
  )
}

PopperContent.displayName = 'PopperContent'
