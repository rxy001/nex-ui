import usageCode from './Usage.demo?raw'
import UsageDemo from './Usage.demo'
import colorsCode from './Colors.demo?raw'
import ColorsDemo from './Colors.demo'
import placementCode from './Placements.demo?raw'
import PlacementsDemo from './Placements.demo'
import offsetCode from './Offset.demo?raw'
import OffsetDemo from './Offset.demo'
import flipCode from './Flip.demo?raw'
import FlipDemo from './Flip.demo'
import shiftCode from './Shift.demo?raw'
import ShiftDemo from './Shift.demo'
import controlledCode from './Controlled.demo?raw'
import ControlledDemo from './Controlled.demo'
import customMotionCode from './CustomMotion.demo?raw'
import CustomMotionDemo from './CustomMotion.demo'
import withFormCode from './WithForm.demo?raw'
import WithFormDemo from './WithForm.demo'

export const popover = {
  usage: {
    code: usageCode,
    demo: <UsageDemo />,
  },
  colors: {
    code: colorsCode,
    demo: <ColorsDemo />,
  },
  placements: {
    code: placementCode,
    demo: <PlacementsDemo />,
  },
  offset: {
    code: offsetCode,
    demo: <OffsetDemo />,
  },
  flip: {
    code: flipCode,
    demo: <FlipDemo />,
  },
  shift: {
    code: shiftCode,
    demo: <ShiftDemo />,
  },
  controlled: {
    code: controlledCode,
    demo: <ControlledDemo />,
  },
  customMotion: {
    code: customMotionCode,
    demo: <CustomMotionDemo />,
  },
  withForm: {
    code: withFormCode,
    demo: <WithFormDemo />,
  },
}
