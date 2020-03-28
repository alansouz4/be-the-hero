const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    /** Contando quantos registros temos */
    const [count] = await connection('incidents').count();

    /** Paginação */
    // buscando por query params (?page=1)
    const { page = 1 } = request.query;
    const incidents = await connection('incidents')
    // trazendo mais dados das ongs para os registros
    // join - uso quando quero relacionar dados de duas tabelas
    // me traz da tabela 'ongs', todos os 'ongs.id' que seja igual aos 'incidents.ong_id'
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    // limitando os dados da busca para 5 indidents (casos)
    .limit(5)
    // pulando 5 incidents por página
    .offset((page - 1) * 5)
    // criamos um array e pedimos todos os dados do incidents e seleciono todos que quero da ong 
    .select([
      'incidents.*',
      'ongs.name',
      'ongs.email',
      'ongs.whatsapp',
      'ongs.city',
      'ongs.uf'
    ]);

    response.header('X-Total-Count', count['count(*)']);

    return response.json(incidents);
  },

  async create(request, response) {
     // traz todos os dados para o corpo
    const { title, description, value } = request.body;
    // acessando o id da ong
    const ong_id = request.headers.authorization;
    // cria a inserção de dados das ong
    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    });

    return response.json({ id });
  },

  async delete(request, response) {
    // Delete o id específico (:id)
    const { id } = request.params;
    // para confirmar se realmente foi deletado pela ong a qual criou o incident
    // e para ela não deletar o incident de outra ong
    const ong_id = request.headers.authorization;
    // buscando o id do incident
    const incident = await connection('incidents')
      .where('id', id) // onde id seja igual a id
      .select('ong_id') // selecionando apenas a coluna ong_id
      .first(); // vai retornar apenas um resultado
      
      // verificando se o ong_id é diferente do ong_id que esta logado na aplicação
      if (incident.ong_id !== ong_id) {
        // 401 - resposta de erro
        return response.status(401).json({ error: 'Operation not permitted.' });
      }
      // deletando o registro do incident
      await connection('incidents').where('id', id).delete();

      // 204 resposta que deu sucesso, mais não tem nada a retornar
      // send - é um corpo sem nada
      return response.status(204).send();
  }
};