import mongoose from "mongoose";

const AgendaSchema = new mongoose.Schema({
  unidade_saude: {
    type: {},
    ref: "UnidadeSaude",
    required: true,
  },
  funcionario: {
    type: {},
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
  disponivel: {
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