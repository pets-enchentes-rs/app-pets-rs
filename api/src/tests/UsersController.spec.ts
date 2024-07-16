import { UsersController } from '../controller'
import { HttpStatus } from '../enums/HttpStatus'
import { User } from '../models'
import { UserTransaction } from '../transactions'
import { Request, Response } from 'express'

jest.mock('../transactions/UserTransaction')

describe('Users Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should return all registered Users', async () => {
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
        image: 'photo.png',
        phone: '51988887777',
        password: 'teste123'
      },
      {
        id: 2,
        name: 'Evelyn',
        email: 'evelyn@email.com',
        image: 'photo.png',
        phone: '51977776666',
        password: 'teste321'
      }
    ]

    const mockFunc = UserTransaction.getAll as jest.Mock
    mockFunc.mockResolvedValueOnce(mockUsers)

    await UsersController.findAll({} as Request, response as Response)

    expect(mockFunc).toHaveBeenCalledTimes(1)
    expect(response.json).toHaveBeenCalledWith(mockUsers)
    expect(response.status).toHaveBeenCalledWith(HttpStatus.OK)
  })

  test('Should return No Content when no Users are found', async () => {
    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn()
    }

    const mockFunc = UserTransaction.getAll as jest.Mock
    mockFunc.mockResolvedValueOnce(null)

    await UsersController.findAll({} as Request, response as Response)

    expect(mockFunc).toHaveBeenCalledTimes(1)
    expect(response.end).toHaveBeenCalled()
    expect(response.status).toHaveBeenCalledWith(HttpStatus.NO_CONTENT)
  })

  test('Should return the User with the specific ID', async () => {
    const request: Partial<Request> = {
      params: {
        id: '5'
      }
    }

    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const mockUser: User = {
      id: 5,
      name: 'Fernando',
      email: 'email@teste.com',
      image: 'photo.png',
      phone: '51999887766',
      password: 'teste123'
    }

    const mockFunc = UserTransaction.getById as jest.Mock
    mockFunc.mockResolvedValueOnce(mockUser)

    await UsersController.findById(request as Request, response as Response)

    expect(mockFunc).toHaveBeenCalledTimes(1)
    expect(mockFunc).toHaveBeenCalledWith(5)

    expect(response.json).toHaveBeenCalledWith(mockUser)
    expect(response.status).toHaveBeenLastCalledWith(HttpStatus.OK)
  })

  test('Should return No Content when the specific User is not found', async () => {
    const request: Partial<Request> = {
      params: {}
    }

    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn()
    }

    const mockFunc = UserTransaction.getById as jest.Mock
    mockFunc.mockResolvedValueOnce(null)

    await UsersController.findById(request as Request, response as Response)

    expect(mockFunc).toHaveBeenCalledTimes(1)
    expect(response.end).toHaveBeenCalled()
    expect(response.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND)
  })

  test('Should register a User successfully', async () => {
    const request: Partial<Request> = {
      body: {
        name: 'Fernando',
        email: 'email@teste.com',
        image: 'photo.png',
        phone: '51999887766',
        password: 'teste123'
      }
    }

    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const mockUser: User = {
      id: 5,
      name: 'Fernando',
      email: 'email@teste.com',
      image: 'photo.png',
      phone: '51999887766',
      password: 'teste123'
    }

    const mockFunc = UserTransaction.insert as jest.Mock
    mockFunc.mockResolvedValueOnce(5)

    await UsersController.add(request as Request, response as Response)

    expect(mockFunc).toHaveBeenCalledTimes(1)
    expect(mockFunc).toHaveBeenCalledWith(mockUser)

    expect(response.json).toHaveBeenCalledWith(mockUser)
    expect(response.status).toHaveBeenCalledWith(HttpStatus.CREATED)
  })

  test('Should return Internal Server Error if User creation fails', async () => {
    const request: Partial<Request> = {
      body: {}
    }

    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn()
    }

    const mockFunc = UserTransaction.insert as jest.Mock
    mockFunc.mockResolvedValueOnce(null)

    await UsersController.add(request as Request, response as Response)

    expect(mockFunc).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(response.end).toHaveBeenCalled()
  })

  test('Should return User with specific email and password', async () => {
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

    const mockUser = { email: 'email@teste.com', password: 'teste123' } as User

    const mockFunc = UserTransaction.getByLogin as jest.Mock
    mockFunc.mockResolvedValue(mockUser)

    await UsersController.login(request as Request, response as Response)

    expect(mockFunc).toHaveBeenCalledTimes(1)
    expect(mockFunc).toHaveBeenCalledWith('email@teste.com', 'teste123')

    expect(response.json).toHaveBeenCalledWith(mockUser)
    expect(response.status).toHaveBeenCalledWith(HttpStatus.OK)
  })

  test('Should return Not Found when there is no User with specific login', async () => {
    const request: Partial<Request> = {
      body: {}
    }

    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn()
    }

    const mockFunc = UserTransaction.getByLogin as jest.Mock
    mockFunc.mockResolvedValue(null)

    await UsersController.login(request as Request, response as Response)

    expect(mockFunc).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND)
    expect(response.end).toHaveBeenCalled()
  })

  test('Should return updated User with specific ID', async () => {
    const request: Partial<Request> = {
      params: {
        id: '5'
      },
      body: {
        name: 'Fernando',
        email: 'novo_email@teste.com',
        image: 'photo1.png',
        phone: '51999887766'
      }
    }

    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const mockUser: Partial<User> = {
      id: 5,
      name: 'Fernando',
      email: 'novo_email@teste.com',
      image: 'photo1.png',
      phone: '51999887766'
    }

    const mockFunc = UserTransaction.update as jest.Mock
    mockFunc.mockResolvedValue(mockUser)

    await UsersController.update(request as Request, response as Response)

    expect(mockFunc).toHaveBeenCalledTimes(1)
    expect(mockFunc).toHaveBeenCalledWith(5, mockUser)

    expect(response.json).toHaveBeenCalledWith(mockUser)
    expect(response.status).toHaveBeenCalledWith(HttpStatus.OK)
  })

  test('Should return Internal Server Error if User update fails', async () => {
    const request: Partial<Request> = {
      params: {},
      body: {}
    }

    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn()
    }

    const mockFunc = UserTransaction.update as jest.Mock
    mockFunc.mockResolvedValue(null)

    await UsersController.update(request as Request, response as Response)

    expect(mockFunc).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(response.end).toHaveBeenCalled()
  })

  test('Should return User with new password', async () => {
    const request: Partial<Request> = {
      params: {
        id: '5'
      },
      body: {
        newPass: 'newPassword'
      }
    }

    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const mockUser: Partial<User> = { id: 5, password: 'oldPassword' }

    const mockGetById = UserTransaction.getById as jest.Mock
    mockGetById.mockResolvedValue(mockUser)

    const mockChangePass = UserTransaction.changePassword as jest.Mock
    mockChangePass.mockResolvedValue(1)

    await UsersController.changePassword(request as Request, response as Response)

    expect(mockGetById).toHaveBeenCalledTimes(1)
    expect(mockGetById).toHaveBeenCalledWith(mockUser.id)

    expect(mockChangePass).toHaveBeenCalledTimes(1)
    expect(mockChangePass).toHaveBeenCalledWith(mockUser.id, request.body.newPass)

    expect(mockUser.password).toBe(request.body.newPass)

    expect(response.status).toHaveBeenCalledWith(HttpStatus.OK)
    expect(response.json).toHaveBeenCalledWith(mockUser)
  })

  test('Should return Internal Server Error when User isnt found or Change Password doesnt work', async () => {
    const request: Partial<Request> = {
      params: {},
      body: {}
    }

    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn()
    }

    const mockGetById = UserTransaction.getById as jest.Mock
    mockGetById.mockResolvedValue(null)

    const mockChangePass = UserTransaction.changePassword as jest.Mock
    mockChangePass.mockResolvedValue(null)

    await UsersController.changePassword(request as Request, response as Response)

    expect(mockGetById).toHaveBeenCalledTimes(1)
    expect(mockChangePass).toHaveBeenCalledTimes(1)

    expect(response.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(response.end).toHaveBeenCalled()
  })

  test('Should return OK when delete User with specific ID', async () => {
    const request: Partial<Request> = {
      params: {
        id: '5'
      }
    }

    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const mockFunc = UserTransaction.delete as jest.Mock
    mockFunc.mockResolvedValue(1)

    await UsersController.delete(request as Request, response as Response)

    expect(mockFunc).toHaveBeenCalledTimes(1)
    expect(mockFunc).not.toHaveBeenCalledWith(null)

    expect(response.status).toHaveBeenCalledWith(HttpStatus.OK)
    expect(response.json).toHaveBeenCalledWith('Usuário deletado com sucesso')
  })

  test('Should return Not Found if there is no User with specific ID', async () => {
    const request: Partial<Request> = {
      params: {}
    }

    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn()
    }

    const mockFunc = UserTransaction.delete as jest.Mock
    mockFunc.mockResolvedValue(null)

    await UsersController.delete(request as Request, response as Response)

    expect(mockFunc).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND)
    expect(response.end).toHaveBeenCalled()
  })
})
