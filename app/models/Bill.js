const { Model } = require('objection');

class Billing extends Model {
  static get tableName() {
    return 'bill';
  }
}

module.exports = Billing;
