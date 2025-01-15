export class ExpiredCheckInError extends Error {
  constructor() {
    super('This check-in has already expired.')
  }
}
