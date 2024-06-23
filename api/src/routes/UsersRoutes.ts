import { Router } from 'express'
import { UsersController } from '../controller'
import { ParamsMiddleware, UsersMiddleware, LoginMiddleware, PasswordMiddleware } from '../middlewares'

const usersRoutes = Router()

usersRoutes.get('/users', UsersController.findAll)
usersRoutes.get('/users/:id', ParamsMiddleware, UsersController.findById)
usersRoutes.post('/users', UsersMiddleware, UsersController.add)
usersRoutes.post('/users/login', LoginMiddleware, UsersController.login)
usersRoutes.put('/users/:id', ParamsMiddleware, UsersMiddleware, UsersController.update)
usersRoutes.put('/users/password/:id', ParamsMiddleware, PasswordMiddleware, UsersController.changePassword)
usersRoutes.delete('/users/:id', ParamsMiddleware, UsersController.delete)

export default usersRoutes
