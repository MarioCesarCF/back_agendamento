import mongoose from "mongoose";

const UnidadeSaudeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  funcionarios: {
    type: [],
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

const UnidadeSaude = mongoose.model("UnidadeSaude", UnidadeSaudeSchema);

export default UnidadeSaude;