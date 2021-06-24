const knex = require("../database/connection");
const bcrypt = require("bcrypt");
const { where } = require("../database/connection");

class User {

    // Retorna a listagem de usuários
    async findAll() {
        try{
            let allUsers = await knex.select(["id", "name", "email", "role"]).table("cad_users");
            return allUsers;
        }catch(err) {
            console.log(err);
            return [];
        }
    }

    //Retornando usuarios pelo ID
    async findId(id) {
        try{
            let allUsers = await knex.select(["id", "name", "email", "role"]).where({id: id}).table("cad_users");
            if(allUsers.length > 0) {
                return allUsers[0];
            } else {
                return undefined
            }

        }catch(err) {
            console.log(err);
            return undefined;
        }
    }

    //recebe e cadastra os novos usuários no banco de dados
    async new(name, email, password) {
    try{

        let hash = await bcrypt.hash(password, 10)
        await knex.insert({name, email, password: hash,role: 0}).table("cad_users");
    }catch(err) {
        console.log(err)
    }
  } 


// Verifica a existencia de usuarios com o mesmo e-mail, afim de evitar o cadastro de e-mails iguais.
  async findEmail(email) {
      try{
          let result = await knex.select("*").from("cad_users").where({email:email});
          
          if(result.length > 0) {
              return true;
          } else {
              return false;
          }

      }catch(err) {
          console.log(err);
          return false;
      }
  }

  async Updade(id, name, email, role) {
    let oldUser = await this.findId(id);

    if (oldUser != undefined) {

        let userUpdate = {};

        if(email != undefined) {
            if(email != oldUser.email) {
                let result = await this.findEmail(email)
                if(result == false) {
                    userUpdate.email = email;
                } else {
                    return {status: false, err: "Opa. Infelizmente o e-mail escolhido ja se encontra em nossa base de sados. Favor escolher outro e-mail."}
                }
            }
        }


        if(name != undefined) {
            userUpdate.name = name
        }

        if(role != undefined) {
            userUpdate.role = role
        }

        try{
            await knex.update(userUpdate).where({id:id}).table("cad_users");
            return {status: true}
            
        }catch (err){
            console.log(err)
        }

              
        } else {
            return {status: false, err: "Opa. Infelizmente o usuário selecionado não está cadastrado em nossa base de dados."}
        }

    }



}

module.exports = new User()