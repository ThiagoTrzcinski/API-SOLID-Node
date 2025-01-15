export class MaxNumberOfCheckInsError extends Error {
  constructor() {
    super('You exceeded te number of check ins')
  }
}
