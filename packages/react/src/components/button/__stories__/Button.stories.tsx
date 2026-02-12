import { HeartFilled, LikeFilled, DislikeFilled } from '@nex-ui/icons'
import { upperFirst } from '@nex-ui/utils'
import {
  SIZES,
  COLORS,
  RADII,
  toReadableSize,
  toReadableRadius,
  withLabel,
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

function renderVariants(props?: ButtonProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {VARIANTS.map((variant) =>
        withLabel(`${upperFirst(variant)}Variant`)(
          <ButtonTemplate {...props} key={variant} variant={variant} />,
        ),
      )}
    </Flex>
  )
}
export const Variants: Story = {
  render: renderVariants,
}

function renderColors(props?: ButtonProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {COLORS.map((color) =>
        withLabel(`${upperFirst(color)}Color`)(
          <ButtonTemplate {...props} key={color} color={color} />,
        ),
      )}
    </Flex>
  )
}
export const Colors: Story = {
  render: renderColors,
}

function renderSizes(props?: ButtonProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {SIZES.map((size) =>
        withLabel(`${toReadableSize(size)}Size`)(
          <ButtonTemplate {...props} key={size} size={size} />,
        ),
      )}
    </Flex>
  )
}
export const Sizes: Story = {
  render: renderSizes,
}

const renderRadii = (props?: ButtonProps) => {
  return (
    <Flex gap='5' wrap='wrap'>
      {RADII.map((radius) =>
        withLabel(`${toReadableRadius(radius)}Radius`)(
          <Button {...props} key={radius} radius={radius}>
            Button
          </Button>,
        ),
      )}
    </Flex>
  )
}
export const Radii: Story = {
  render: renderRadii,
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
          {withLabel('LoadingButton')(
            <ButtonTemplate {...LoadingButton.args} />,
          )}
          {withLabel('Disabled')(<ButtonTemplate {...Disabled.args} />)}
          {withLabel('IconButton')(<ButtonTemplate {...IconButton.args} />)}
          {withLabel('LoadingIconButton')(
            <ButtonTemplate {...LoadingIconButton.args} />,
          )}
          {withLabel('WithIcons')(<ButtonTemplate {...WithIcons.args} />)}
          {withLabel('DisableRipple')(
            <ButtonTemplate {...DisableRipple.args} />,
          )}
        </Flex>
        {renderVariants()}
        {renderColors()}
        {renderSizes()}
        {renderRadii()}
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
