const knex = require('knex');
const configuration = require('../../knexfile');

// Usando variável de ambiente
// se ela for igual a 'test', senão utilizamos a configuration.devolopment
// configuration.test - refere-se a que esta dentro do knexfile.js
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

const connection = knex(config);

module.exports = connection;