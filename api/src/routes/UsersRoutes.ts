import { Router } from 'express'
import { UsersController } from '../controller'
/* import UsuariosMiddleware from "../middlewares/UsuariosMiddleware" */

const usersRoutes = Router()

usersRoutes.get('/users', UsersController.findAll)
usersRoutes.get('/users/:id', UsersController.findById)
usersRoutes.post('/users', UsersController.add)
usersRoutes.put('/users/:id', UsersController.update)
usersRoutes.delete('/users/:id', UsersController.delete)

export default usersRoutes
