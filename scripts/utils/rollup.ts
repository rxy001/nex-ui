import { rollup as r } from 'rollup'

import type { RollupOptions, RollupBuild } from 'rollup'

export async function rollup(config: RollupOptions) {
  let bundle: RollupBuild
  try {
    bundle = await r(config)

    const output = Array.isArray(config.output)
      ? config.output
      : [config.output]

    await Promise.all(output.map((o) => bundle.write(o!)))
  } catch (error: any) {
    throw new Error(error)
  }

  if (bundle) {
    await bundle.close()
  }
}
