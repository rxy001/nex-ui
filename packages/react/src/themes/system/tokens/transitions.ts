import { defineTokens } from '@nex-ui/system'

export const transitions = defineTokens.transitions({
  all: 'all 0.2s',
  colors:
    'color 0.2s, background-color 0.2s, border-color 0.2s, text-decoration-color 0.2s, fill 0.2s, stroke 0.2s, opacity 0.2s',
  opacity: 'opacity 0.2s',
  shadow: 'box-shadow 0.2s',
  transform: 'transform 0.2s, opacity 0.2s',
  margin: 'margin 0.2s',
  scale: 'scale 0.2s, opacity 0.2s',
})
