import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFound } from './errors/resource-not-found'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

beforeEach(() => {
  usersRepository = new InMemoryUsersRepository()
  sut = new GetUserProfileUseCase(usersRepository)
})

describe('Get User Profile Use case', () => {
  it('should be able to get user profile.', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('John Doe')
  })
  it('should not be able to get user profile with wrong ID.', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        userId: 'Non-existing-ID',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
