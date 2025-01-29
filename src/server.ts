import "dotenv/config";
import express from "express";
import connection from "./config/dbConfig";
import cors from "cors";
import { router } from "./routes/index";

const app = express();
app.use(cors());
connection();
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 27017;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});