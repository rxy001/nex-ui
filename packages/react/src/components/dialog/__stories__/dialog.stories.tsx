import { Dialog } from '../Dialog'
import { DialogTrigger } from '../DialogTrigger'
import { DialogContent } from '../DialogContent'
import { DialogHeader } from '../DialogHeader'
import { DialogBody } from '../DialogBody'
import { Button } from '../../button'
import { DialogFooter } from '../DialogFooter'
import { DialogClose } from '../DialogClose'
import type { Meta, StoryObj } from '@storybook/react'
import type { DialogProps } from '../types'

const meta = {
  title: 'Components/Dialog',
  component: Dialog<'div'>,
  argTypes: {
    scroll: {
      options: ['inside', 'outside'],
      control: 'select',
    },
    placement: {
      options: ['top', 'center', 'bottom'],
      control: 'select',
    },
    maxWidth: {
      options: ['sm', 'md', 'lg', 'xl', 'full', 'xs'],
      control: 'select',
    },
    keepMounted: {
      control: 'boolean',
    },
    closeOnInteractBackdrop: {
      control: 'boolean',
    },
    hideBackdrop: {
      control: 'boolean',
    },
    fullScreen: {
      control: 'boolean',
    },
    preventScroll: {
      control: 'boolean',
    },
    hideCloseButton: {
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
    scroll: 'outside',
    placement: 'top',
    maxWidth: 'md',
    keepMounted: false,
    closeOnInteractBackdrop: true,
    hideBackdrop: false,
    fullScreen: false,
    preventScroll: false,
    hideCloseButton: false,
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
              <Button color='red' variant='text'>
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
} satisfies Meta<typeof Dialog<'div'>>

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

function ScrollTemplate(props: DialogProps) {
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
          <p>
            Magna exercitation reprehenderit magna aute tempor cupidatat
            consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
            incididunt cillum quis. Velit duis sit officia eiusmod Lorem aliqua
            enim laboris do dolor eiusmod. Et mollit incididunt nisi consectetur
            esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
            deserunt nostrud ad veniam.
          </p>
          <p>
            Magna exercitation reprehenderit magna aute tempor cupidatat
            consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
            incididunt cillum quis. Velit duis sit officia eiusmod Lorem aliqua
            enim laboris do dolor eiusmod. Et mollit incididunt nisi consectetur
            esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
            deserunt nostrud ad veniam.
          </p>
          <p>
            Magna exercitation reprehenderit magna aute tempor cupidatat
            consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
            incididunt cillum quis. Velit duis sit officia eiusmod Lorem aliqua
            enim laboris do dolor eiusmod. Et mollit incididunt nisi consectetur
            esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
            deserunt nostrud ad veniam.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogClose>
            <Button color='red' variant='text'>
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
}

export const InsideScroll: Story = {
  args: {
    scroll: 'inside',
  },
  render: ScrollTemplate,
}

export const OutsideScroll: Story = {
  args: {
    scroll: 'outside',
  },
  render: ScrollTemplate,
}
