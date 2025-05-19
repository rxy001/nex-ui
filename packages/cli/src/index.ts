/* eslint-disable no-console */
import gradient from 'gradient-string'
import chalk from 'chalk'
import { gte } from 'semver'
import { createCommand } from 'commander'
import { initAction } from './actions'
import pkg from '../package.json'

const VERSION = '20.11.0'

if (!gte(process.version, VERSION)) {
  console.error(
    `NexUI CLI requires Node.js version v${VERSION} or higher, but the installed version is ${process.version}. Please upgrade Node.js to the required version.`,
  )
  process.exit(1)
}

chalk.level = 3
console.log()
console.log(
  gradient(['rgb(69, 104, 220)', 'rgb(176, 106, 179)'])('NexUI CLI 🎉'),
)
console.log()

// prettier-ignore
const helpMessage = `The official CLI for Nex UI
  
Usage: nexui-cli [options] [command]

Options:
  -v, --version                  Output the current version
  -h, --help                     Display help for command

Commands:
  init [project-name] [options]  Initializes a new project

    Options:
      -t, --template <template>  Use a specific template

    Available templates:
      ${chalk.yellow      ('next-app            A Next.js 15 with app directory template pre-configured with NexUI and Emotion.')}
      ${chalk.green       ('next-pages          A Next.js 15 with pages directory template pre-configured with NexUI and Emotion.')}
      ${chalk.cyan        ('vite                A Vite + React template pre-configured with NexUI and Emotion.'    )}
      ${chalk.blue        ('vite-swc            A Vite-SWC + React template pre-configured with NexUI and Emotion.')}

  `

const command = createCommand()

command
  .name('nexui-cli')
  .description('The official CLI for Nex UI')
  .version(pkg.version, '-v, --version', 'Output the current version')
  .helpOption('-h, --help', 'Display help for command')

command
  .command('init')
  .description('Initializes a new project')
  .argument('[project-name]', 'Name of the project to initialize')
  .option('-t, --template [string]', 'Use a specific template')
  .action(initAction)

command.configureHelp({
  formatHelp: () => helpMessage,
})

// command.helpCommand(false)

// command.addHelpText(
//   'after',
//   `

// Example call:
//   $ nexui-cli init
// `,
// )

try {
  command.parse(process.argv)
} catch (error) {
  console.error(error)
}
