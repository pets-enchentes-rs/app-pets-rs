import { UsersController } from '../controller'
import { HttpStatus } from '../enums/HttpStatus'
import { UserTransaction } from '../transactions'
import { Request, Response } from 'express'

jest.mock('../transactions/UserTransaction.ts')

describe('Users Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should register a User successfully', async () => {
    const request: Partial<Request> = {
      body: {
        name: 'Fernando',
        email: 'email@teste.com',
        image: 'foto',
        phone: '51999887766',
        password: 'teste123'
      }
    }

    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      end: jest.fn()
    }

    // Mock the UserTransaction.insert method to resolve with an id
    ;(UserTransaction.insert as jest.Mock).mockResolvedValueOnce(1)

    await UsersController.add(request as Request, response as Response)

    const returnUser = {
      id: 1,
      name: 'Fernando',
      email: 'email@teste.com',
      image: 'foto',
      phone: '51999887766',
      password: 'teste123'
    }

    expect(UserTransaction.insert).toHaveBeenCalledTimes(1)
    expect(UserTransaction.insert).toHaveBeenCalledWith(returnUser)

    expect(response.json).toHaveBeenCalledWith(returnUser)
    expect(response.status).toHaveBeenCalledWith(HttpStatus.CREATED)
  })

  test('Should return internal server error if user creation fails', async () => {
    const request: Partial<Request> = {
      body: {
        name: 'Fernando',
        email: 'email@teste.com',
        image: 'foto',
        phone: '51999887766',
        password: 'teste123'
      }
    }

    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      end: jest.fn()
    }

    const mockInsert = UserTransaction.insert as jest.Mock
    mockInsert.mockRejectedValue(new Error('Mocking exception'))

    try {
      await UsersController.add(request as Request, response as Response)
    } catch (error) {
      // Must return error
    }

    expect(UserTransaction.insert).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(response.end).toHaveBeenCalled()
  })
})
