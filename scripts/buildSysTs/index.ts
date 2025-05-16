import { build as esbuild } from 'esbuild'
import { cwd as c } from 'node:process'
import path from 'node:path'
import * as vm from 'vm'
import fs from 'node:fs'
import {
  generateAliases,
  generateScales,
  generateTokens,
  generateSelectors,
  generateBreakpoints,
  generateSemanticTokens,
} from './generate'

const log = (message: any) => {
  console.log(`[ generateSysTs ] ${message}`)
}

const cwd = c()

const outDirPath = path.resolve(cwd, './packages/react/src/types/generated')

const entry = path.resolve(cwd, './packages/react/src/theme/preset.ts')

async function readFile(file: string) {
  async function bundleConfigFile() {
    const result = await esbuild({
      platform: 'node',
      format: 'cjs',
      mainFields: ['module', 'main'],
      conditions: ['source'],
      absWorkingDir: cwd,
      entryPoints: [file],
      outfile: 'out.js',
      write: false,
      bundle: true,
      sourcemap: false,
      metafile: true,
    })

    const { text } = result.outputFiles[0]

    return {
      code: text,
      dependencies: result.metafile ? Object.keys(result.metafile.inputs) : [],
    }
  }

  async function loadBundledFile(code: string): Promise<any> {
    const realFileName = await fs.promises.realpath(file)

    // 手动执行代码，类似 _compile 的行为
    const script = new vm.Script(code, { filename: realFileName })
    const moduleExports = {}
    const module = { exports: moduleExports }

    const sandbox = {
      module,
      exports: moduleExports,
      __filename: realFileName,
      __dirname: path.dirname(realFileName),
      process,
      console,
    }

    script.runInNewContext(sandbox)

    const result = module.exports
    return result
  }

  const bundle = await bundleConfigFile()

  const mod = await loadBundledFile(bundle.code)

  return {
    mod: mod.defaultConfig,
    ...bundle,
  }
}

async function writeFile(file: string, content: string) {
  try {
    await fs.promises.writeFile(
      path.join(outDirPath, `${file}.ts`),
      await content,
    )
  } catch (error) {
    console.error(error)
  }
}

async function parallel(tasks: any[]) {
  try {
    const promises = tasks.map(async (task) => {
      log(`Generating ${task.title} types...`)
      await task.task()
      log(`✅ Generated ${task.title} typings`)
    })

    await Promise.all(promises)
  } catch (error) {
    console.error(error)
  }
}

async function builder(sys: any) {
  if (!fs.existsSync(outDirPath)) {
    fs.mkdirSync(outDirPath)
  }

  await parallel([
    {
      title: 'tokens',
      task: async () => {
        writeFile('tokens', await generateTokens(sys))
      },
    },
    {
      title: 'aliases',
      task: async () => {
        writeFile('aliases', await generateAliases(sys))
      },
    },
    {
      title: 'breakpoints',
      task: async () => {
        writeFile('breakpoints', await generateBreakpoints(sys))
      },
    },
    {
      title: 'scales',
      task: async () => {
        writeFile('scales', await generateScales(sys))
      },
    },
    {
      title: 'selectors',
      task: async () => {
        writeFile('selectors', await generateSelectors(sys))
      },
    },
    {
      title: 'semanticTokens',
      task: async () => {
        writeFile('semanticTokens', await generateSemanticTokens(sys))
      },
    },
  ])

  log('🎉 Done!')
}

async function launch() {
  const result = await readFile(entry)

  await builder(result.mod)
}

launch()
