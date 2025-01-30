import { Router } from "express";
import AgendaController from "../controller/agenda.controller";

const route = Router();

const agendaController = new AgendaController();

route.get("/", agendaController.getAll);
route.post("/", agendaController.create);
route.get("/:id", agendaController.findById);
route.patch("/:id", agendaController.update);
route.delete("/:id", agendaController.delete);

export default route;