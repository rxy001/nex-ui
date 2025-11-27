import { renderWithNexUIProvider } from '~/tests/shared'
import { waitFor } from '@testing-library/react'
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalPanel,
  ModalPortal,
  ModalRoot,
  ModalMotion,
  ModalClose,
} from '../index'
import type { ModalPortalProps } from '../types'

function TestModal({ keepMounted, animateDisabled }: ModalPortalProps) {
  const renderChildren = () => (
    <>
      <ModalBackdrop data-testid='modal-backdrop' />
      <ModalPanel data-testid='modal-panel'>
        <ModalContent data-testid='modal-content'>
          <ModalHeader data-testid='modal-header'>Test Modal</ModalHeader>
          <ModalBody data-testid='modal-body'>
            <ModalClose>
              <button data-testid='close-button'>close</button>
            </ModalClose>
          </ModalBody>
          <ModalFooter data-testid='modal-footer'>
            Test Modal Footer
          </ModalFooter>
        </ModalContent>
      </ModalPanel>
    </>
  )

  return (
    <Modal defaultOpen>
      <ModalPortal keepMounted={keepMounted} animateDisabled={animateDisabled}>
        <ModalRoot data-testid='modal-root'>
          {animateDisabled ? (
            renderChildren()
          ) : (
            <ModalMotion data-testid='modal-motion'>
              {renderChildren()}
            </ModalMotion>
          )}
        </ModalRoot>
      </ModalPortal>
    </Modal>
  )
}

describe('ModalMotion', () => {
  it('should render ModalMotion component', async () => {
    const { getByTestId } = await renderWithNexUIProvider(
      <TestModal animateDisabled={false} />,
      {
        useAct: true,
      },
    )
    expect(getByTestId('modal-motion')).toBeInTheDocument()
  })

  it('should not render ModalMotion when animateDisabled=true', async () => {
    const { queryByTestId } = await renderWithNexUIProvider(
      <TestModal animateDisabled />,
      {
        useAct: true,
      },
    )
    expect(queryByTestId('modal-motion')).not.toBeInTheDocument()
  })

  it('should render correct styles on ModalMotion', async () => {
    const { getByTestId } = await renderWithNexUIProvider(
      <TestModal animateDisabled={false} />,
      {
        useAct: true,
      },
    )

    const modalMotion = getByTestId('modal-motion')
    await waitFor(() => expect(modalMotion).toHaveStyle('opacity: 1'))
  })

  it('should render correct styles on ModalMotion when keepMounted=true', async () => {
    const { getByTestId, user } = await renderWithNexUIProvider(
      <TestModal animateDisabled={false} keepMounted />,
      {
        useAct: true,
      },
    )

    const modalMotion = getByTestId('modal-motion')
    await waitFor(() =>
      expect(modalMotion).toHaveStyle({
        opacity: '1',
        display: 'block',
      }),
    )

    const closeButton = getByTestId('close-button')
    await user.click(closeButton)

    await waitFor(() =>
      expect(modalMotion).toHaveStyle({
        opacity: '0',
        display: 'none',
      }),
    )
  })
})
