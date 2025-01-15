import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymUseCase } from './search-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

beforeEach(async () => {
  gymsRepository = new InMemoryGymsRepository()
  sut = new SearchGymUseCase(gymsRepository)
})

describe('Find gyms by query Use case', () => {
  it('should be able to search for gyms.', async () => {
    await gymsRepository.create({
      title: 'Be more',
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    })

    await gymsRepository.create({
      title: 'Coure',
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    })

    const { gyms } = await sut.execute({
      query: 'Be',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Be more' })])
  })
  it('should be able to fetch paginated gym search.', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Be more ${i}`,
        description: null,
        phone: null,
        latitude: 0,
        longitude: 0,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Be',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Be more 21' }),
      expect.objectContaining({ title: 'Be more 22' }),
    ])
  })
})
