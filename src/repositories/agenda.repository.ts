import Agenda from "../models/Agenda";

class AgendaRepository {
  create = (body: any) => Agenda.create(body);
  findAll = () => Agenda.find();
  findById = (id: string) => Agenda.findById(id);
  update = (id: string, body: any) =>
    Agenda.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { returnNewDocument: true }
    );
  delete = (id: string) => Agenda.findByIdAndDelete(id);
}

export default AgendaRepository;