import { Drawer } from '../Drawer'
import { DrawerTrigger } from '../DrawerTrigger'
import { DrawerContent } from '../DrawerContent'
import { DrawerHeader } from '../DrawerHeader'
import { DrawerBody } from '../DrawerBody'
import { Button } from '../../button'
import { DrawerFooter } from '../DrawerFooter'
import { DrawerClose } from '../DrawerClose'
import { Flex } from '../../flex'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { DrawerContentProps } from '../types'

const meta = {
  title: 'Components/DrawerContent',
  component: DrawerContent<'div'>,
  argTypes: {
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
  },
  render: (props) => {
    return (
      <Drawer>
        <DrawerTrigger>
          <Button>Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent {...props}>
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
} satisfies Meta<typeof DrawerContent<'div'>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

function PlacementTemplate({ placement }: DrawerContentProps) {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button>Open {placement}</Button>
      </DrawerTrigger>
      <DrawerContent placement={placement}>
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

export const Placement: Story = {
  render: () => {
    return (
      <Flex gap='4' wrap='wrap'>
        <PlacementTemplate placement='left' />
        <PlacementTemplate placement='right' />
        <PlacementTemplate placement='top' />
        <PlacementTemplate placement='bottom' />
      </Flex>
    )
  },
}
