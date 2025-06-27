import {run} from '@oclif/core'

async function main() {
  try {
    await run()
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('An unknown error occurred')
    }
    process.exit(1)
  }
}

main();