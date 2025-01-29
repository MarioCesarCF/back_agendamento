import Funcionario from "../models/Funcionario";

class FuncionarioRepository {
    create = (body: any) => Funcionario.create(body);
    findAll = () => Funcionario.find();
}

export default FuncionarioRepository;