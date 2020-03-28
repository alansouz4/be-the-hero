const crypto = require('crypto');
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
    // cria um id hexadecimal para cada ong
    const id = crypto.randomBytes(4).toString('HEX');
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