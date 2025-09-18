import { defineRecipe } from '@nex-ui/system'
import { useSlot } from '../utils'

const recipe = defineRecipe({
  base: {
    m: '1',
  },
})

const style = recipe()

export const PopupContent = ({ children }) => {
  const [PopupContentRoot, getPopupContentRootProps] = useSlot({
    style,
    elementType: 'div',
    additionalProps: {},
  })

  return (
    <PopupContentRoot {...getPopupContentRootProps()}>
      {children}
    </PopupContentRoot>
  )
}

PopupContent.displayName = 'PopupContent'
