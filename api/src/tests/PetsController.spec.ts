import { PetsController } from '../controller'
import { PetTransaction } from '../transactions'
import { HttpStatus } from '../enums/HttpStatus'
import { Pet } from '../models'
import { Request, Response } from 'express'
import { PetType } from '../enums/PetType'

jest.mock('../transactions/PetTransaction')

describe('Pets Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should return all registered pets', async () => {
    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      end: jest.fn()
    }

    const mockPets: Pet[] = [
      {
        id: 1,
        type: PetType.CAT,
        image: 'gato.png',
        foundDate: new Date('2024-07-14'),
        foundLocal: 'Lajeado-RS',
        currentLocal: 'Estrela-RS',
        contact: '51988776655',
        idUser: 5
      },
      {
        id: 2,
        type: PetType.DOG,
        image: 'dog.png',
        foundDate: new Date('2024-06-12'),
        foundLocal: 'Encantado-RS',
        currentLocal: 'Encantado-RS',
        contact: '51944332211',
        idUser: 3
      }
    ]

    const mockFunc = PetTransaction.getAll as jest.Mock
    mockFunc.mockResolvedValueOnce(mockPets)

    await PetsController.findAll({} as Request, response as Response)

    expect(mockFunc).toHaveBeenCalledTimes(1)
    expect(response.json).toHaveBeenCalledWith(mockPets)
    expect(response.status).toHaveBeenCalledWith(HttpStatus.OK)
  })

  test('Should return No Content when no pets are found', async () => {
    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn()
    }

    const mockFunc = PetTransaction.getAll as jest.Mock
    mockFunc.mockResolvedValueOnce(null)

    await PetsController.findAll({} as Request, response as Response)

    expect(mockFunc).toHaveBeenCalledTimes(1)
    expect(response.end).toHaveBeenCalled()
    expect(response.status).toHaveBeenCalledWith(HttpStatus.NO_CONTENT)
  })

  test('Should return the Pet with the specific ID', async () => {
    const request: Partial<Request> = {
      params: {
        id: '5'
      }
    }

    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const mockPet: Pet = {
      id: 5,
      type: PetType.BIRD,
      image: 'canario.png',
      foundDate: new Date('2024-07-14'),
      foundLocal: 'Lajeado-RS',
      currentLocal: 'Estrela-RS',
      contact: '51988776655',
      idUser: 3
    }

    const mockFunc = PetTransaction.getById as jest.Mock
    mockFunc.mockResolvedValueOnce(mockPet)

    await PetsController.findById(request as Request, response as Response)

    expect(mockFunc).toHaveBeenCalledTimes(1)
    expect(mockFunc).toHaveBeenCalledWith(5)

    expect(response.json).toHaveBeenCalledWith(mockPet)
    expect(response.status).toHaveBeenLastCalledWith(HttpStatus.OK)
  })

  test('Should return No Content when the specific Pet is not found', async () => {
    const request: Partial<Request> = {
      params: {}
    }

    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn()
    }

    const mockFunc = PetTransaction.getById as jest.Mock
    mockFunc.mockResolvedValueOnce(null)

    await PetsController.findById(request as Request, response as Response)

    expect(mockFunc).toHaveBeenCalledTimes(1)
    expect(response.end).toHaveBeenCalled()
    expect(response.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND)
  })

  test('Should register a Pet successfully', async () => {
    const request: Partial<Request> = {
      body: {
        type: PetType.BIRD,
        image: 'canario.png',
        foundDate: new Date('2024-07-14'),
        foundLocal: 'Lajeado-RS',
        currentLocal: 'Estrela-RS',
        contact: '51988776655',
        idUser: 3
      }
    }

    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const mockPet: Pet = {
      id: 5,
      type: PetType.BIRD,
      image: 'canario.png',
      foundDate: new Date('2024-07-14'),
      foundLocal: 'Lajeado-RS',
      currentLocal: 'Estrela-RS',
      contact: '51988776655',
      idUser: 3
    }

    const mockFunc = PetTransaction.insert as jest.Mock
    mockFunc.mockResolvedValueOnce(5)

    await PetsController.add(request as Request, response as Response)

    expect(mockFunc).toHaveBeenCalledTimes(1)
    expect(mockFunc).toHaveBeenCalledWith(mockPet)

    expect(response.json).toHaveBeenCalledWith(mockPet)
    expect(response.status).toHaveBeenCalledWith(HttpStatus.CREATED)
  })

  test('Should return Internal Server Error if Pet creation fails', async () => {
    const request: Partial<Request> = {
      body: {}
    }

    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn()
    }

    const mockFunc = PetTransaction.insert as jest.Mock
    mockFunc.mockResolvedValueOnce(null)

    await PetsController.add(request as Request, response as Response)

    expect(mockFunc).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(response.end).toHaveBeenCalled()
  })

  test('Should return updated Pet with specific ID', async () => {
    const request: Partial<Request> = {
      params: {
        id: '5'
      },
      body: {
        type: PetType.BIRD,
        image: 'canario.png',
        foundDate: new Date('2024-07-14'),
        foundLocal: 'Lajeado-RS',
        currentLocal: 'Estrela-RS',
        contact: '51988776655',
        idUser: 3
      }
    }

    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const mockPet: Pet = {
      id: 5,
      type: PetType.BIRD,
      image: 'canario.png',
      foundDate: new Date('2024-07-14'),
      foundLocal: 'Lajeado-RS',
      currentLocal: 'Estrela-RS',
      contact: '51988776655',
      idUser: 3
    }

    const mockFunc = PetTransaction.update as jest.Mock
    mockFunc.mockResolvedValue(mockPet)

    await PetsController.update(request as Request, response as Response)

    expect(mockFunc).toHaveBeenCalledTimes(1)
    expect(mockFunc).toHaveBeenCalledWith(5, mockPet)

    expect(response.json).toHaveBeenCalledWith(mockPet)
    expect(response.status).toHaveBeenCalledWith(HttpStatus.OK)
  })

  test('Should return Internal Server Error if Pet update fails', async () => {
    const request: Partial<Request> = {
      params: {},
      body: {}
    }

    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn()
    }

    const mockFunc = PetTransaction.update as jest.Mock
    mockFunc.mockResolvedValue(null)

    await PetsController.update(request as Request, response as Response)

    expect(mockFunc).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(response.end).toHaveBeenCalled()
  })

  test('Should return OK when delete Pet with specific ID', async () => {
    const request: Partial<Request> = {
      params: {
        id: '5'
      }
    }

    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    const mockFunc = PetTransaction.delete as jest.Mock
    mockFunc.mockResolvedValue(1)

    await PetsController.delete(request as Request, response as Response)

    expect(mockFunc).toHaveBeenCalledTimes(1)
    expect(mockFunc).not.toHaveBeenCalledWith(null)

    expect(response.status).toHaveBeenCalledWith(HttpStatus.OK)
    expect(response.json).toHaveBeenCalledWith('Pet deletado com sucesso')
  })

  test('Should return Not Found if there is no Pet with specific ID', async () => {
    const request: Partial<Request> = {
      params: {}
    }

    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn()
    }

    const mockFunc = PetTransaction.delete as jest.Mock
    mockFunc.mockResolvedValue(null)

    await PetsController.delete(request as Request, response as Response)

    expect(mockFunc).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND)
    expect(response.end).toHaveBeenCalled()
  })
})
