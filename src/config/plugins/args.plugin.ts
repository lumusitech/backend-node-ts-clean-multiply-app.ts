import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

export const yarg = yargs(hideBin(process.argv))
  .option('b', {
    alias: 'base',
    type: 'number',
    description: 'multiplication table base',
    demandOption: true,
  })
  .option('l', {
    alias: 'limit',
    type: 'number',
    description: 'multiplication table limit',
    default: 10,
  })
  .option('s', {
    alias: 'show',
    type: 'boolean',
    description: 'show multiplication table',
    default: false,
  })
  .options('n', {
    alias: 'name',
    type: 'string',
    default: 'multiplication-table',
    describe: 'File name',
  })
  .options('d', {
    alias: 'destination',
    type: 'string',
    default: 'outputs',
    describe: 'File destination',
  })
  .check(({ b, l }) => {
    if (b <= 0 || l <= 0) throw 'Error: base and limit must be greater than 0'

    return true
  })
  .parseSync()
