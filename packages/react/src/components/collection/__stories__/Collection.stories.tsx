import { useEffect, useState } from 'react'
import { createCollection } from '../index'
import type { Meta } from '@storybook/react-vite'
import type { ReactNode } from 'react'

const meta: Meta = {
  title: 'Utilities/Collection',
  parameters: {
    controls: {
      disable: true,
    },
  },
  tags: ['nui-utility'],
}

export default meta

const [Collection, CollectionItem, useCollection] = createCollection<{
  item: string
}>('Story')

function CollectionWrapper({
  children,
  title,
}: {
  children?: ReactNode
  title: string
}) {
  const collection = useCollection()

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(title, collection.getItems())
  })

  return (
    <Collection collection={collection}>
      <ul>{children}</ul>
    </Collection>
  )
}

export function Default() {
  return (
    <CollectionWrapper title='Default'>
      <CollectionItem item='1'>
        <li>Item 1</li>
      </CollectionItem>
      <CollectionItem item='2'>
        <li>Item 2</li>
      </CollectionItem>
      <CollectionItem item='3'>
        <li>Item 3</li>
      </CollectionItem>
    </CollectionWrapper>
  )
}

export function WithElementInBetween() {
  return (
    <CollectionWrapper title='WithElementInBetween'>
      <CollectionItem item='1'>
        <li>Item 1</li>
      </CollectionItem>
      <li>Some element in between</li>
      <CollectionItem item='2'>
        <li>Item 2</li>
      </CollectionItem>
      <li>Another element in between</li>
      <CollectionItem item='3'>
        <li>Item 3</li>
      </CollectionItem>
    </CollectionWrapper>
  )
}

function Item2() {
  return (
    <CollectionItem item='2'>
      <li>Item 2</li>
    </CollectionItem>
  )
}

export function WithWrappedItem() {
  return (
    <CollectionWrapper title='WithWrappedItem'>
      <CollectionItem item='1'>
        <li>Item 1</li>
      </CollectionItem>
      <Item2 />
      <CollectionItem item='3'>
        <li>Item 3</li>
      </CollectionItem>
    </CollectionWrapper>
  )
}

export function WithFragment() {
  return (
    <CollectionWrapper title='WithFragment'>
      <>
        <CollectionItem item='1'>
          <li>Item 1</li>
        </CollectionItem>
        <CollectionItem item='2'>
          <li>Item 2</li>
        </CollectionItem>
      </>
      <CollectionItem item='3'>
        <li>Item 3</li>
      </CollectionItem>
    </CollectionWrapper>
  )
}

export function Nested() {
  return (
    <CollectionWrapper title='Nested outer'>
      <CollectionItem item='1'>
        <li>Item 1</li>
      </CollectionItem>
      <CollectionItem item='2'>
        <li>
          Item 2
          <CollectionWrapper title='Nested inside'>
            <CollectionItem item='2-1'>
              <li>Item 2-1</li>
            </CollectionItem>
            <CollectionItem item='2-2'>
              <li>Item 2-2</li>
            </CollectionItem>
          </CollectionWrapper>
        </li>
      </CollectionItem>
      <CollectionItem item='3'>
        <li>Item 3</li>
      </CollectionItem>
    </CollectionWrapper>
  )
}

export function WithChangingItem() {
  const [count, setCount] = useState(3)

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>
        Change item prop of last CollectionItem (current: {count})
      </button>
      <CollectionWrapper title='WithChangingItem'>
        <CollectionItem item='1'>
          <li>Item 1</li>
        </CollectionItem>
        <CollectionItem item='2'>
          <li>Item 2</li>
        </CollectionItem>
        <CollectionItem item={`${count}`}>
          <li>Item {count}</li>
        </CollectionItem>
      </CollectionWrapper>
    </>
  )
}
