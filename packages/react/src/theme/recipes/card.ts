import { defineRecipe, defineSlotRecipe } from '@nex-ui/system'
import type { RecipeVariants } from '@nex-ui/system'

export const cardRecipe = defineRecipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    w: 'fit-content',
    bg: 'content',
    maxWidth: '345px',
    position: 'relative',
    overflow: 'hidden',
  },
  variants: {
    shadow: {
      xs: {
        boxShadow: 'xs',
      },
      sm: {
        boxShadow: 'sm',
      },
      md: {
        boxShadow: 'md',
      },
      lg: {
        boxShadow: 'lg',
      },
      xl: {
        boxShadow: 'xl',
      },
    },
    radius: {
      none: {
        borderRadius: 'none',
      },
      sm: {
        borderRadius: 'md',
      },
      md: {
        borderRadius: 'lg',
      },
      lg: {
        borderRadius: 'xl',
      },
    },
    blurred: {
      true: {
        backdropFilter: 'blur(12px) saturate(150%)',
      },
    },
    hoverable: {
      true: {
        transition: 'scale',
        _hover: {
          scale: '1.03',
        },
        _focusVisibleRing: {
          scale: '1.03',
        },
      },
    },
  },
})

export const cardHeaderRecipe = defineSlotRecipe({
  slots: {
    root: {
      p: '3',
      display: 'flex',
      alignItems: 'center',
      gap: '3',
    },
    content: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    title: {
      fs: 'md',
    },
    subtitle: {
      fs: 'md',
      color: 'gray.600',
    },
  },
})

export const cardBodyRecipe = defineRecipe({
  base: {
    p: '3',
    overflowWrap: 'break-word',
  },
})

export const cardFooterRecipe = defineRecipe({
  base: {
    p: '3',
  },
})

export const cardActionArea = defineRecipe({
  base: {
    textAlign: 'inherit',
    color: 'inherit',
    width: 'full',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 'inherit',
    '::after': {
      position: 'absolute',
      bg: {
        _DEFAULT: 'gray.200/25',
        _dark: 'gray.800/25',
      },
      inset: 0,
      transition: 'colors',
      content: "' '",
      display: 'block',
      pointerEvents: 'none',
      opacity: 0,
    },
    _hover: {
      '::after': {
        opacity: 1,
      },
    },
    _focusVisibleRing: {
      outline: 'focusVisibleOutline',
    },
  },
  variants: {
    disabled: {
      true: {
        cursor: 'default',
      },
    },
  },
})

export type CardRecipe = typeof cardRecipe
export type CardVariants = RecipeVariants<CardRecipe>

export type CardHeaderRecipe = typeof cardHeaderRecipe
export type CardBodyRecipe = typeof cardBodyRecipe
export type CardFooterRecipe = typeof cardFooterRecipe
export type CardActionAreaRecipe = typeof cardActionArea
