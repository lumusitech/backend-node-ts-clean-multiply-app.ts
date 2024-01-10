import { ServerApp } from './presentation/server-app'
describe('testing on App.ts', () => {
  it('should call Server.run with values', async () => {
    // Arrange
    const serverRunMock = jest.fn()
    ServerApp.run = serverRunMock

    const base = 5
    const limit = 10
    const showTable = true
    const fileName = 'test-filename'
    const fileDestination = 'test-destination'

    process.argv = [
      'node',
      'app.ts',
      '-b',
      base.toString(),
      '-l',
      limit.toString(),
      showTable ? '-s' : '',
      '-n',
      fileName,
      '-d',
      fileDestination,
    ]

    // Act
    await import('./app')

    // Assert
    expect(ServerApp.run).toHaveBeenCalledTimes(1)
    expect(ServerApp.run).toHaveBeenCalledWith({
      base,
      limit,
      showTable,
      fileName,
      fileDestination,
    })
  })
})
