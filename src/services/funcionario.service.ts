import bcrypt from "bcryptjs";
import FuncionarioRepository from "../repositories/funcionario.repository";

const funcionarioRepository = new FuncionarioRepository();

class FuncionarioService {
  create = async (body: any) => {
    const { name, email, password, role } = body;

    if (!name || !email || !password || !role)
      throw new Error("Preencha todos os campos obrigatórios ao registro.");

    // const regex =
    //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*=+?<>])[0-9a-zA-Z!@#$%&*=+?<>]{8,}$/g;

    // if (!password.match(regex)) throw new Error(
    //   "Use uma senha forte, com: pelo menos 8 caracteres, 1 letra minúscula, 1 letra maiúscula, 1 número e um caractere especial (!@#$%&*<>:;?+=)"
    // );

    const funcionario = await funcionarioRepository.create(body);

    if (!funcionario) throw new Error("Erro ao criar funcionário.");

    return {
      message: "Funcionário criado com sucesso.",
      funcionario: {
        id: funcionario._id,
        name,
        email,
        role,
        realiza_consulta: funcionario.realiza_consulta,
        createdAt: funcionario.createdAt
      },
    };
  };

  findAll = async () => {
    const funcionarios = await funcionarioRepository.findAll();

    if (funcionarios.length === 0) throw new Error("Não há funcionários cadastrados.");

    const pageData = {
      results: funcionarios.map((item) => ({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        realiza_consulta: item.realiza_consulta
      })),
    };

    return pageData;
  };

  findById = async (funcionarioId: string) => {
    const funcionario = await funcionarioRepository.findById(funcionarioId);

    if (!funcionario)
      throw new Error("O ID informado não corresponde a um funcionário cadastrado.");

    return funcionario;
  };

  update = async (body: any, funcionarioId: string) => {
    let { password } = body;

    const funcionario = await funcionarioRepository.findById(funcionarioId);

    if (!funcionario)
      throw new Error("O ID informado não corresponde a um funcionário cadastrado.");

    if (password) {
      //   const regex =
      //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*=+?<>])[0-9a-zA-Z!@#$%&*=+?<>]{8,}$/g;

      //   if (!password.match(regex))
      //     throw new Error(
      //       "Use uma senha forte, com: pelo menos 8 caracteres, 1 letra minúscula, 1 letra maiúscula, 1 número e um caractere especial (!@#$%&*<>:;?+=)"
      //     );

      body.password = await bcrypt.hash(password, 10);
    }

    await funcionarioRepository.update(funcionarioId, body);

    return { message: "Funcionário atualizado com sucesso!" };
  };

  delete = async (funcionarioId: string) => {
    const funcionario = funcionarioRepository.findById(funcionarioId);

    if (!funcionario)
      throw new Error("O ID informado não corresponde a um funcionário cadastrado.");

    await funcionarioRepository.delete(funcionarioId);

    return { message: "Funcionário deletado com sucesso!" };
  };
}

export default FuncionarioService;