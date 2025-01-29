import { Router } from "express";
import FuncionarioController from "../controller/funcionario.controller";

const route = Router();

const funcionarioController = new FuncionarioController();

route.get("/", funcionarioController.findAll);
route.post("/", funcionarioController.create);
route.get("/:id", funcionarioController.findById);
route.patch("/:id", funcionarioController.update);
route.delete("/:id", funcionarioController.delete);

export default route;