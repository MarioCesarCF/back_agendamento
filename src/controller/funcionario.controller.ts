import FuncionarioService from "../services/funcionario.service";

const funcionarioService = new FuncionarioService();

class FuncionarioController {
    create = async (req: any, res: any) => {
        const body = req.body;
        try {
          const user = await funcionarioService.create(body);
    
          return res.status(201).send(user);
        } catch (err: any) {
          return res.status(500).send(err.message);
        }
      };
    
      findAll = async (req: any, res: any) => {
        try {
          const users = await funcionarioService.findAll();
    
          return res.send(users);
        } catch (err: any) {
          return res.status(500).send(err.message);
        }
      };
}

export default FuncionarioController;