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
  Pick<DrawerContentProps, 'hideCloseButton' | 'size' | 'placement'> & {
    triggerText?: ReactNode
  }

function DrawerTemplate(props: DrawerTemplateProps) {
  const { hideCloseButton, size, placement, triggerText, ...other } = props
  return (
    <Drawer {...other}>
      <DrawerTrigger>
        <Button>{triggerText ?? 'Open Drawer'}</Button>
      </DrawerTrigger>
      <DrawerContent
        hideCloseButton={hideCloseButton}
        size={size}
        placement={placement}
      >
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

const meta = {
  title: 'Components/Drawer',
  component: DrawerTemplate,
  argTypes: {
    keepMounted: {
      control: 'boolean',
    },
    closeOnInteractBackdrop: {
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
      options: ['left', 'right', 'top', 'bottom'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    hideCloseButton: {
      control: 'boolean',
    },
    defaultOpen: {
      control: 'boolean',
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
    defaultOpen: true,
  },
}

export const Placements: Story = {
  render: (props) => {
    return (
      <Flex gap='4' wrap='wrap'>
        <DrawerTemplate
          {...props}
          placement='left'
          triggerText='Left Placement'
        />
        <DrawerTemplate
          {...props}
          placement='right'
          triggerText='Right Placement'
        />
        <DrawerTemplate
          {...props}
          placement='top'
          triggerText='Top Placement'
        />
        <DrawerTemplate
          {...props}
          placement='bottom'
          triggerText='Bottom Placement'
        />
      </Flex>
    )
  },
}

export const Sizes: Story = {
  render: (props) => {
    return (
      <Flex gap='4' wrap='wrap'>
        <DrawerTemplate {...props} size='xs' triggerText='XS Size' />
        <DrawerTemplate {...props} size='sm' triggerText='SM Size' />
        <DrawerTemplate {...props} size='md' triggerText='MD Size' />
        <DrawerTemplate {...props} size='lg' triggerText='LG Size' />
        <DrawerTemplate {...props} size='xl' triggerText='XL Size' />
        <DrawerTemplate {...props} size='full' triggerText='Full Size' />
      </Flex>
    )
  },
}

export const DisableAnimation: Story = {
  args: {
    disableAnimation: true,
  },
}
