import fs from 'node:fs'
import path from 'node:path'
import chalk from 'chalk'
import gradient from 'gradient-string'
import * as prompts from '@clack/prompts'

type InitActionOptions = {
  template: string
}

const TEMPLATES = [
  {
    name: 'next-app',
    display: 'App(Next.js)',
    color: chalk.blueBright,
  },
  {
    name: 'next-pages',
    display: 'Pages(Next.js)',
    color: chalk.greenBright,
  },
  {
    name: 'vite',
    display: 'Vite',
    color: chalk.cyanBright,
  },
  {
    name: 'vite-swc',
    display: 'Vite(SWC)',
    color: chalk.magentaBright,
  },
]

const defaultTargetDir = 'nex-ui-project'

const cwd = process.cwd()

export const initAction = async (
  argProjectName: string,
  { template: argTemplate }: InitActionOptions,
) => {
  const cancel = () => prompts.cancel('Operation cancelled')

  prompts.intro(chalk.cyanBright('Create a new project'))

  let targetDir = argProjectName

  // 1. Get project name and target dir
  if (!targetDir) {
    const projectName = await prompts.text({
      message: chalk.yellowBright('Project name:'),
      initialValue: defaultTargetDir,
      placeholder: defaultTargetDir,
    })

    if (prompts.isCancel(projectName)) return cancel()

    targetDir = formatTargetDir(projectName)
  }

  // 2. Handle directory if exist and not empty
  if (fs.existsSync(targetDir) && !isEmptyDir(targetDir)) {
    const overwrite = await prompts.select({
      message: chalk.yellowBright(
        `Target directory "${targetDir}" is not empty. Please choose how to proceed:`,
      ),
      options: [
        {
          label: chalk.cyanBright('Cancel operation'),
          value: 'no',
        },
        {
          label: chalk.greenBright('Remove existing files and continue'),
          value: 'yes',
        },
        {
          label: chalk.magentaBright('Ignore files and continue'),
          value: 'ignore',
        },
      ],
    })

    if (prompts.isCancel(overwrite)) return cancel()

    switch (overwrite) {
      case 'yes':
        emptyDir(targetDir)
        break
      case 'no':
        cancel()
        return
    }
  }

  let packageName = path.basename(path.resolve(targetDir))

  // 3. Get package name
  if (!isValidPackageName(packageName)) {
    const packageNameResult = await prompts.text({
      message: chalk.yellowBright('Package name:'),
      defaultValue: toValidPackageName(packageName),
      placeholder: toValidPackageName(packageName),
      validate(dir) {
        if (!isValidPackageName(dir)) {
          return 'Invalid package.json name'
        }
      },
    })
    if (prompts.isCancel(packageNameResult)) return cancel()
    packageName = packageNameResult
  }

  let template = argTemplate

  let hasInvalidArgTemplate = false

  if (argTemplate && !TEMPLATES.some((v) => v.name === argTemplate)) {
    hasInvalidArgTemplate = true
  }

  // 4. Choose a framework
  if (!template || hasInvalidArgTemplate) {
    const selectedTemplate = await prompts.select({
      message: chalk.yellowBright(
        hasInvalidArgTemplate
          ? `"${argTemplate}" isn't a valid template. Please choose from below: `
          : 'Select a template:',
      ),
      options: TEMPLATES.map((option) => {
        return {
          label: option.color(option.display || option.name),
          value: option.name,
        }
      }),
    })

    if (prompts.isCancel(selectedTemplate)) return cancel()

    template = selectedTemplate
  }

  const root = path.join(cwd, targetDir)

  try {
    fs.mkdirSync(root, { recursive: true })
  } catch {
    /* empty */
  }

  let templateDir = ''

  switch (template) {
    case 'next-app':
      templateDir = 'nex-ui-nextjs-app'
      break
    case 'next-pages':
      templateDir = 'nex-ui-nextjs-pages'
      break
    case 'vite':
      templateDir = 'nex-ui-vite'
      break
    case 'vite-swc':
      templateDir = 'nex-ui-vite-swc'
      break
  }

  templateDir = path.resolve(import.meta.dirname, './', templateDir)

  const write = (file: string, content?: string) => {
    const targetPath = path.join(root, file)
    if (content) {
      fs.writeFileSync(targetPath, content)
    } else {
      copy(path.join(templateDir, file), targetPath)
    }
  }

  const files = fs.readdirSync(templateDir)

  for (const file of files.filter((f) => f !== 'package.json')) {
    write(file)
  }

  const pkg = JSON.parse(
    fs.readFileSync(path.join(templateDir, `package.json`), 'utf-8'),
  )

  pkg.name = packageName

  write('package.json', JSON.stringify(pkg, null, 2) + '\n')

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)

  const pkgManager = pkgInfo?.name ?? 'npm'

  prompts.outro(
    gradient(['rgb(240, 255, 0)', 'rgb(88, 207, 251)'])(
      `Done. Now run: \n \n cd ${targetDir} \n \n ${pkgManager} install \n \n Get started with ${pkgManager} run dev 🚀`,
    ),
  )

  process.exit(0)
}

type PkgInfo = {
  name: string
  version: string
}

function pkgFromUserAgent(userAgent: string | undefined): PkgInfo | undefined {
  if (!userAgent) return undefined
  const pkgSpec = userAgent.split(' ')[0]
  const pkgSpecArr = pkgSpec.split('/')
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  }
}

function formatTargetDir(dir: string) {
  return dir.trim().replace(/\/+$/g, '')
}

function isEmptyDir(path: string) {
  const files = fs.readdirSync(path)
  return files.length === 0 || (files.length === 1 && files[0] === '.git')
}

function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === '.git') {
      continue
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true })
  }
}

function isValidPackageName(projectName: string) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
    projectName,
  )
}

function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z\d\-~]+/g, '-')
}

function copy(src: string, dest: string) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}

function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}
