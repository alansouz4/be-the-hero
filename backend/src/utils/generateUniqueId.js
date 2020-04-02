// crypto - cuida da parte de criptografia
const crypto = require('crypto');

module.exports = function generateUniqueId() {
  // trazemos a criação de id hexadecimal de OngController
  return crypto.randomBytes(4).toString('HEX');
}