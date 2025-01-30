import mongoose from "mongoose";

const AgendaSchema = new mongoose.Schema({
  unidade_saude: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UnidadeSaude",
    required: true,
  },
  funcionario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Funcionario",
    required: true,
  },
  data_dia: {
    type: Date,
    required: true,
  },
  horarios: {
    type: [],
    required: true,
  },
  situacao: {
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

const Agenda = mongoose.model("Agenda", AgendaSchema);

export default Agenda;