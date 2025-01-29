import Funcionario from "../models/Funcionario";

class FuncionarioRepository {
    create = (body: any) => Funcionario.create(body);
    findAll = () => Funcionario.find();
    findById = (id: string) => Funcionario.findById(id);
    update = (id: string, body: any) =>
        Funcionario.findOneAndUpdate(
            { _id: id },
            { $set: body },
            { returnNewDocument: true }
    );
    delete = (id: string) => Funcionario.findByIdAndDelete(id);
}

export default FuncionarioRepository;