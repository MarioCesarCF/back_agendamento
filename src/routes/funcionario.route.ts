import { Router } from "express";
import FuncionarioController from "../controller/funcionario.controller";

const route = Router();

const funcionarioController = new FuncionarioController();

route.get("/", funcionarioController.findAll);
route.post("/", funcionarioController.create);

export default route;