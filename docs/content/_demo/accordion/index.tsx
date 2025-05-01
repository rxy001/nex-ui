import accordionCode from './Usage.demo?raw'
import AccordionDemo from './Usage.demo'
import expandMultipleCode from './ExpandMultiple.demo?raw'
import ExpandMultipleDemo from './ExpandMultiple.demo'
import defaultExpandedKeysCode from './DefaultExpandedKeys.demo?raw'
import DefaultExpandedKeysDemo from './DefaultExpandedKeys.demo'
import outlinedVariantCode from './OutlinedVariant.demo?raw'
import OutlinedVariantDemo from './OutlinedVariant.demo'
import underlinedVariantCode from './UnderlinedVariant.demo?raw'
import UnderlinedVariantDemo from './UnderlinedVariant.demo'
import disabledKeysCode from './DisabledKeys.demo?raw'
import DisabledKeysDemo from './DisabledKeys.demo'
import indicatorCode from './Indicator.demo?raw'
import IndicatorDemo from './Indicator.demo'
import disabledCode from './Disabled.demo?raw'
import DisabledDemo from './Disabled.demo'
import controlledCode from './Controlled.demo?raw'
import ControlledDemo from './Controlled.demo'

export const accordion = {
  usage: {
    code: accordionCode,
    demo: <AccordionDemo />,
  },
  disabled: {
    code: disabledCode,
    demo: <DisabledDemo />,
  },
  expandMultiple: {
    code: expandMultipleCode,
    demo: <ExpandMultipleDemo />,
  },
  defaultExpandedKeys: {
    code: defaultExpandedKeysCode,
    demo: <DefaultExpandedKeysDemo />,
  },
  outlinedVariant: {
    code: outlinedVariantCode,
    demo: <OutlinedVariantDemo />,
  },
  underlinedVariant: {
    code: underlinedVariantCode,
    demo: <UnderlinedVariantDemo />,
  },
  disabledKeys: {
    code: disabledKeysCode,
    demo: <DisabledKeysDemo />,
  },
  indicator: {
    code: indicatorCode,
    demo: <IndicatorDemo />,
  },
  controlled: {
    code: controlledCode,
    demo: <ControlledDemo />,
  },
}
