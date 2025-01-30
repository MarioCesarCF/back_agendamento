import AgendaService from "../services/agenda.service";

const agendaService = new AgendaService();

class AgendaController {
  create = async (req: any, res: any) => {
    const body = req.body;

    try {
      const response = await agendaService.create(body);

      return res.status(201).send(response);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  };

  getAll = async (req: any, res: any) => {
    try {
      const response = await agendaService.findAll();

      return res.send(response);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  };

  findById = async (req: any, res: any) => {
    const { id: agendaId } = req.params;
    
    try {
      const response = await agendaService.findById(agendaId);

      return res.send(response);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  };

  update = async (req: any, res: any) => {
    const body = req.body;
    const { id: agendaId } = req.params;
    
    try {
      const response = await agendaService.update(body, agendaId);

      return res.send(response);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  };

  delete = async (req: any, res: any) => {
    const { id: agendaId } = req.params;

    try {
      const response = await agendaService.delete(agendaId);

      return res.send(response);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  };
}

export default AgendaController;