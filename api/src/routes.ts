import { Router } from 'express'
import UsersRoutes from './routes/UsersRoutes'
import PetsRoutes from './routes/PetsRoutes'

const routes = Router()

routes.use(UsersRoutes)
routes.use(PetsRoutes)

export default routes
