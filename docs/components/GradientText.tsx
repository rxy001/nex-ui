import type { ReactNode } from 'react'

interface GradientTextProps {
  children: ReactNode
  className?: string
  colors?: string[]
  animationSpeed?: number
}

export function GradientText({
  children,
  className = '',
  colors = [
    'rgb(64, 255, 170)',
    'rgb(64, 121, 255)',
    'rgb(64, 255, 170)',
    'rgb(64, 121, 255)',
    'rgb(64, 255, 170)',
  ],
  animationSpeed = 8,
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    animationDuration: `${animationSpeed}s`,
  }

  return (
    <div
      className={`x:relative x:mx-auto x:flex x:max-w-fit x:flex-row x:items-center x:justify-center x:rounded-[1.25rem] x:backdrop-blur x:transition-shadow x:duration-500 x:overflow-hidden ${className}`}
    >
      <div
        className='x:inline-block x:relative x:z-2 x:text-transparent x:bg-cover x:animate-gradient'
        style={{
          ...gradientStyle,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          backgroundSize: '300% 100%',
        }}
      >
        {children}
      </div>
    </div>
  )
}
