const request = require('supertest');
const app = require('../../src/app');
// importando nossa conexão para que o arquivo possa testar e criar as migrations do knex
const connection = require('../../src/database/connection');

describe('ONG', () => {
  // before - antes de executar cada um dos testes
  // arrayFunction - crie a migration do knex
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  // método para tratar o erro de conexão
  // afterAll - para executar algo depois de todos os testes
  // destroy - vai desfazer a conecxão do teste com o banco de dados
  afterAll(async () => {
    await connection.destroy();
  }); 

  // deve ser capaz de criar uma nova ONG
  it('should be able to create a new ONG', async () => {
    // request - enviando a conexão para a rota, através de uma requisição HTTP post 
    // send - quais dados quero enviar para esta rota
    // async e await da uma atenção da função, e espera ela terminar por ser um pouco lenta
    // response - tem dados da resposta resposta que o servidor vai retornar
    const response = await request(app)
    .post('/ongs')
    .send({
      name: "APAD2",
      email: "contato@hotma.com",
      whatsapp: "4700000000",
      city: "Osasco",
      uf: "SP"
    });
    // espero que dentro do response.body eu tenha uma propriedade chama ID
    expect(response.body).toHaveProperty('id');
    // espero que esta propriedade tenha 8 caracteres.
    expect(response.body.id).toHaveLength(8);
  });
});