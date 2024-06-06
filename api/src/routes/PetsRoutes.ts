import { Router } from 'express'
import { PetsController } from '../controller'
/* import PetsMiddleware from "../middlewares/PetsMiddleware" */

const petRoutes = Router()

petRoutes.get('/pets', PetsController.findAll)
petRoutes.get('/pets/:id', PetsController.findById)
petRoutes.get('/pets/categoria/:id', PetsController.findByCategoria)
petRoutes.post('/pets', PetsController.add)
petRoutes.put('/pets/:id', PetsController.update)
petRoutes.delete('/pets/:id', PetsController.delete)

export default petRoutes
