import { Router } from "express";

const router = Router();

import funcionarioRoute from "./funcionario.route";

router.use("/funcionario", funcionarioRoute);

export { router };

