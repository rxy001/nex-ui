import { render } from '@testing-library/react'
import { CollectionItem, Collection } from '../index'
import { useCollection } from '../useCollection'
import type { CollectionItemProps } from '../index'

function TestCollectionItem({ children }: CollectionItemProps) {
  const collection = useCollection()

  return (
    <Collection collection={collection}>
      <CollectionItem>{children}</CollectionItem>
    </Collection>
  )
}

describe('CollectionItem', () => {
  it('should render children as-is if children is not a valid React element', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

    const { container } = render(
      // @ts-ignore
      <TestCollectionItem>{null}</TestCollectionItem>,
    )
    expect(container.firstChild).toBeNull()
    expect(consoleErrorSpy).toHaveBeenCalled()
    consoleErrorSpy.mockRestore()
  })

  it('should render children as-is and warn if children is a Fragment', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

    const { container } = render(
      <TestCollectionItem>
        <></>
      </TestCollectionItem>,
    )
    expect(container.firstChild).toBeNull()
    expect(consoleErrorSpy).toHaveBeenCalled()
    consoleErrorSpy.mockRestore()
  })
})
