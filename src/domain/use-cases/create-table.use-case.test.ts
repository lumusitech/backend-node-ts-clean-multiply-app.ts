import { notDeepEqual } from 'assert'
import { CreateTable } from './create-table.use-case'

describe('CreateTableUseCase', () => {
  it('should create a multiplication table with default limit', () => {
    const defaultOptions = { base: 2 }
    const createTable = new CreateTable()
    const table = createTable.execute(defaultOptions)
    const rows = table.split('\n').length

    expect(createTable).toBeInstanceOf(CreateTable)
    expect(table).toContain('2 x 1 = 2')
    expect(table).toContain('2 x 10 = 20')
    expect(rows).toBe(10)
  })

  it('should create a multiplication table with custom limit 5', () => {
    const customOptions = { base: 5, limit: 5 }
    const table = new CreateTable().execute(customOptions)
    const rows = table.split('\n').length

    expect(typeof table).toBe('string')
    expect(table).toContain('5 x 5 = 25')
    expect(table).not.toContain('5 x 6 = 30')
    expect(rows).toBe(customOptions.limit)
  })
})
