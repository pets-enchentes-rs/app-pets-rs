import { UsersController } from '../controller'
import { HttpStatus } from '../enums/HttpStatus'
import { User } from '../models'
import { UserTransaction } from '../transactions'
import { Request, Response } from 'express'

jest.mock('../transactions/UserTransaction.ts')

describe('Users Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should return all users registered', async () => {
    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      end: jest.fn()
    }

    const mockUsers: User[] = [
      {
        id: 1,
        name: 'Fernando',
        email: 'fernando@email.com',
        phone: '51988887777',
        password: 'teste123'
      },
      {
        id: 2,
        name: 'Evelyn',
        email: 'evelyn@email.com',
        phone: '51977776666',
        password: 'teste321'
      }
    ]

    const mock = UserTransaction.getAll as jest.Mock
    mock.mockResolvedValueOnce(mockUsers)

    await UsersController.findAll({} as Request, response as Response)

    expect(UserTransaction.getAll).toHaveBeenCalledTimes(1)
    expect(response.json).toHaveBeenCalledWith(mockUsers)
    expect(response.status).toHaveBeenCalledWith(HttpStatus.OK)
  })

  test('Should return No Content when no users are found', async () => {
    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn()
    }

    const mock = UserTransaction.getAll as jest.Mock
    mock.mockResolvedValueOnce(null)

    await UsersController.findAll({} as Request, response as Response)

    expect(UserTransaction.getAll).toHaveBeenCalledTimes(1)
    expect(response.end).toHaveBeenCalled()
    expect(response.status).toHaveBeenCalledWith(HttpStatus.NO_CONTENT)
  })

  test('Should return the user with the specific ID', async () => {
    const request: Partial<Request> = {
      params: {
        id: '1'
      }
    }

    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const mockUser: User = {
      id: 1,
      name: 'Fernando',
      email: 'email@teste.com',
      image: 'foto',
      phone: '51999887766',
      password: 'teste123'
    }

    const mock = UserTransaction.getById as jest.Mock
    mock.mockResolvedValueOnce(mockUser)

    await UsersController.findById(request as Request, response as Response)

    expect(UserTransaction.getById).toHaveBeenCalledTimes(1)
    expect(response.json).toHaveBeenCalledWith(mockUser)
    expect(response.status).toHaveBeenLastCalledWith(HttpStatus.OK)
  })

  test('Should return No Content when the specific user is not found', async () => {
    const request: Partial<Request> = {
      params: {
        id: ''
      }
    }

    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn()
    }

    const mock = UserTransaction.getById as jest.Mock
    mock.mockResolvedValueOnce(null)

    await UsersController.findById(request as Request, response as Response)

    expect(UserTransaction.getById).toHaveBeenCalledTimes(1)
    expect(response.end).toHaveBeenCalled()
    expect(response.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND)
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
      json: jest.fn()
    }

    const mockUser: User = {
      id: 1,
      name: 'Fernando',
      email: 'email@teste.com',
      image: 'foto',
      phone: '51999887766',
      password: 'teste123'
    }

    const mock = UserTransaction.insert as jest.Mock
    mock.mockResolvedValueOnce(1)

    await UsersController.add(request as Request, response as Response)

    expect(UserTransaction.insert).toHaveBeenCalledTimes(1)
    expect(UserTransaction.insert).toHaveBeenCalledWith(mockUser)

    expect(response.json).toHaveBeenCalledWith(mockUser)
    expect(response.status).toHaveBeenCalledWith(HttpStatus.CREATED)
  })

  test('Should return Internal Server Error if user creation fails', async () => {
    const request: Partial<Request> = {
      body: {}
    }

    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn()
    }

    const mockInsert = UserTransaction.insert as jest.Mock
    mockInsert.mockResolvedValueOnce(null)

    await UsersController.add(request as Request, response as Response)

    expect(UserTransaction.insert).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(response.end).toHaveBeenCalled()
  })

  test('Should return user with specific email and password', async () => {
    const request: Partial<Request> = {
      body: {
        email: 'email@teste.com',
        password: 'teste123'
      }
    }

    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const mockUser: User = {
      id: 1,
      name: 'Fernando',
      email: 'email@teste.com',
      image: 'foto',
      phone: '51999887766',
      password: 'teste123'
    }

    const mock = UserTransaction.getByLogin as jest.Mock
    mock.mockResolvedValue(mockUser)

    await UsersController.login(request as Request, response as Response)

    expect(UserTransaction.getByLogin).toHaveBeenCalledTimes(1)
    expect(UserTransaction.getByLogin).toHaveBeenCalledWith('email@teste.com', 'teste123')

    expect(response.json).toHaveBeenCalledWith(mockUser)
    expect(response.status).toHaveBeenCalledWith(HttpStatus.OK)
  })

  test('Should return Not Found when there is no user with specific login', async () => {
    const request: Partial<Request> = {
      body: {}
    }

    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn()
    }

    const mock = UserTransaction.getByLogin as jest.Mock
    mock.mockResolvedValue(null)

    await UsersController.login(request as Request, response as Response)

    expect(UserTransaction.getByLogin).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND)
    expect(response.end).toHaveBeenCalled()
  })

  test('Should return updated user with specific ID', async () => {
    const request: Partial<Request> = {
      params: {
        id: '1'
      },
      body: {
        name: 'Fernando',
        email: 'novo_email@teste.com',
        image: 'foto1',
        phone: '51999887766'
      }
    }

    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const mockUser: Partial<User> = {
      id: 1,
      name: 'Fernando',
      email: 'novo_email@teste.com',
      image: 'foto1',
      phone: '51999887766'
    }

    const mock = UserTransaction.update as jest.Mock
    mock.mockResolvedValue(mockUser)

    await UsersController.update(request as Request, response as Response)

    expect(UserTransaction.update).toHaveBeenCalledTimes(1)
    expect(UserTransaction.update).toHaveBeenCalledWith(mockUser.id, mockUser)

    expect(response.json).toHaveBeenCalledWith(mockUser)
    expect(response.status).toHaveBeenCalledWith(HttpStatus.OK)
  })

  test('Should return Internal Server Error if user update fails', async () => {
    const request: Partial<Request> = {
      params: {},
      body: {}
    }

    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn()
    }

    const mock = UserTransaction.update as jest.Mock
    mock.mockResolvedValue(null)

    await UsersController.update(request as Request, response as Response)

    expect(UserTransaction.update).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(response.end).toHaveBeenCalled()
  })
})
