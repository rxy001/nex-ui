import { Button } from '@nex-ui/react'
import type { ButtonProps } from '@nex-ui/react'
import { GithubFilled } from '@nex-ui/icons'
import StorybookIcon from '@/icons/storybook.svg'
import NextIcon from '@/icons/nextjs.svg'

type ComponentLinksProps = {
  rscCompatible?: boolean
  component: string
}
const sx = {
  bg: '#f4f4f5',
  color: 'gray.800',
  '& svg': {
    fontSize: 20,
  },
  _hover: {
    bg: '#f0f0f0',
  },
}

const COMPONENT_PATH =
  'https://github.com/rxy001/nex-ui/tree/main/packages/react/src/components/'

const RECIPE_PATH =
  'https://github.com/rxy001/nex-ui/blob/main/packages/react/src/theme/recipes/'

const ButtonLink = (props: ButtonProps) => {
  return (
    <Button
      size="sm"
      color="gray"
      sx={sx}
      variant="text"
      target="_blank"
      {...props}
    />
  )
}

export const ComponentLinks = ({
  component,
  rscCompatible = false,
}: ComponentLinksProps) => {
  return (
    <div className="x:mt-6 x:flex x:flex-row x:gap-7">
      <ButtonLink startIcon={<StorybookIcon color="#ff4785" />}>
        Storybook
      </ButtonLink>
      {rscCompatible && (
        <ButtonLink startIcon={<NextIcon />}>Server Component</ButtonLink>
      )}
      <ButtonLink
        startIcon={<GithubFilled />}
        href={`${COMPONENT_PATH}${component}`}
      >
        Source
      </ButtonLink>
      <ButtonLink
        startIcon={<GithubFilled />}
        href={`${RECIPE_PATH}${component}.ts`}
      >
        Recipe Source
      </ButtonLink>
    </div>
  )
}
