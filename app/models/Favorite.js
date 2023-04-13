const { Model } = require('objection');

class Favorite extends Model {
  static get tableName() {
    return 'favorites';
  }

  static get relationMappings() {
    const User = require('./User');
    const Product = require('./Product');
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'favorites.userId',
          to: 'users.id',
        },
      },
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: 'favorites.productId',
          to: 'products.id',
        },
      },
    };
  }
}

module.exports = Favorite;
