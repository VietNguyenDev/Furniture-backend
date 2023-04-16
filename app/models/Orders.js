const { Model } = require('objection');

class Orders extends Model {
  static get tableName() {
    return 'orders';
  }

  static get relationMappings() {
    const Products = require('./Products');
    const Billing = require('./Bill');
    const ShippingDetail = require('./ShippingDetail');
    const User = require('./User');

    return {
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Products,
        join: {
          from: 'orders.productId',
          to: 'products.id',
        },
      },
      shipping: {
        relation: Model.BelongsToOneRelation,
        modelClass: ShippingDetail,
        join: {
          from: 'orders.shippingId',
          to: 'shipping_details.id',
        },
      },
      bill: {
        relation: Model.BelongsToOneRelation,
        modelClass: Billing,
        join: {
          from: 'orders.billId',
          to: 'bill.id',
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'orders.userId',
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = Orders;
