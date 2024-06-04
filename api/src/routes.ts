import { Router } from 'express'
import UsuariosRoutes from './routes/UsuariosRoutes'
import PetsRoutes from './routes/PetsRoutes'

const routes = Router()

routes.use(UsuariosRoutes)
routes.use(PetsRoutes)

export default routes
