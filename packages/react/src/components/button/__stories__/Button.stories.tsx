import { HeartFilled, LikeFilled, DislikeFilled } from '@nex-ui/icons'
import { upperFirst } from '@nex-ui/utils'
import {
  SIZES,
  COLORS,
  RADII,
  toReadableSize,
  toReadableRadius,
  WithLabel,
} from '~/sb/utils'
import { Button } from '../Button'
import { Flex } from '../../flex'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ButtonProps } from '../types'

const VARIANTS = ['solid', 'outlined', 'ghost', 'faded'] as const

function ButtonTemplate(props: ButtonProps) {
  return <Button {...props}>{props.children ?? 'Button'}</Button>
}

const meta = {
  title: 'Components/Button',
  component: ButtonTemplate,
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    iconOnly: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
    variant: {
      options: VARIANTS,
      control: 'select',
    },
    size: {
      options: SIZES,
      control: 'select',
    },
    radius: {
      options: RADII,
      control: 'select',
    },
    href: {
      control: 'text',
    },
    color: {
      options: COLORS,
      control: 'select',
    },
    loading: {
      control: 'boolean',
    },
    disableRipple: {
      control: 'boolean',
    },
    spinnerPlacement: {
      options: ['start', 'end'],
      control: 'select',
    },
    disableAnimation: {
      control: 'boolean',
    },
  },
  parameters: {
    controls: {
      exclude: ['startIcon', 'endIcon', 'children'],
    },
  },
} satisfies Meta<typeof ButtonTemplate>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const FullWidthButton: Story = {
  args: {
    fullWidth: true,
  },
}

export function Variants(props: ButtonProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {VARIANTS.map((variant) => (
        <WithLabel key={variant} label={`${upperFirst(variant)}Variant`}>
          <ButtonTemplate {...props} variant={variant} />
        </WithLabel>
      ))}
    </Flex>
  )
}

export function Colors(props: ButtonProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {COLORS.map((color) => (
        <WithLabel key={color} label={`${upperFirst(color)}Color`}>
          <ButtonTemplate {...props} color={color} />
        </WithLabel>
      ))}
    </Flex>
  )
}

export function Sizes(props: ButtonProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {SIZES.map((size) => (
        <WithLabel key={size} label={`${toReadableSize(size)}Size`}>
          <ButtonTemplate {...props} size={size} />
        </WithLabel>
      ))}
    </Flex>
  )
}

export function Radii(props: ButtonProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {RADII.map((radius) => (
        <WithLabel key={radius} label={`${toReadableRadius(radius)}Radius`}>
          <Button {...props} radius={radius}>
            Button
          </Button>
        </WithLabel>
      ))}
    </Flex>
  )
}

export const LoadingButton: Story = {
  args: {
    loading: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const IconButton: Story = {
  args: {
    iconOnly: true,
    children: <HeartFilled />,
    'aria-label': 'Like',
  },
}

export const LoadingIconButton: Story = {
  args: {
    iconOnly: true,
    loading: true,
    'aria-label': 'Loading',
  },
}

export const WithIcons: Story = {
  args: {
    children: 'Button',
    startIcon: <LikeFilled />,
    endIcon: <DislikeFilled />,
  },
}

export const DisableRipple: Story = {
  args: {
    disableRipple: true,
    children: 'Button',
  },
}

export const Chromatic: Story = {
  render: () => {
    return (
      <>
        <Flex gap='5' wrap='wrap'>
          <WithLabel label='LoadingButton'>
            <ButtonTemplate {...LoadingButton.args} />
          </WithLabel>
          <WithLabel label='Disabled'>
            <ButtonTemplate {...Disabled.args} />
          </WithLabel>
          <WithLabel label='IconButton'>
            <ButtonTemplate {...IconButton.args} />
          </WithLabel>
          <WithLabel label='LoadingIconButton'>
            <ButtonTemplate {...LoadingIconButton.args} />
          </WithLabel>
          <WithLabel label='WithIcons'>
            <ButtonTemplate {...WithIcons.args} />
          </WithLabel>
          <WithLabel label='DisableRipple'>
            <ButtonTemplate {...DisableRipple.args} />
          </WithLabel>
        </Flex>
        <Variants />
        <Colors />
        <Sizes />
        <Radii />
      </>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
    chromatic: {
      disable: false,
    },
  },
}
