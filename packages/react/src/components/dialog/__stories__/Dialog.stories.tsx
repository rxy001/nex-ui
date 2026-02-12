import { SIZES as DEFAULT_SIZES, toReadableSize } from '~/sb/utils'
import { upperFirst } from '@nex-ui/utils'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogClose,
} from '../index'
import { Button } from '../../button'
import { Flex } from '../../flex'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { DialogContentProps, DialogProps } from '../types'
import type { ReactNode } from 'react'

type DialogTemplateProps = DialogProps &
  Pick<
    DialogContentProps,
    'size' | 'scroll' | 'placement' | 'hideCloseButton'
  > & {
    triggerText?: ReactNode
  }

const SIZES = ['xs', ...DEFAULT_SIZES, 'xl', 'full'] as const

const PLACEMENTS = ['top', 'center', 'bottom'] as const

function DialogTemplate(props: DialogTemplateProps) {
  const {
    size,
    scroll,
    placement,
    hideCloseButton,
    children,
    triggerText = 'Open Dialog',
    ...other
  } = props

  return (
    <Dialog {...other}>
      <DialogTrigger>
        <Button>{triggerText}</Button>
      </DialogTrigger>
      <DialogContent
        size={size}
        scroll={scroll}
        placement={placement}
        hideCloseButton={hideCloseButton}
      >
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
          {children}
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

const meta = {
  title: 'Components/Dialog',
  component: DialogTemplate,
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
    size: {
      control: 'select',
      options: SIZES,
    },
    scroll: {
      control: 'select',
      options: ['inside', 'outside'],
    },
    placement: {
      control: 'select',
      options: PLACEMENTS,
    },
    hideCloseButton: {
      control: 'boolean',
    },
  },
} satisfies Meta<DialogTemplateProps>

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

export function Sizes(props: DialogTemplateProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {SIZES.map((size) => (
        <DialogTemplate
          {...props}
          key={size}
          size={size}
          triggerText={`${toReadableSize(size)} Size`}
        />
      ))}
    </Flex>
  )
}

export function Placements(props: DialogTemplateProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {PLACEMENTS.map((placement) => (
        <DialogTemplate
          {...props}
          key={placement}
          placement={placement}
          triggerText={`${upperFirst(placement)} Placement`}
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

export const WithoutBackdrop: Story = {
  args: {
    hideBackdrop: true,
    defaultOpen: true,
  },
}

function ScrollTemplate(props: DialogTemplateProps) {
  return (
    <DialogTemplate defaultOpen {...props}>
      <p>
        Magna exercitation reprehenderit magna aute tempor cupidatat consequat
        elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum
        quis. Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor
        eiusmod. Et mollit incididunt nisi consectetur esse laborum eiusmod
        pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
      </p>
      <p>
        Magna exercitation reprehenderit magna aute tempor cupidatat consequat
        elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum
        quis. Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor
        eiusmod. Et mollit incididunt nisi consectetur esse laborum eiusmod
        pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
      </p>
      <p>
        Magna exercitation reprehenderit magna aute tempor cupidatat consequat
        elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum
        quis. Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor
        eiusmod. Et mollit incididunt nisi consectetur esse laborum eiusmod
        pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
      </p>
      <p>
        Magna exercitation reprehenderit magna aute tempor cupidatat consequat
        elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum
        quis. Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor
        eiusmod. Et mollit incididunt nisi consectetur esse laborum eiusmod
        pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
      </p>
      <p>
        Magna exercitation reprehenderit magna aute tempor cupidatat consequat
        elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum
        quis. Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor
        eiusmod. Et mollit incididunt nisi consectetur esse laborum eiusmod
        pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
      </p>
    </DialogTemplate>
  )
}

export function InsideScroll(props: DialogTemplateProps) {
  return <ScrollTemplate {...props} scroll='inside' />
}

export function OutsideScroll(props: DialogTemplateProps) {
  return <ScrollTemplate {...props} scroll='outside' />
}
