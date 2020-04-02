// importamos a função de teste
const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
  async index(request, response){
    // traz todos os campos de ong
    const ongs = await connection('ongs').select('*');
  
    return response.json(ongs);
  },

  async create(request, response) {
    // traz todos os dados para o corpo
    const { name, email, whatsapp, city, uf } = request.body;
    // chamando a função 
    const id = generateUniqueId();
    // cria a inserção de dados das ong
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });
    
    // retorna apenas o id hexadecimal
    return response.json({ id });
  }
};