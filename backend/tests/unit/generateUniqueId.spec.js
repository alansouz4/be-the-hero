// importando o arquivo com a função
const generateUniqueId = require('../../src/utils/generateUniqueId');

// colocamos uma categoria neste arquivo de teste
// porque ele pode testar várias coisas dentro do mesmo arquivo
// podemos dar qualquer nome
// segundo parâmetro recebe uma arrayFunction (uma função)
describe('Generate Unique ID', () => {
  // cada um dos nossos testes vai ter uma função chama it (no português "isto")
  // it - pq os testes são escritos num formato de frase, ex: isto deve gerar um id único
  // e it é abreviação de "isso" em inglês
  // 'should generate an unique ID' - geralmente é escrito o que quer que faça
  // tradução (deve gerar um ID exclusivo)
  it('should generate an unique ID', () => {
    const id = generateUniqueId();

    // diz - eu espero que algo aconteceu, tipo o id da ong 
    // toHaveLength - tenha 8 caracteres;
    expect(id).toHaveLength(8);
  })
});