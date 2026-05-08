/**
 * https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
 */
import { DisclosureRoot, useDisclosureRoot } from './DisclosureRoot'
import { DisclosureTrigger, useDisclosureTrigger } from './DisclosureTrigger'
import { DisclosurePanel, useDisclosurePanel } from './DisclosurePanel'

export {
  DisclosureRootProvider,
  useDisclosureRootContext,
} from './DisclosureContext'

const Disclosure = {
  Root: DisclosureRoot,
  Trigger: DisclosureTrigger,
  Panel: DisclosurePanel,
}

export {
  Disclosure,
  useDisclosureRoot,
  useDisclosureTrigger,
  useDisclosurePanel,
}

export type {
  DisclosureRootProps,
  DisclosureRootState,
  UseDisclosureRootProps,
} from './DisclosureRoot'
export type {
  DisclosureTriggerProps,
  DisclosureTriggerState,
  UseDisclosureTriggerProps,
} from './DisclosureTrigger'
export type {
  DisclosurePanelProps,
  DisclosurePanelState,
  UseDisclosurePanelProps,
} from './DisclosurePanel'
export type { DisclosureRootContextValue } from './DisclosureContext'
