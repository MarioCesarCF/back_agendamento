import { Router } from "express";

const router = Router();

import funcionarioRoute from "./funcionario.route";
import unidadeSaudeRoute from "./unidade_saude.route";
import agendaRoute from "./agenda.route";

router.use("/funcionario", funcionarioRoute);
router.use("/unidade_saude", unidadeSaudeRoute);
router.use("/agenda", agendaRoute);

export { router };

