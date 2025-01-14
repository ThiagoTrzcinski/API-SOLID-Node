export class ResourceNotFound extends Error {
  constructor() {
    super('Resource was not found')
  }
}
