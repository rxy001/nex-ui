import type { ElementType, ReactNode } from 'react'
import type { Interpolation } from '@nex-ui/system'
import type {
  OverrideProps,
  SlotProps,
  ComponentSlotClasses,
} from '../../types/utils'
import type {
  BreadcrumbVariants,
  BreadcrumbItemVariants,
} from '../../theme/recipes'

export interface BreadcrumbPropsOverrides {}

interface BreadcrumbSlotProps {
  list?: SlotProps<'ol'>
  separator?: SlotProps<'li'>
  collapse?: SlotProps<'li'>
  expandButton?: SlotProps<'button'>
}

interface BreadcrumbOwnProps<RootComponent extends ElementType> {
  /**
   * The component or element to render as the root.
   *
   * @default 'nav'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * The content of the Breadcrumb. Usually BreadcrumbItem components.
   */
  children?: ReactNode

  /**
   * The props used for each slot.
   */
  slotProps?: BreadcrumbSlotProps

  /**
   * The className used for each slot.
   */
  classNames?: ComponentSlotClasses<keyof BreadcrumbSlotProps>

  /**
   * The custom separator between Breadcrumbs.
   *
   * @default '/'
   */
  separator?: ReactNode

  /**
   * The gap between the separator and the breadcrumb items.
   */
  separatorGap?: string | number

  /**
   * The size of the Breadcrumb.
   *
   * @default 'md'
   */
  size?: BreadcrumbVariants['size']

  /**
   * The color of the Breadcrumb.
   *
   * @default 'default'
   */
  color?: BreadcrumbVariants['color']

  /**
   * Specifies the maximum number of BreadcrumbItem to display.
   *
   * @default 8
   */
  maxItems?: number

  /**
   * If max items is exceeded, the number of items to show before the ellipsis.
   *
   * @default 1
   */
  itemsBeforeCollapse?: number

  /**
   * If max items is exceeded, the number of items to show after the ellipsis.
   *
   * @default 1
   */
  itemsAfterCollapse?: number

  /**
   * If true, disables the hover animation on all BreadcrumbItems.
   *
   * @default false
   */
  disableAnimation?: boolean
}

export type BreadcrumbProps<RootComponent extends ElementType = 'nav'> =
  OverrideProps<
    RootComponent,
    BreadcrumbOwnProps<RootComponent>,
    BreadcrumbPropsOverrides
  >

export interface BreadcrumbItemPropsOverrides {}

interface BreadcrumbItemSlotProps {
  root?: SlotProps<'li'>
}

interface BreadcrumbItemOwnProps<LinkComponent extends ElementType> {
  /**
   * The component or element to render as the link.
   *
   * @default 'a'
   */
  as?: LinkComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * The content of the BreadcrumbItem.
   */
  children?: ReactNode

  /**
   * The props used for each slot.
   */
  slotProps?: BreadcrumbItemSlotProps

  /**
   * The className used for each slot.
   */
  classNames?: ComponentSlotClasses<keyof BreadcrumbItemSlotProps>

  /**
   * The color of the BreadcrumbItem.
   *
   * @default 'default'
   */
  color?: BreadcrumbItemVariants['color']

  /**
   * The size of the BreadcrumbItem.
   *
   * @default 'md'
   */
  size?: BreadcrumbItemVariants['size']

  /**
   * If true, disables the hover animation on the BreadcrumbItem.
   *
   * @default false
   */
  disableAnimation?: boolean
}

export type BreadcrumbItemProps<LinkComponent extends ElementType = 'a'> =
  OverrideProps<
    LinkComponent,
    BreadcrumbItemOwnProps<LinkComponent>,
    BreadcrumbItemPropsOverrides
  >

export interface ItemData {
  id: string
}
