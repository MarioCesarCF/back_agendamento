import UnidadeSaudeRepository from "../repositories/unidade_saude.repository";
import FuncionarioService from "./funcionario.service";

const unidadeSaudeRepository = new UnidadeSaudeRepository();
const funcinarioService = new FuncionarioService();

class UnidadeSaudeService {
  create = async (body: any) => {
    const { name, funcionarios } = body;
    
    if (!name || !funcionarios)
      throw new Error("Preencha todos os campos obrigatórios ao registro.");

    if (funcionarios) {
      const funcionariosCadastrados: any[] = [];

      const arrayFuncionarios = await funcinarioService.findAll();

      arrayFuncionarios.results.forEach((element: any) => {
        const idString: string = element.id.valueOf();
        funcionariosCadastrados.push(idString);
      });

      funcionarios.forEach((element: string) => {
        if (!funcionariosCadastrados.includes(element)) {
          throw new Error("Funcionário informado não cadastrado.");
        }
      })
    }

    const unidadeSaude = await unidadeSaudeRepository.create(body);

    if (!unidadeSaude) throw new Error("Erro ao criar unidade de saúde.");

    return {
      message: "Unidade de saúde criada com sucesso.",
      unidadeSaude: {
        id: unidadeSaude._id,
        name,
        funcionarios,
        createdAt: unidadeSaude.createdAt
      },
    };
  };

  findAll = async () => {
    const unidadesSaude = await unidadeSaudeRepository.findAll();

    if (unidadesSaude.length === 0) throw new Error("Não há unidades de saúde cadastradas.");

    const pageData = {
      results: unidadesSaude.map((item) => ({
        id: item._id,
        name: item.name,
        funcionarios: item.funcionarios
      })),
    };

    return pageData;
  };

  findById = async (unidadeSaudeId: string) => {
    const unidadeSaude = await unidadeSaudeRepository.findById(unidadeSaudeId);

    if (!unidadeSaude)
      throw new Error("O ID informado não corresponde a uma unidade de saúde cadastrada.");

    return unidadeSaude;
  };

  update = async (body: any, unidadeSaudeId: string) => {
    let { name, funcionarios } = body;

    if (!name && !funcionarios)
      throw new Error("Envie um ou mais campos para atualização.");

    const unidadeSaude = await unidadeSaudeRepository.findById(unidadeSaudeId);

    if (!unidadeSaude)
      throw new Error("O ID informado não corresponde a uma unidade de saúde cadastrada.");

    await unidadeSaudeRepository.update(unidadeSaudeId, body);

    return { message: "Unidade de Saúde atualizada com sucesso!" };
  };

  delete = async (unidadeSaudeId: string) => {
    const unidadeSaude = unidadeSaudeRepository.findById(unidadeSaudeId);

    if (!unidadeSaude)
      throw new Error("O ID informado não corresponde a uma unidade de saúde cadastrada.");

    await unidadeSaudeRepository.delete(unidadeSaudeId);

    return { message: "Unidade de Saúde deletada com sucesso!" };
  };
}

export default UnidadeSaudeService;