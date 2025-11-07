import { Drawer } from '../Drawer'
import { DrawerTrigger } from '../DrawerTrigger'
import { DrawerContent } from '../DrawerContent'
import { DrawerHeader } from '../DrawerHeader'
import { DrawerBody } from '../DrawerBody'
import { Button } from '../../button'
import { DrawerFooter } from '../DrawerFooter'
import { DrawerClose } from '../DrawerClose'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { DOMMotionComponents } from 'motion/react'

const meta = {
  title: 'Components/Drawer',
  component: Drawer<DOMMotionComponents['div']>,
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
  },
  render: (props) => {
    return (
      <Drawer {...props}>
        <DrawerTrigger>
          <Button>Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>Drawer Header</DrawerHeader>
          <DrawerBody>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              pulvinar risus non risus hendrerit venenatis. Pellentesque sit
              amet hendrerit risus, sed porttitor quam.
            </p>
            <p>
              Magna exercitation reprehenderit magna aute tempor cupidatat
              consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
              incididunt cillum quis. Velit duis sit officia eiusmod Lorem
              aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi
              consectetur esse laborum eiusmod pariatur proident Lorem eiusmod
              et. Culpa deserunt nostrud ad veniam.
            </p>
            <p>
              Magna exercitation reprehenderit magna aute tempor cupidatat
              consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
              incididunt cillum quis. Velit duis sit officia eiusmod Lorem
              aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi
              consectetur esse laborum eiusmod pariatur proident Lorem eiusmod
              et. Culpa deserunt nostrud ad veniam.
            </p>
            <p>
              Magna exercitation reprehenderit magna aute tempor cupidatat
              consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
              incididunt cillum quis. Velit duis sit officia eiusmod Lorem
              aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi
              consectetur esse laborum eiusmod pariatur proident Lorem eiusmod
              et. Culpa deserunt nostrud ad veniam.
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
  },
} satisfies Meta<typeof Drawer<DOMMotionComponents['div']>>

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
