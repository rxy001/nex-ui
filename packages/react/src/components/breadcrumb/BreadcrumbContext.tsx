import { createContext } from '@nex-ui/utils'
import type { BreadcrumbItemProps } from './types'

export interface BreadcrumbContextValue {
  disableAnimation: boolean
  isLast: (id: string) => boolean
  color: BreadcrumbItemProps['color']
  size: BreadcrumbItemProps['size']
}

export const [BreadcrumbProvider, useBreadcrumbContext] =
  createContext<BreadcrumbContextValue>({
    contextName: 'BreadcrumbContext',
    hookName: 'useBreadcrumbContext',
    providerName: 'BreadcrumbProvider',
    strict: true,
    defaultValue: null as unknown as BreadcrumbContextValue,
  })
