const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    // acessando os dados da ong que esta logada
    const ong_id = request.headers.authorization;
    // buscando os incidents
    const incidents = await connection('incidents')
    .where('ong_id', ong_id)
    .select('*');

    return response.json(incidents);
  }
}