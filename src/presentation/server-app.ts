import { CreateTable } from '../domain/use-cases/create-table.use-case'
import { SaveFile } from '../domain/use-cases/save-file.use-case'

interface RunOptions {
  base: number
  limit: number
  showTable: boolean
  fileName?: string
  fileDestination?: string
}

export class ServerApp {
  static async run({ base, limit, showTable, fileName, fileDestination }: RunOptions) {
    console.log('🚀 Running server app...\n')

    const table = new CreateTable().execute({ base, limit })

    const wasCreated = new SaveFile().execute({
      fileContent: table,
      fileName,
      fileDestination,
    })

    if (showTable) console.log(table)

    wasCreated ? console.log('\nFile created') : console.error('File not created')
  }
}
