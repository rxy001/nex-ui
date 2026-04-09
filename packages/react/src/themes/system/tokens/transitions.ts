import { defineTokens } from '@nex-ui/system'

const DURATION = '0.2s'

export const transitions = defineTokens.transitions({
  all: `all ${DURATION}`,
  colors: `color ${DURATION}, background-color ${DURATION}, border-color ${DURATION}, text-decoration-color ${DURATION}, fill ${DURATION}, stroke ${DURATION}, opacity ${DURATION}`,
  opacity: `opacity ${DURATION}`,
  shadow: `box-shadow ${DURATION}`,
  transform: `transform ${DURATION}, opacity ${DURATION}`,
  margin: `margin ${DURATION}`,
  scale: `scale ${DURATION}, opacity ${DURATION}`,
})
