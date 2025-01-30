import AgendaRepository from "../repositories/agenda.repository";

const agendaRepository = new AgendaRepository();

class AgendaService {
  create = async (body: any) => {
    const { unidade_saude, funcionario, data_dia, horarios } = body; 

    if (!unidade_saude || !funcionario || !data_dia || !horarios)
      throw new Error("Preencha todos os campos obrigatórios ao registro.");

    // Adicionar lógica para garantir que somente serão aceitos funcionários que estejam cadastrados na unidade_saude

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
        situacao: item.situacao
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
    let { unidade_saude, funcionario, data_dia, horarios, situacao } = body;

    if (!unidade_saude && !funcionario && !data_dia && !horarios && !situacao)
      throw new Error("Envie um ou mais campos para atualização.");

    const agenda = await agendaRepository.findById(agendaId);

    if (!agenda)
      throw new Error("O ID informado não corresponde a uma agenda cadastrada.");

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