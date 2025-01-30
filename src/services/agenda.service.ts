import AgendaRepository from "../repositories/agenda.repository";
import UnidadeSaudeService from "./unidade_saude.service";

const agendaRepository = new AgendaRepository();
const unidadeSaudeService = new UnidadeSaudeService();

class AgendaService {
  create = async (body: any) => {
    const { unidade_saude, funcionario, data_dia, horarios } = body;

    if (!unidade_saude || !funcionario || !data_dia || !horarios)
      throw new Error("Preencha todos os campos obrigatórios ao registro.");

    if(unidade_saude && funcionario) {
      const unidadeSaudeEncontrada = await unidadeSaudeService.findById(unidade_saude.id);
      if(!unidadeSaudeEncontrada.funcionarios.includes(funcionario.id)) {
        throw new Error("O funcionário não pertence à unidade de saúde.");
      }
    };

    body.situacao = true;

    const agenda = await agendaRepository.create(body);

    if (!agenda) throw new Error("Erro ao criar agenda.");

    return {
      message: "Agenda criada com sucesso.",
      agenda: {
        id: agenda._id,
        unidade_saude: agenda.unidade_saude,
        funcionario: agenda.funcionario,
        data_dia: agenda.data_dia,
        horarios: agenda.horarios,
        createdAt: agenda.createdAt
      },
    };
  };

  findAll = async () => {
    const agenda = await agendaRepository.findAll();

    if (agenda.length === 0) throw new Error("Não há agendas cadastradas.");

    const pageData = {
      results: agenda.map((item) => ({
        id: item._id,
        unidade_saude: item.unidade_saude,
        funcionario: item.funcionario,
        data_dia: item.data_dia,
        horarios: item.horarios,
        disponivel: item.disponivel
      })),
    };

    return pageData;
  };

  findById = async (agendaId: string) => {
    const agenda = await agendaRepository.findById(agendaId);

    if (!agenda)
      throw new Error("O ID informado não corresponde a uma agenda cadastrada.");

    return agenda;
  };

  update = async (body: any, agendaId: string) => {
    let { unidade_saude, funcionario, data_dia, horarios, disponivel } = body;

    if (!unidade_saude && !funcionario && !data_dia && !horarios && !disponivel)
      throw new Error("Envie um ou mais campos para atualização.");

    const agenda = await agendaRepository.findById(agendaId);

    if (!agenda)
      throw new Error("O ID informado não corresponde a uma agenda cadastrada.");

    if (body.horarios) {

      // Colocar verificação se o CNS é válido

      const novosDadosHorario = {
        nome_paciente: body.horarios.nome_paciente,
        cns_paciente: body.horarios.cns_paciente,
        telefone_paciente: body.horarios.telefone_paciente,
        status: body.horarios.status
      }

      const index = agenda.horarios.findIndex(item => item.horario === body.horarios.horario);
      agenda.horarios[index] = { ...agenda.horarios[index], ...novosDadosHorario };
      body.horarios = agenda.horarios;
    }

    await agendaRepository.update(agendaId, body);

    return { message: "Agenda atualizada com sucesso!" };
  };

  delete = async (agendaId: string) => {
    const agenda = agendaRepository.findById(agendaId);

    if (!agenda)
      throw new Error("O ID informado não corresponde a uma agenda cadastrada.");

    await agendaRepository.delete(agendaId);

    return { message: "Agenda deletada com sucesso!" };
  };
}

export default AgendaService;