import { Dialog } from '../Dialog'
import { DialogTrigger } from '../DialogTrigger'
import { DialogContent } from '../DialogContent'
import { DialogHeader } from '../DialogHeader'
import { DialogBody } from '../DialogBody'
import { Button } from '../../button'
import { DialogFooter } from '../DialogFooter'
import { DialogClose } from '../DialogClose'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { DialogContentProps } from '../types'

const meta = {
  title: 'Components/DialogContent',
  component: DialogContent<'div'>,
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    scroll: {
      control: 'select',
      options: ['inside', 'outside'],
    },
    placement: {
      control: 'select',
      options: ['top', 'center', 'bottom'],
    },
    hideCloseButton: {
      control: 'boolean',
    },
    fullScreen: {
      control: 'boolean',
    },
  },
  render: (props) => {
    return (
      <Dialog>
        <DialogTrigger>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent {...props}>
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
} satisfies Meta<typeof DialogContent<'div'>>

type Story = StoryObj<typeof meta>

export default meta

export const Default: Story = {}

function ScrollTemplate(props: DialogContentProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent {...props}>
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
