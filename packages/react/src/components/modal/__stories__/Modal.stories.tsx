import { useState } from 'react'
import {
  Modal,
  ModalBackdrop,
  ModalTrigger,
  ModalPortal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalRoot,
  ModalMotion,
  ModalHeader,
  ModalFooter,
} from '../index'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type {
  ModalContentProps,
  ModalPortalProps,
  ModalProps,
  ModalRootProps,
} from '../types'

type ModalTemplateProps = ModalProps &
  Pick<ModalPortalProps, 'keepMounted'> &
  Pick<ModalRootProps, 'preventScroll'> &
  Pick<
    ModalContentProps,
    'restoreFocus' | 'closeOnEscape' | 'closeOnInteractOutside'
  > & {
    disableAnimation?: boolean
  }

function ModalTemplate(props: ModalTemplateProps) {
  const {
    restoreFocus,
    closeOnEscape,
    closeOnInteractOutside,
    preventScroll,
    keepMounted,
    disableAnimation,
  } = props

  const [open, setOpen] = useState(false)

  const renderRoot = () => (
    <ModalRoot preventScroll={preventScroll}>
      <ModalBackdrop />
      <ModalContent
        restoreFocus={restoreFocus}
        closeOnEscape={closeOnEscape}
        closeOnInteractOutside={closeOnInteractOutside}
      >
        <ModalHeader>Test Modal</ModalHeader>
        <ModalBody>
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
        </ModalBody>
        <ModalFooter>
          <ModalClose>
            <button>Close</button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </ModalRoot>
  )

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger>
        <button>Open Modal</button>
      </ModalTrigger>
      <ModalPortal keepMounted={keepMounted} disablePresence={disableAnimation}>
        {disableAnimation ? (
          renderRoot()
        ) : (
          <ModalMotion>{renderRoot()}</ModalMotion>
        )}
      </ModalPortal>
    </Modal>
  )
}

const meta = {
  title: 'Utilities/Modal',
  component: ModalTemplate,
  argTypes: {
    restoreFocus: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    closeOnInteractOutside: { control: 'boolean' },
    preventScroll: { control: 'boolean' },
    keepMounted: { control: 'boolean' },
  },
} satisfies Meta<ModalTemplateProps>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

function NestedModalTemplate() {
  const [open, setOpen] = useState(false)
  const [nestedOpen, setNestedOpen] = useState(false)
  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger>
        <button>Open Modal</button>
      </ModalTrigger>
      <ModalPortal>
        <ModalRoot>
          <ModalMotion>
            <ModalBackdrop />
            <ModalContent
              sx={{
                width: '100vw',
              }}
            >
              <ModalHeader>Parent Modal</ModalHeader>
              <ModalBody>
                <p>This is the parent modal.</p>
                <Modal open={nestedOpen} onOpenChange={setNestedOpen}>
                  <ModalTrigger>
                    <button>Open Nested Modal</button>
                  </ModalTrigger>
                  <ModalPortal>
                    <ModalRoot>
                      <ModalMotion>
                        <ModalBackdrop />
                        <ModalContent
                          sx={{
                            width: '100vw',
                          }}
                        >
                          <ModalHeader>Nested Modal</ModalHeader>
                          <ModalBody>
                            <p>This is the nested modal.</p>
                          </ModalBody>
                          <ModalFooter>
                            <ModalClose>
                              <button>Close Nested Modal</button>
                            </ModalClose>
                            <button
                              onClick={() => {
                                setNestedOpen(false)
                                setOpen(false)
                              }}
                            >
                              Close Both Modals
                            </button>
                          </ModalFooter>
                        </ModalContent>
                      </ModalMotion>
                    </ModalRoot>
                  </ModalPortal>
                </Modal>
              </ModalBody>
              <ModalFooter>
                <ModalClose>
                  <button>Close Parent Modal</button>
                </ModalClose>
              </ModalFooter>
            </ModalContent>
          </ModalMotion>
        </ModalRoot>
      </ModalPortal>
    </Modal>
  )
}

export const NestedModals: Story = {
  render: () => <NestedModalTemplate />,
}

export const DisableAnimations: Story = {
  args: {
    disableAnimation: true,
  },
}

export const keepMounted: Story = {
  args: {
    keepMounted: true,
  },
}

export const PreventScroll: Story = {
  render: () => {
    return (
      <div
        style={{
          height: 2000,
        }}
      >
        <ModalTemplate preventScroll />
      </div>
    )
  },
}

function MultipleModalsTemplate() {
  const [openFirst, setOpenFirst] = useState(false)
  const [openSecond, setOpenSecond] = useState(false)
  return (
    <>
      <Modal open={openFirst} onOpenChange={setOpenFirst}>
        <ModalTrigger>
          <button>Open First Modal</button>
        </ModalTrigger>
        <ModalPortal>
          <ModalRoot>
            <ModalMotion>
              <ModalBackdrop />
              <ModalContent
                sx={{
                  width: '100vw',
                }}
              >
                <ModalHeader>First Modal</ModalHeader>
                <ModalBody>
                  <p>This is the first modal.</p>
                  <button
                    onClick={() => {
                      setOpenSecond(true)
                    }}
                  >
                    Open Second Modal
                  </button>
                </ModalBody>
                <ModalFooter>
                  <ModalClose>
                    <button>Close First Modal</button>
                  </ModalClose>
                </ModalFooter>
              </ModalContent>
            </ModalMotion>
          </ModalRoot>
        </ModalPortal>
      </Modal>
      <Modal open={openSecond} onOpenChange={setOpenSecond}>
        <ModalPortal>
          <ModalRoot>
            <ModalMotion>
              <ModalBackdrop />
              <ModalContent
                sx={{
                  width: '100vw',
                }}
              >
                <ModalHeader>Second Modal</ModalHeader>
                <ModalBody>
                  <p>This is the second modal.</p>
                </ModalBody>
                <ModalFooter>
                  <ModalClose>
                    <button>Close Second Modal</button>
                  </ModalClose>
                </ModalFooter>
              </ModalContent>
            </ModalMotion>
          </ModalRoot>
        </ModalPortal>
      </Modal>
    </>
  )
}

export const MultipleModals: Story = {
  render: () => <MultipleModalsTemplate />,
}
