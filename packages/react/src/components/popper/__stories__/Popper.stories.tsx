import { useEffect, useRef, useState } from 'react'
import { Box } from '../../box'
import { Flex } from '../../flex'
import {
  Popper,
  PopperAnchor,
  PopperContent,
  PopperMotion,
  PopperPortal,
} from '../index'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { PopperPortalProps, PopperContentProps } from '../types'

type PopperTemplateProps = Pick<
  PopperPortalProps,
  'keepMounted' | 'container'
> &
  Pick<
    PopperContentProps,
    | 'closeOnDetached'
    | 'closeOnEscape'
    | 'placement'
    | 'offset'
    | 'flip'
    | 'shift'
  > & {
    disableAnimation?: boolean
  }

function PopperTemplate(props: PopperTemplateProps) {
  const [open, setOpen] = useState(false)
  const innerRef = useRef<HTMLDivElement>(null)
  const outerRef = useRef<HTMLDivElement>(null)
  const {
    placement,
    offset,
    flip,
    shift,
    disableAnimation,
    keepMounted,
    closeOnDetached,
    closeOnEscape,
  } = props

  const renderPopperContent = () => (
    <PopperContent
      closeOnDetached={closeOnDetached}
      closeOnEscape={closeOnEscape}
      placement={placement}
      offset={offset}
      flip={flip}
      shift={shift}
    >
      <Box
        sx={{
          border: '1px solid #000',
        }}
      >
        This is the popper content.
      </Box>
    </PopperContent>
  )

  useEffect(() => {
    outerRef.current?.scrollTo(400, 400)
  }, [])

  return (
    <Flex
      sx={{
        w: '100%',
        h: '100%',
      }}
      justify='center'
      align='center'
    >
      <Box
        sx={{
          w: 400,
          h: 400,
          overflow: 'auto',
          border: '1px solid #000',
        }}
        ref={outerRef}
      >
        <Flex
          sx={{
            h: 1200,
            w: 1200,
            position: 'relative',
          }}
          justify='center'
          align='center'
          ref={innerRef}
        >
          <Popper open={open} onOpenChange={setOpen}>
            <PopperAnchor>
              <button
                onClick={() => {
                  setOpen(true)
                }}
              >
                Open Popper
              </button>
            </PopperAnchor>
            <PopperPortal
              keepMounted={keepMounted}
              disablePresence={disableAnimation}
              container={() => innerRef.current}
            >
              {disableAnimation ? (
                renderPopperContent()
              ) : (
                <PopperMotion>{renderPopperContent()}</PopperMotion>
              )}
            </PopperPortal>
          </Popper>
        </Flex>
      </Box>
    </Flex>
  )
}

const PLACEMENTS = [
  'top-start',
  'top',
  'top-end',
  'right-start',
  'right',
  'right-end',
  'bottom-start',
  'bottom',
  'bottom-end',
  'left-start',
  'left',
  'left-end',
] as const

const meta = {
  title: 'Utilities/Popper',
  component: PopperTemplate,
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: PLACEMENTS,
    },
    offset: {
      control: { type: 'number' },
    },
    flip: {
      control: { type: 'boolean' },
    },
    shift: {
      control: { type: 'boolean' },
    },
    keepMounted: {
      control: { type: 'boolean' },
    },
    closeOnDetached: {
      control: { type: 'boolean' },
    },
    closeOnEscape: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<PopperTemplateProps>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const DisableAnimation: Story = {
  args: {
    disableAnimation: true,
  },
}
