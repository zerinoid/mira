import handleNextProjectNumber from '@/lib/nextProjectNumber'
import { describe, expect, it } from 'vitest'

describe('test nextProjectNumber', () => {
  it('should return 1', () => {
    expect(handleNextProjectNumber([3, 4, 5, 6, 7, 8, 9, 10])).toBe('1')
  })

  it('should return 2', () => {
    expect(handleNextProjectNumber([1, 3, 4, 5, 6, 7, 8, 9, 10])).toBe('2')
  })

  it('should return 8', () => {
    expect(handleNextProjectNumber([1, 2, 3, 4, 5, 6, 7])).toBe('8')
  })

  it('should return 1 for empty array', () => {
    expect(handleNextProjectNumber([])).toBe('1')
  })
})
