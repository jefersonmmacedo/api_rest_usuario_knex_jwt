const User = require('../models/User')
class UsersController{
    async index(req, res){
      let users = await User.findAll();
       res.json(users)
    };

    async findUserId(req, res) {
        let id = req.params.id;
        let userId = await User.findId(id);

        if(userId == undefined) {
            res.status(404)
            res.json(" Usuário não encontrado")
        } else {
            res.json(userId)
        }
    } 

    async create(req, res){
        const {name, email, password, role} = req.body;

        if(name == undefined || email == undefined || password == undefined) {
            res.status(400);
            res.json({err: "Há um campo vazio. Verifique os campos e preencha corretamente"})
            return;
        }

        let emailExists = await User.findEmail(email);

        if(emailExists) {
            res.status(406);
            res.json({err: "O email enviado ja existe em nossa base de dados. Por favor escolha outro e-mail"});
            return;
        }

        await User.new(name, email, password);

        res.status(200);
        res.send("Seu cadastro foi efetuado com sucesso!")
        
    }


    async Update(req, res) {
        let {id, name, email, role} = req.body;
        let result = await User.Updade(id, name, email, role);

        if(result != undefined) {
            if(result.status) {
                res.status(200);
                res.send("Atualização efetuada com sucesso!");
            } else {
                res.status(406);
                res.send(result.err)
            }
        } else {
            res.status(406);
            res.send(result.err)
        }
    }
}

module.exports = new UsersController;