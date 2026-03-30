import { upperFirst } from '@nex-ui/utils'
import { toReadableSize } from '~/sb/utils'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  DrawerClose,
} from '../index'
import { Button } from '../../button'
import { Flex } from '../../flex'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import type { DrawerContentProps, DrawerProps } from '../types'

type DrawerTemplateProps = DrawerProps &
  DrawerContentProps & {
    triggerText?: ReactNode
  }

function DrawerTemplate(props: DrawerTemplateProps) {
  const { onClose, onOpenChange, open, defaultOpen, triggerText, ...other } =
    props
  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
      onClose={onClose}
    >
      <DrawerTrigger>
        <Button>{triggerText ?? 'Open Drawer'}</Button>
      </DrawerTrigger>
      <DrawerContent {...other}>
        <DrawerHeader>Drawer Header</DrawerHeader>
        <DrawerBody>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
            hendrerit risus, sed porttitor quam.
          </p>
          <p>
            Magna exercitation reprehenderit magna aute tempor cupidatat
            consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
            incididunt cillum quis. Velit duis sit officia eiusmod Lorem aliqua
            enim laboris do dolor eiusmod. Et mollit incididunt nisi consectetur
            esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
            deserunt nostrud ad veniam.
          </p>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose>
            <Button color='red' variant='ghost'>
              Cancel
            </Button>
          </DrawerClose>
          <DrawerClose>
            <Button>Action</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

const PLACEMENTS = ['left', 'right', 'top', 'bottom'] as const
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const

const meta = {
  title: 'Components/Drawer',
  component: DrawerTemplate,
  argTypes: {
    keepMounted: {
      control: 'boolean',
    },
    closeOnInteractOutside: {
      control: 'boolean',
    },
    hideBackdrop: {
      control: 'boolean',
    },
    preventScroll: {
      control: 'boolean',
    },
    closeOnEscape: {
      control: 'boolean',
    },
    restoreFocus: {
      control: 'boolean',
    },
    disableAnimation: {
      control: 'boolean',
    },
    placement: {
      control: 'select',
      options: PLACEMENTS,
    },
    size: {
      control: 'select',
      options: SIZES,
    },
    hideCloseButton: {
      control: 'boolean',
    },
    defaultOpen: {
      control: 'boolean',
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
} satisfies Meta<DrawerTemplateProps>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
  },
}

export const keepMounted: Story = {
  args: {
    keepMounted: true,
  },
}

export const WithoutBackdrop: Story = {
  args: {
    hideBackdrop: true,
  },
}

export function Placements(props: DrawerTemplateProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {PLACEMENTS.map((placement) => (
        <DrawerTemplate
          {...props}
          key={placement}
          placement={placement}
          triggerText={`${upperFirst(placement)} Placement`}
        />
      ))}
    </Flex>
  )
}

export function Sizes(props: DrawerTemplateProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {SIZES.map((size) => (
        <DrawerTemplate
          {...props}
          key={size}
          size={size}
          triggerText={`${toReadableSize(size)} Size`}
        />
      ))}
    </Flex>
  )
}

export const DisableAnimation: Story = {
  args: {
    disableAnimation: true,
  },
}
