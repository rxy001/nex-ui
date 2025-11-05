import { Dialog } from '../Dialog'
import { DialogTrigger } from '../DialogTrigger'
import { DialogContent } from '../DialogContent'
import { DialogHeader } from '../DialogHeader'
import { DialogBody } from '../DialogBody'
import { Button } from '../../button'
import { DialogFooter } from '../DialogFooter'
import { DialogClose } from '../DialogClose'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { DOMMotionComponents } from 'motion/react'

const meta = {
  title: 'Components/Dialog',
  component: Dialog<DOMMotionComponents['div']>,
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
  args: {
    keepMounted: false,
    closeOnInteractBackdrop: true,
    hideBackdrop: false,
    preventScroll: false,
    closeOnEscape: true,
    restoreFocus: true,
  },
  render: (props) => {
    return (
      <Dialog {...props}>
        <DialogTrigger>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>Dialog Header</DialogHeader>
          <DialogBody>
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
          </DialogBody>
          <DialogFooter>
            <DialogClose>
              <Button color='red' variant='ghost'>
                Cancel
              </Button>
            </DialogClose>
            <DialogClose>
              <Button>Action</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
} satisfies Meta<typeof Dialog<DOMMotionComponents['div']>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
  },
}
