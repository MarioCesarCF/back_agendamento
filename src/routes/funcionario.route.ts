import { Router } from "express";
import FuncionarioController from "../controller/funcionario.controller";

const route = Router();

const funcionarioController = new FuncionarioController();

route.get("/", funcionarioController.obterTodos);
route.post("/", funcionarioController.criar);
route.get("/:id", funcionarioController.obterPorId);
route.patch("/:id", funcionarioController.atualizar);
route.delete("/:id", funcionarioController.deletar);

export default route;