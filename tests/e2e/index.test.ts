import { beforeAll, describe, expect } from 'vitest'
import Index from '../../src/routes/index.server.js'
import {
  startHydrogenServer,
  type HydrogenServer,
  type HydrogenSession
} from '../utils.js'

describe('index', () => {
  let hydrogen: HydrogenServer
  let session: HydrogenSession

  beforeAll(async () => {
    hydrogen = await startHydrogenServer()
    hydrogen.watchForUpdates(Index)
  })

  beforeEach(async () => {
    session = await hydrogen.newPage()
  })

  afterAll(async () => {
    await hydrogen.cleanUp()
  })

  it('should be a 200 response', async () => {
    const response = await session.visit('/')
    expect(response!.status()).toBe(200)
  })
})
