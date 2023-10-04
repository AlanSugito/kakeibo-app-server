import { describe, expect, it } from '@jest/globals'
import { APIError } from '../utils'

describe("API error instance", () => {
  const error = new APIError(404, "Test error")

  it("should have message property", () => {
    expect(error).toHaveProperty("message")
    expect(error.message).toBeDefined()
    expect(error.message).not.toBeNull()
    expect(error.message).toBe("Test error")
  })

  it("should have status property", () => {
    expect(error).toHaveProperty("status")
    expect(error.status).toBeDefined()
    expect(error.status).not.toBeNull()
    expect(error.status).toBe(404)
  })
})

