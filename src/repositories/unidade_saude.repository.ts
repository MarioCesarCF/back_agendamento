import UnidadeSaude from "../models/UnidadeSaude";

class UnidadeSaudeRepository {
  create = (body: any) => UnidadeSaude.create(body);
  findAll = () => UnidadeSaude.find();
  findById = (id: string) => UnidadeSaude.findById(id);
  update = (id: string, body: any) =>
    UnidadeSaude.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { returnNewDocument: true }
    );
  delete = (id: string) => UnidadeSaude.findByIdAndDelete(id);
}

export default UnidadeSaudeRepository;