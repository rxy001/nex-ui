import { useMemo } from 'react'
import { some } from '@nex-ui/utils'
import { useColorScheme } from '@nex-ui/react'
import { rootFile, getHtmlFile } from './entries'
import type {
  SandpackFiles,
  SandpackPredefinedTemplate,
} from '@codesandbox/sandpack-react'

export type UseSandpackProps = {
  files: SandpackFiles
  template?: SandpackPredefinedTemplate
}

const importReact = 'import React from "react";'

const getFileName = (filePath: string) => {
  return filePath?.split('.')?.[0]?.replace(/\W/g, '')
}

export const useSandpack = ({
  files,
  template = 'vite-react-ts',
}: UseSandpackProps) => {
  const { mode, systemColorScheme } = useColorScheme()

  const hasTypescript = useMemo(
    () =>
      some(
        Object.keys(files),
        (file) => file.includes('.ts') || file.includes('.tsx'),
      ),
    [files],
  )

  const sandpackTemplate = useMemo<SandpackPredefinedTemplate>(
    () =>
      template === 'vite-react-ts' && hasTypescript ? template : 'vite-react',
    [template, hasTypescript],
  )

  const mimeType = useMemo(
    () => (sandpackTemplate === 'vite-react-ts' ? '.tsx' : '.jsx'),
    [sandpackTemplate],
  )

  const entryFile = useMemo(
    () => (sandpackTemplate === 'vite-react-ts' ? 'index.tsx' : 'index.jsx'),
    [sandpackTemplate],
  )

  // filter files by current template
  const filteredFiles = useMemo(
    () =>
      Object.keys(files).reduce((acc, key) => {
        if (key.includes('App') && !key.includes(mimeType)) {
          return acc
        }
        if (template === 'vite-react-ts' && key.includes('.js')) {
          return acc
        }

        if (template === 'vite-react' && key.includes('.ts')) {
          return acc
        }
        // @ts-ignore
        acc[key] = files[key]

        return acc
      }, {}),
    [files, mimeType, template],
  )

  // sort files by dependency
  const { sortedFiles, dependencies, devDependencies } = useMemo(() => {
    const deps = {
      '@emotion/react': 'latest',
      '@nex-ui/react': 'latest',
      react: 'latest',
      'react-dom': 'latest',
    }

    let devDeps: Record<string, string> = {
      vite: 'latest',
      '@vitejs/plugin-react': 'latest',
    }

    if (sandpackTemplate === 'vite-react-ts') {
      devDeps = {
        ...devDeps,
        '@types/react': 'latest',
        '@types/react-dom': 'latest',
        typescript: 'latest',
      }
    }

    const sFiles = Object.keys(filteredFiles)
      .sort((a: string, b: string) => {
        const aFile = files[a] as string
        const bFile = files[b] as string
        const aName = getFileName(a)
        const bName = getFileName(b)

        // if bName includes "App" should be first
        if (bName.includes('App')) {
          return 1
        }

        if (aFile?.includes(bName)) {
          return -1
        }
        if (bFile.includes(aName)) {
          return 1
        }

        return 0
      })
      .reduce((acc, key) => {
        let fileContent = files[key] as string

        // Check if the file content includes 'React' import statements, if not, add it
        if (
          fileContent.includes('React.') &&
          !fileContent.includes("from 'react'") &&
          !fileContent.includes('from "react"')
        ) {
          fileContent = `${importReact}\n${fileContent}\n`
        }

        // Check if file content includes any other dependencies, if yes, add it to dependencies
        const importRegex = /import .* from ["'](.*)["']/g
        let match: RegExpExecArray | null

        while ((match = importRegex.exec(fileContent)) !== null) {
          const dependencyName = match[1]

          if (
            !Object.prototype.hasOwnProperty.call(deps, dependencyName) &&
            !dependencyName.includes('./')
          ) {
            // add the dependency to the dependencies object with version 'latest'
            // @ts-ignore
            deps[dependencyName] = 'latest'
          }
        }

        return {
          ...acc,
          [key]: fileContent,
        }
      }, {})

    return {
      dependencies: deps,
      sortedFiles: sFiles,
      devDependencies: devDeps,
    }
  }, [files, filteredFiles, sandpackTemplate])

  return useMemo(
    () => ({
      customSetup: {
        dependencies,
        devDependencies,
        entry: entryFile,
      },
      files: {
        ...sortedFiles,
        [entryFile]: {
          code: rootFile,
          hidden: true,
        },
        'index.html': {
          code: getHtmlFile(systemColorScheme ?? mode ?? 'light', entryFile),
          hidden: true,
        },
      },
      entryFile,
      sandpackTemplate,
    }),
    [
      dependencies,
      entryFile,
      mode,
      sandpackTemplate,
      sortedFiles,
      systemColorScheme,
      devDependencies,
    ],
  )
}
