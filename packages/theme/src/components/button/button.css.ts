import { globalTokens } from '../../globalTokens.css'
import { btnCls, btnTokens } from './tokens.css'
import { recipe } from '../../utils'
import type { RecipeVariants } from '../../utils'

export const button = recipe({
  base: [
    btnCls,
    {
      outline: 'none',
      userSelect: 'none',
      borderWidth: '1px',
      borderStyle: 'solid',
      cursor: 'pointer',
    },
  ],
  variants: {
    type: {
      default: {
        backgroundColor: '#fff',
        borderColor: 'black',
        color: 'black',
      },
      primary: {
        backgroundColor: globalTokens.colorPrimary,
        borderColor: 'transparent',
        color: '#fff',
      },
    },
    size: {
      small: {
        padding: `${btnTokens.paddingYSM} ${btnTokens.paddingXSM}`,
        borderRadius: globalTokens.borderRadiusSM,
        height: globalTokens.controlHeightSM,
        fontSize: btnTokens.fontSizeSM,
      },
      medium: {
        padding: `${btnTokens.paddingY} ${btnTokens.paddingX}`,
        borderRadius: globalTokens.borderRadius,
        height: globalTokens.controlHeight,
        fontSize: btnTokens.fontSize,
      },
      large: {
        padding: `${btnTokens.paddingYLG} ${btnTokens.paddingXLG}`,
        borderRadius: globalTokens.borderRadiusLG,
        height: globalTokens.controlHeightLG,
        fontSize: btnTokens.fontSizeLG,
      },
    },
  },
  defaultVariants: {
    type: 'default',
    size: 'medium',
  },
})

export type ButtonVariants = RecipeVariants<typeof button>
