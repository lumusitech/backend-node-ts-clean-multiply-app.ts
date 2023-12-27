import fs from 'fs'
import { SaveFile } from './save-file.use-case'

describe('SaveFileUseCase', () => {
  const customOptions = {
    fileContent: 'custom-content',
    fileName: 'custom-table-name',
    fileDestination: 'custom-outputs',
  }

  const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`

  afterEach(() => {
    // clean up
    const outputFolderExists = fs.existsSync('outputs')
    if (outputFolderExists) fs.rmSync('outputs', { recursive: true, force: true })

    const customFolderExists = fs.existsSync(customOptions.fileDestination)
    if (customFolderExists)
      fs.rmSync(customOptions.fileDestination, { recursive: true, force: true })
  })

  it('should save a file with default options', () => {
    // Arrange
    const saveFile = new SaveFile()
    const filePath = 'outputs/table.txt'
    const options = { fileContent: 'test Content' }

    // Act
    const result = saveFile.execute(options)
    const fileExists = fs.existsSync(filePath)
    const fileContent = fs.readFileSync(filePath, 'utf8')

    // Assert
    expect(result).toBeTruthy()
    expect(fileExists).toBeTruthy()
    expect(fileContent).toBe(options.fileContent)
  })

  it('should save a file with custom options', () => {
    // Arrange
    const saveFile = new SaveFile()

    // Act
    const result = saveFile.execute(customOptions)
    const fileExists = fs.existsSync(customFilePath)
    const fileContent = fs.readFileSync(customFilePath, 'utf8')

    // Assert
    expect(result).toBeTruthy()
    expect(fileExists).toBeTruthy()
    expect(fileContent).toBe(customOptions.fileContent)
  })

  it('should return false if directory could not be created', () => {
    const saveFile = new SaveFile()
    const options = { fileContent: 'test Content' }
    const mkdirSyncSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
      throw new Error('This is a custom error message from testing')
    })

    const result = saveFile.execute(options)
    expect(result).toBeFalsy()

    mkdirSyncSpy
  })

  it('should return false if file could not be created', () => {
    const saveFile = new SaveFile()
    const options = { fileContent: 'test Content' }
    const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
      throw new Error('This is a custom error message from testing')
    })

    const result = saveFile.execute(options)
    expect(result).toBeFalsy()

    writeFileSyncSpy.mockRestore()
  })
})
