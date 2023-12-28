import { Server } from 'http'
import { CreateTable } from '../domain/use-cases/create-table.use-case'
import { SaveFile } from '../domain/use-cases/save-file.use-case'
import { ServerApp } from './server-app'
describe('ServerApp', () => {
  const options = {
    base: 2,
    limit: 10,
    showTable: false,
    fileName: 'test-filename',
    fileDestination: 'test-destination',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create server app instance and has a static run method', () => {
    const server = new ServerApp()

    expect(server).toBeInstanceOf(ServerApp)
    expect(typeof ServerApp.run).toBe('function')
  })

  it('should run server app - integration test', () => {
    // // Integration test - run original method and create folders
    // // Arrange
    // const logSpy = jest.spyOn(console, 'log')
    // const createTableSpy = jest
    //   .spyOn(CreateTable.prototype, 'execute')
    //   .mockReturnValue('test table')
    // const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute')
    // // Act
    // ServerApp.run(options)
    // // Assert
    // expect(logSpy).toHaveBeenCalledTimes(2)
    // expect(logSpy).toHaveBeenCalledWith('Running server app...')
    // expect(logSpy).toHaveBeenLastCalledWith('File created')
    // expect(createTableSpy).toHaveBeenCalledTimes(1)
    // expect(createTableSpy).toHaveBeenCalledWith({
    //   base: options.base,
    //   limit: options.limit,
    // })
    // expect(saveFileSpy).toHaveBeenCalledTimes(1)
    // expect(saveFileSpy).toHaveBeenCalledWith({
    //   fileContent: createTableSpy.mock.results[0].value,
    //   fileName: options.fileName,
    //   fileDestination: options.fileDestination,
    // })
  })

  it('should run server app with options', () => {
    const logMock = jest.fn()
    const logErrorMock = jest.fn()
    const fakeTable = '1 x 2 = 2'
    const createTableMock = jest.fn().mockReturnValue(fakeTable)
    const savefileMock = jest.fn().mockReturnValue(true)

    console.log = logMock
    console.error = logErrorMock
    CreateTable.prototype.execute = createTableMock
    SaveFile.prototype.execute = savefileMock

    ServerApp.run(options)

    expect(logMock).toHaveBeenCalledWith('Running server app...')
    expect(createTableMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    })
    expect(savefileMock).toHaveBeenCalledWith({
      fileContent: fakeTable,
      fileName: options.fileName,
      fileDestination: options.fileDestination,
    })
    expect(logMock).toHaveBeenCalledWith('File created')
    expect(logErrorMock).not.toHaveBeenCalled()
  })
})
