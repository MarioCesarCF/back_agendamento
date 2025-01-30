import UnidadeSaudeService from "../services/unidade_saude.service";

const unidadeSaudeService = new UnidadeSaudeService();

class UnidadeSaudeController {
  create = async (req: any, res: any) => {
    const body = req.body;
    
    try {
      const response = await unidadeSaudeService.create(body);

      return res.status(201).send(response);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  };

  getAll = async (req: any, res: any) => {
    try {
      const response = await unidadeSaudeService.findAll();

      return res.send(response);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  };

  findById = async (req: any, res: any) => {
    const { id: unidadeSaudeId } = req.params;
    
    try {
      const response = await unidadeSaudeService.findById(unidadeSaudeId);

      return res.send(response);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  };

  update = async (req: any, res: any) => {
    const body = req.body;
    const { id: unidadeSaudeId } = req.params;
    
    try {
      const response = await unidadeSaudeService.update(body, unidadeSaudeId);

      return res.send(response);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  };

  delete = async (req: any, res: any) => {
    const { id: unidadeSaudeId } = req.params;

    try {
      const response = await unidadeSaudeService.delete(unidadeSaudeId);

      return res.send(response);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  };
}

export default UnidadeSaudeController;