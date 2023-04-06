const { Model } = require('objection');

class Orders extends Model {
  static get tableName() {
    return 'orders';
  }

  static get relationMappings() {
    const Cart = require('./Cart');
    const Billing = require('./Bill');
    const ShippingDetail = require('./ShippingDetail');

    return {
      cart: {
        relation: Model.BelongsToOneRelation,
        modelClass: Cart,
        join: {
          from: 'orders.cartId',
          to: 'cart.id',
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
    };
  }
}

module.exports = Orders;
