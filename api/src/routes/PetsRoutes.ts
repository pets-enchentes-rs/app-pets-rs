import { Router } from 'express'
import { PetsController } from '../controller'
import { ParamsMiddleware, PetsMiddleware } from '../middlewares'

const petRoutes = Router()

petRoutes.get('/pets', PetsController.findAll)
petRoutes.get('/pets/:id', ParamsMiddleware, PetsController.findById)
petRoutes.get('/pets/type/:id', ParamsMiddleware, PetsController.findByType)
petRoutes.get('/pets/user/:id', ParamsMiddleware, PetsController.findByUser)
petRoutes.post('/pets', PetsMiddleware, PetsController.add)
petRoutes.put(
  '/pets/:id',
  ParamsMiddleware,
  PetsMiddleware,
  PetsController.update
)
petRoutes.delete('/pets/:id', ParamsMiddleware, PetsController.delete)

export default petRoutes
