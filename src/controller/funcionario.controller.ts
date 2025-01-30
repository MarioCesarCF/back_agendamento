import FuncionarioService from "../services/funcionario.service";

const funcionarioService = new FuncionarioService();

class FuncionarioController {
  criar = async (req: any, res: any) => {
    const body = req.body;
    
    try {
      const response = await funcionarioService.create(body);

      return res.status(201).send(response);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  };

  obterTodos = async (req: any, res: any) => {
    try {
      const response = await funcionarioService.findAll();

      return res.send(response);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  };

  obterPorId = async (req: any, res: any) => {
    const { id: funcionarioId } = req.params;
    
    try {
      const response = await funcionarioService.findById(funcionarioId);

      return res.send(response);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  };

  atualizar = async (req: any, res: any) => {
    const body = req.body;
    const { id: funcionarioId } = req.params;
    
    try {
      const response = await funcionarioService.update(body, funcionarioId);

      return res.send(response);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  };

  deletar = async (req: any, res: any) => {
    const { id: funcionarioId } = req.params;

    try {
      const response = await funcionarioService.delete(funcionarioId);

      return res.send(response);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  };
}

export default FuncionarioController;