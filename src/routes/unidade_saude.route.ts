import { Router } from "express";
import UnidadeSaudeController from "../controller/unidade_saude.controller";

const route = Router();

const unidadeSaudeController = new UnidadeSaudeController();

route.get("/", unidadeSaudeController.getAll);
route.post("/", unidadeSaudeController.create);
route.get("/:id", unidadeSaudeController.findById);
route.patch("/:id", unidadeSaudeController.update);
route.delete("/:id", unidadeSaudeController.delete);

export default route;