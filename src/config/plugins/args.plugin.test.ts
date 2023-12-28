const originalArgv = process.argv

const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args]

  const { yarg } = await import('./args.plugin')

  return yarg
}

describe('ArgsPlugin', () => {
  beforeEach(() => {
    process.argv = originalArgv
    jest.resetModules()
  })

  it('should return default values', async () => {
    const yarg = await runCommand(['-b', '5'])
    // console.log(yarg)

    expect(yarg).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: 'multiplication-table',
        d: 'outputs',
      }),
    )
  })

  it('should return configuration with custom values', async () => {
    const customOptions = ['-b', '5', '-l', '20', '-s', '-n', 'my-table', '-d', 'my-folder']
    const yarg = await runCommand(customOptions)

    expect(yarg).toEqual(
      expect.objectContaining({
        b: 5,
        l: 20,
        s: true,
        n: 'my-table',
        d: 'my-folder',
      }),
    )
  })
})
