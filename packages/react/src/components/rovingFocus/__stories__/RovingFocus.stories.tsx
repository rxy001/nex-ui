import { useMemo, useState } from 'react'
import { createContext } from '@nex-ui/utils'
import { Flex } from '../../flex'
import { RovingFocusGroup, RovingFocusItem } from '../index'
import type { ReactNode } from 'react'
import type { RovingFocusGroupProps } from '../types'

const meta = {
  title: 'Utilities/Roving Focus',
}

export default meta

const [ButtonGroupProvider, useButtonGroupContext] = createContext<{
  value: string
  setValue: (value: string) => void
}>({
  contextName: 'ButtonGroupContext',
  defaultValue: {} as any,
  hookName: 'useButtonGroupContext',
  providerName: 'ButtonGroupProvider',
  strict: true,
})

function ButtonGroup({
  children,
  ...props
}: Omit<RovingFocusGroupProps, 'children'> & { children: ReactNode }) {
  const [value, setValue] = useState('')

  const ctx = useMemo(() => {
    return { value, setValue }
  }, [value])

  return (
    <RovingFocusGroup {...props}>
      <Flex gap='5' sx={{ mt: '2' }} inline>
        <ButtonGroupProvider value={ctx}>{children}</ButtonGroupProvider>
      </Flex>
    </RovingFocusGroup>
  )
}

function Button({ children, value }: { children: ReactNode; value: string }) {
  const { value: valueContext, setValue } = useButtonGroupContext()

  const selected = valueContext === value

  return (
    <RovingFocusItem active={selected}>
      <button
        style={
          selected
            ? {
                background: 'wheat',
              }
            : {}
        }
        onClick={() => setValue(value)}
        onFocus={() => setValue(value)}
      >
        {children}
      </button>
    </RovingFocusItem>
  )
}

export function Default() {
  return (
    <Flex direction='column' gap='5'>
      <div>
        <div>no orientation (both) + no looping</div>
        <ButtonGroup loop={false}>
          <Button value='red'>red</Button>
          <Button value='blue'>blue</Button>
          <Button value='orange'>orange</Button>
          <Button value='wheat'>wheat</Button>
        </ButtonGroup>
      </div>
      <div>
        <div>no orientation (both) + looping</div>
        <ButtonGroup loop>
          <Button value='red'>red</Button>
          <Button value='blue'>blue</Button>
          <Button value='orange'>orange</Button>
          <Button value='wheat'>wheat</Button>
        </ButtonGroup>
      </div>
      <div>
        <div>horizontal + no looping</div>
        <ButtonGroup orientation='horizontal' loop={false}>
          <Button value='red'>red</Button>
          <Button value='blue'>blue</Button>
          <Button value='orange'>orange</Button>
          <Button value='wheat'>wheat</Button>
        </ButtonGroup>
      </div>
      <div>
        <div>horizontal + looping</div>
        <ButtonGroup orientation='horizontal' loop>
          <Button value='red'>red</Button>
          <Button value='blue'>blue</Button>
          <Button value='orange'>orange</Button>
          <Button value='wheat'>wheat</Button>
        </ButtonGroup>
      </div>
      <div>
        <div>vertical + no looping</div>
        <ButtonGroup orientation='vertical' loop={false}>
          <Button value='red'>red</Button>
          <Button value='blue'>blue</Button>
          <Button value='orange'>orange</Button>
          <Button value='wheat'>wheat</Button>
        </ButtonGroup>
      </div>
      <div>
        <div>vertical + looping</div>
        <ButtonGroup orientation='vertical' loop>
          <Button value='red'>red</Button>
          <Button value='blue'>blue</Button>
          <Button value='orange'>orange</Button>
          <Button value='wheat'>wheat</Button>
        </ButtonGroup>
      </div>
    </Flex>
  )
}
