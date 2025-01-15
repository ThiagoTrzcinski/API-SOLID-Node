import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

beforeEach(() => {
  gymRepository = new InMemoryGymsRepository()
  sut = new CreateGymUseCase(gymRepository)
})

describe('Create gym Use case', () => {
  it('should be able to create a gym.', async () => {
    const { gym } = await sut.execute({
      title: 'Be more',
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    })
    expect(gym.id).toEqual(expect.any(String))
  })
})
