import { Router } from "express";
import { UsuariosController } from "../controller";
/* import UsuariosMiddleware from "../middlewares/usuarios/UsuariosMiddleware";
import AuthMiddleware from "../middlewares/auth/AuthMiddleware";
import LoginMiddleware from "../middlewares/usuarios/LoginMiddleware"; */

const usuariosRoutes = Router();

usuariosRoutes.get("/usuarios", UsuariosController.findAll);
usuariosRoutes.post("/usuarios", UsuariosController.add);

/* usuariosRoutes.get('/usuarios', AuthMiddleware, UsuariosController.findAll)
usuariosRoutes.get("/usuarios/:id", AuthMiddleware, UsuariosController.getById);
usuariosRoutes.post("/usuarios", AuthMiddleware, UsuariosMiddleware, UsuariosController.add);
usuariosRoutes.post("/usuarios/auth", AuthMiddleware, LoginMiddleware, UsuariosController.auth);
usuariosRoutes.put("/usuarios/:id", AuthMiddleware, UsuariosMiddleware, UsuariosController.update);
usuariosRoutes.delete("/usuarios/:id", AuthMiddleware, UsuariosController.delete); */

export default usuariosRoutes;