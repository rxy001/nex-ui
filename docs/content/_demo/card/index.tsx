import usageCode from './Usage.demo?raw'
import UsageDemo from './Usage.demo'
import withImageCode from './WithImage.demo?raw'
import WithImageDemo from './WithImage.demo'
import blurredCode from './BlurredCard.demo?raw'
import BlurredDemo from './BlurredCard.demo'
import primaryActionCode from './PrimaryAction.demo?raw'
import PrimaryActionDemo from './PrimaryAction.demo'
import HoverEffectDemo from './HoverEffect.demo'
import hoverEffectCode from './HoverEffect.demo?raw'
import compositionCode from './Composition.demo?raw'
import CompositionDemo from './Composition.demo'

export const card = {
  usage: {
    code: usageCode,
    demo: <UsageDemo />,
  },
  withImage: {
    code: withImageCode,
    demo: <WithImageDemo />,
  },
  blurredCard: {
    code: blurredCode,
    demo: <BlurredDemo />,
  },
  primaryAction: {
    code: primaryActionCode,
    demo: <PrimaryActionDemo />,
  },
  hoverEffect: {
    code: hoverEffectCode,
    demo: <HoverEffectDemo />,
  },
  composition: {
    code: compositionCode,
    demo: <CompositionDemo />,
  },
}
