import "dotenv/config";
import mongoose from "mongoose";

const connection = async () => {
  const uri = process.env.DATABASE_URL || '';
    
  mongoose.set("strictQuery", true);

  mongoose.connect(uri, {});

  const db = mongoose.connection;

  db.on("error", () => {
    console.log("Erro de conexão.");
  });

  db.on("open", () => {
    console.log("Sucesso de conexão.");
  });
};

export default connection;
