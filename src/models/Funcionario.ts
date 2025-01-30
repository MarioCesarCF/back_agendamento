import bcrypt from "bcrypt";
import mongoose from "mongoose";

const FuncionarioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    required: true,
  },
  realiza_consulta: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Funcionario"
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Funcionario"
  }
});

FuncionarioSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Funcionario = mongoose.model("Funcionario", FuncionarioSchema);

export default Funcionario;