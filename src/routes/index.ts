import { Router } from "express";

const router = Router();

import funcionarioRoute from "./funcionario.route";

router.get("/", (req, res) => {
  res.send("API com TypeScript e Express!");
});
router.use("/funcionario", funcionarioRoute);

export { router };
