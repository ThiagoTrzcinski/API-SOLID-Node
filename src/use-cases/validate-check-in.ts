import { CheckInsRepository } from '@/repositories/check-ins-repository'

import { ResourceNotFound } from './errors/resource-not-found'
import { CheckIn } from '@prisma/client'
import dayjs from 'dayjs'
import { ExpiredCheckInError } from './errors/expired-check-in'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFound()
    }

    const differenceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (differenceInMinutesFromCheckInCreation > 20) {
      throw new ExpiredCheckInError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
