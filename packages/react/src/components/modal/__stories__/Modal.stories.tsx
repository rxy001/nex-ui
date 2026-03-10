import { useState } from 'react'
import {
  Modal,
  ModalBackdrop,
  ModalTrigger,
  ModalPortal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from '../index'
import type { Meta } from '@storybook/react-vite'

const meta: Meta = {
  title: 'Utilities/Modal',
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export default meta

const contentStyle = {
  pos: 'fixed',
  left: 0,
  top: 0,
  bg: 'content',
  w: '100vw',
} as const

export function Default() {
  const [open, setOpen] = useState(false)
  const [restoreFocus, setRestoreFocus] = useState(true)
  const [closeOnEscape, setCloseOnEscape] = useState(true)
  const [closeOnInteractOutside, setCloseOnInteractOutside] = useState(true)
  const [preventScroll, setPreventScroll] = useState(false)

  return (
    <div
      style={{
        height: 2000,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Modal open={open} onOpenChange={setOpen}>
          <ModalTrigger>
            <button
              style={{
                width: 100,
              }}
            >
              Open Modal
            </button>
          </ModalTrigger>
          <ModalPortal>
            <ModalBackdrop />
            <ModalContent
              restoreFocus={restoreFocus}
              closeOnEscape={closeOnEscape}
              closeOnInteractOutside={closeOnInteractOutside}
              preventScroll={preventScroll}
              sx={contentStyle}
            >
              <ModalHeader>Test Modal</ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <ModalClose>
                  <button>Close</button>
                </ModalClose>
              </ModalFooter>
            </ModalContent>
          </ModalPortal>
        </Modal>
        <hr style={{ width: '100%' }} />
        <label>
          <input
            type='checkbox'
            checked={restoreFocus}
            onChange={(event) => setRestoreFocus(event.target.checked)}
          />
          &nbsp;Restore focus on close?
        </label>
        <label>
          <input
            type='checkbox'
            checked={closeOnEscape}
            onChange={(event) => setCloseOnEscape(event.target.checked)}
          />
          &nbsp;Close on escape?
        </label>
        <label>
          <input
            type='checkbox'
            checked={closeOnInteractOutside}
            onChange={(event) =>
              setCloseOnInteractOutside(event.target.checked)
            }
          />
          &nbsp;Close on interact outside?
        </label>
        <label>
          <input
            type='checkbox'
            checked={preventScroll}
            onChange={(event) => setPreventScroll(event.target.checked)}
          />
          &nbsp;Prevent scroll when open?
        </label>
      </div>
    </div>
  )
}

export function NestedModals() {
  const [open, setOpen] = useState(false)
  const [nestedOpen, setNestedOpen] = useState(false)
  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger>
        <button>Open Modal</button>
      </ModalTrigger>
      <ModalPortal>
        <ModalBackdrop />
        <ModalContent sx={contentStyle}>
          <ModalHeader>Parent Modal</ModalHeader>
          <ModalBody>
            <p>This is the parent modal.</p>
            <Modal open={nestedOpen} onOpenChange={setNestedOpen}>
              <ModalTrigger>
                <button>Open Nested Modal</button>
              </ModalTrigger>
              <ModalPortal>
                <ModalBackdrop />
                <ModalContent sx={contentStyle}>
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
              </ModalPortal>
            </Modal>
          </ModalBody>
          <ModalFooter>
            <ModalClose>
              <button>Close Parent Modal</button>
            </ModalClose>
          </ModalFooter>
        </ModalContent>
      </ModalPortal>
    </Modal>
  )
}

export function CloseModal() {
  const [open, setOpen] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger>
        <button>Open Modal</button>
      </ModalTrigger>
      <ModalPortal>
        <ModalBackdrop />
        <ModalContent sx={contentStyle}>
          <ModalHeader>Async Close Modal</ModalHeader>
          <ModalBody>
            <p>
              This modal demonstrates the ability to handle asynchronous
              operations.
            </p>
            <p>Click the buttons in the footer to see the behavior.</p>
          </ModalBody>
          <ModalFooter>
            <ModalClose>
              <button>Close Modal</button>
            </ModalClose>
            <ModalClose>
              <button
                onClick={(event) => {
                  event.preventDefault()
                }}
              >
                Prevent Close Modal
              </button>
            </ModalClose>
            <ModalClose>
              <button
                onClick={() => {
                  setLoading1(true)
                  return new Promise<void>((resolve) => {
                    setTimeout(() => {
                      setLoading1(false)
                      resolve()
                    }, 1000)
                  })
                }}
              >
                {loading1 ? 'Requesting...' : 'Async Close Modal'}
              </button>
            </ModalClose>
            <ModalClose>
              <button
                onClick={(event) => {
                  setLoading2(true)
                  return new Promise<void>((resolve) => {
                    setTimeout(() => {
                      setLoading2(false)
                      event.preventDefault()
                      resolve()
                    }, 1000)
                  })
                }}
              >
                {loading2 ? 'Requesting...' : 'Async Prevent Close Modal'}
              </button>
            </ModalClose>
          </ModalFooter>
        </ModalContent>
      </ModalPortal>
    </Modal>
  )
}

export function ForcedMount() {
  const [open, setOpen] = useState(false)

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalPortal forceMount>
        <ModalBackdrop />
        <ModalContent sx={contentStyle}>
          <ModalHeader>Test Modal</ModalHeader>
          <ModalBody>
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
          </ModalBody>
          <ModalFooter>
            <ModalClose>
              <button>Close Modal</button>
            </ModalClose>
          </ModalFooter>
        </ModalContent>
      </ModalPortal>
    </Modal>
  )
}
