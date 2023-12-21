import fs from 'fs'

export interface SaveFileUseCase {
  execute: (options: SaveFileOptions) => boolean
}

export interface SaveFileOptions {
  fileContent: string
  fileDestination?: string
  fileName?: string
}

export class SaveFile implements SaveFileUseCase {
  constructor(
  /**
   * DI - Dependency Injection
   * repository: StorageRepository
   */
  ) {}

  execute({
    fileContent,
    fileName = 'table',
    fileDestination = 'outputs',
  }: SaveFileOptions): boolean {
    try {
      // this could not be here. In place of this, it should be injected as a dependency - StorageRepository
      fs.mkdirSync(fileDestination, { recursive: true })
      fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent)
      return true
    } catch (error) {
      console.error(`Error: ${error}`)
      return false
    }
  }
}
