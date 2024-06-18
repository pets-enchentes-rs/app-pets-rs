import { Router } from 'express'
import { UsersController } from '../controller'
import { ParamsMiddleware, UsersMiddleware, LoginMiddleware } from '../middlewares'

const usersRoutes = Router()

usersRoutes.get('/users', UsersController.findAll)
usersRoutes.get('/users/:id', ParamsMiddleware, UsersController.findById)
usersRoutes.post('/users', UsersMiddleware, UsersController.add)
usersRoutes.post('/users/login', LoginMiddleware, UsersController.login)
usersRoutes.put('/users/:id', ParamsMiddleware, UsersMiddleware, UsersController.update)
usersRoutes.delete('/users/:id', ParamsMiddleware, UsersController.delete)

export default usersRoutes
