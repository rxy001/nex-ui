import { calc } from '@vanilla-extract/css-utils'
import { globalStyle } from '@vanilla-extract/css'
import { globalTokens } from '../../globalTokens.css'
import { btnClass, btnTokens } from './tokens.css'
import { recipe } from '../../utils'
import type { RecipeVariants } from '../../utils'

globalStyle(':where(.antui-btn)', {
  outline: 'none',
  userSelect: 'none',
  borderWidth: '1px',
  borderStyle: 'solid',
  border: '1px solid transparent',
  cursor: 'pointer',
  position: 'relative',
  transition: '.3s',
  textDecoration: 'none',
  display: 'inline-block',
  boxSizing: 'border-box',
  fontFamily: globalTokens.fontFamily,
  lineHeight: globalTokens.lineHeight,
  textAlign: 'center',
  backgroundColor: 'transparent',
})

function variantStyle(
  backgroundColor?: string,
  borderColor?: string,
  color?: string,
  hoverBgc?: string,
  hoverBorderColor?: string,
  hoverColor?: string | undefined,
  activeBgc?: string,
  activeBorderColor?: string,
  activeFontColor?: string,
) {
  return {
    backgroundColor,
    borderColor,
    color,
    selectors: {
      '&:not(:disabled):hover': {
        backgroundColor: hoverBgc,
        borderColor: hoverBorderColor,
        color: hoverColor,
      },
      '&:not(:disabled):active': {
        backgroundColor: activeBgc,
        borderColor: activeBorderColor,
        color: activeFontColor,
      },
    },
  }
}

function sizeStyle(
  padding?: string,
  borderRadius?: string,
  height?: string,
  fontSize?: string,
) {
  return { padding, borderRadius, height, fontSize }
}

function roundStyle(controlHeight: string) {
  return {
    borderRadius: controlHeight,
    paddingInlineStart: calc.divide(controlHeight, 2),
    paddingInlineEnd: calc.divide(controlHeight, 2),
  }
}

export const button = recipe({
  base: ['antui-btn', btnClass],
  variants: {
    variant: {
      outline: variantStyle(
        btnTokens.outlineBgc,
        btnTokens.outlineBorderColor,
        btnTokens.outlineFontColor,
        btnTokens.outlineHoverBgc,
        btnTokens.outlineHoverBorderColor,
        btnTokens.outlineHoverColor,
        btnTokens.outlineActiveBgc,
        btnTokens.outlineActiveBorderColor,
        btnTokens.outlineActiveFontColor,
      ),
      primary: variantStyle(
        globalTokens.colorPrimary,
        btnTokens.primaryBorderColor,
        btnTokens.primaryFontColor,
        globalTokens.colorPrimaryHover,
        undefined,
        globalTokens.lightFontColor,
        globalTokens.colorPrimaryActive,
        undefined,
        globalTokens.lightFontColor,
      ),
      text: variantStyle(
        undefined,
        undefined,
        globalTokens.textColor,
        btnTokens.textHoverBgc,
        undefined,
        undefined,
        btnTokens.textActiveBgc,
        undefined,
        undefined,
      ),
      link: variantStyle(
        undefined,
        undefined,
        globalTokens.colorPrimary,
        btnTokens.linkHoverBgc,
        undefined,
        globalTokens.colorPrimaryHover,
        btnTokens.linkActiveBgc,
        undefined,
        globalTokens.colorPrimaryActive,
      ),
    },
    size: {
      small: sizeStyle(
        `${btnTokens.paddingYSM} ${btnTokens.paddingXSM}`,
        globalTokens.borderRadiusSM,
        globalTokens.controlHeightSM,
        btnTokens.fontSizeSM,
      ),
      medium: sizeStyle(
        `${btnTokens.paddingY} ${btnTokens.paddingX}`,
        globalTokens.borderRadius,
        globalTokens.controlHeight,
        btnTokens.fontSize,
      ),
      large: sizeStyle(
        `${btnTokens.paddingYLG} ${btnTokens.paddingXLG}`,
        globalTokens.borderRadiusLG,
        globalTokens.controlHeightLG,
        btnTokens.fontSizeLG,
      ),
    },
    disabled: {
      true: {
        selectors: {
          '&:disabled': {
            cursor: 'not-allowed',
            color: btnTokens.fontColorDisabled,
          },
        },
      },
    },
    block: {
      true: {
        width: '100%',
      },
    },
    shape: {
      default: '',
      round: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
  compoundVariants: [
    {
      variant: ['outline', 'primary'],
      disabled: true,
      style: {
        selectors: {
          '&:disabled': {
            backgroundColor: btnTokens.backgroundColorDisabled,
            borderColor: btnTokens.borderColorDisabled,
          },
        },
      },
    },
    {
      size: 'large',
      shape: 'round',
      style: roundStyle(globalTokens.controlHeightLG),
    },
    {
      size: 'small',
      shape: 'round',
      style: roundStyle(globalTokens.controlHeightSM),
    },
    {
      size: 'medium',
      shape: 'round',
      style: roundStyle(globalTokens.controlHeight),
    },
  ],
})

export type ButtonVariants = RecipeVariants<typeof button>
