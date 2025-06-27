import {run} from '@oclif/core'

/**
 * Entry point for the CLI application.
 * 
 * Initializes and runs the oclif CLI. Handles and logs any errors that occur during execution.
 */
async function main() {
  try {
    await run()
  } catch (error) {
    // Log error message if it's an Error instance, otherwise log a generic message
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('An unknown error occurred')
    }
    process.exit(1)
  }
}

main();