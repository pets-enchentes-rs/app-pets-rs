import { Router } from 'express'
import { UsuariosController } from '../controller'
/* import UsuariosMiddleware from "../middlewares/usuarios/UsuariosMiddleware" */

const usuariosRoutes = Router()

usuariosRoutes.get('/usuarios', UsuariosController.findAll)
usuariosRoutes.get('/usuarios/:id', UsuariosController.findById)
usuariosRoutes.post('/usuarios', UsuariosController.add)
usuariosRoutes.put('/usuarios/:id', UsuariosController.update)
usuariosRoutes.delete('/usuarios/:id', UsuariosController.delete)

export default usuariosRoutes
