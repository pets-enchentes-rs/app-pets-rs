import { Router } from "express";
import UsuariosRoutes from "./routes/UsuarioRoutes";

const routes = Router();

routes.use(UsuariosRoutes)

export default routes;