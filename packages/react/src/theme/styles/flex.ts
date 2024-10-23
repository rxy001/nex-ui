import { defineBaseStyles } from '@nex-ui/system'

export const flexStyles = defineBaseStyles({
  base: {
    display: 'flex',
  },
  variants: {
    inline: {
      true: {
        display: 'inline-flex',
      },
    },
  },
})
