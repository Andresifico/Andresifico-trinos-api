const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');

/**
 *
 * @param {Number} id user.id
 * @param {String} role user.role
 * @returns {String}
 */
function generateAccessToken(id, role) {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '1d' });
}

/**
 *
 * @param {String} token
 * @returns {{ id: Number, role: String }}
 */
function verifyAccessToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

const invalidTokens = [];

function toInvalidTokensVerify(token) {
  return invalidTokens.includes(token);
}

function toInvalidTokens(token) {
  invalidTokens.push(token);
}

module.exports = {
  generateAccessToken,
  verifyAccessToken,
  toInvalidTokensVerify,
  toInvalidTokens,
};
