const { abort } = require('../../helpers/error');
const { Orders } = require('../../models');
const Billing = require('../../models/Bill');
const ShippingDetail = require('../../models/ShippingDetail');

exports.createOrder = async ({ userId, data }) => {
  try {
    const { shippingLines, cartItems } = data;
    const billResult = await Billing.query().insert({
      ...data.billing,
    });
    const shippingResult = await ShippingDetail.query().insert({
      ...data.shipping,
      shippingTotal: shippingLines.total,
      shippingTax: shippingLines.total,
    });
    cartItems.forEach(async (item) => {
      await Orders.query().insert({
        cartId: item,
        shippingId: shippingResult.id,
        billId: billResult.id,
        status: 'pending',
        userId,
      });
    });
  } catch (error) {
    abort(500, error);
  }
};

exports.getAllOrdersByUserId = async ({ page, limit, userId }) => {
  try {
    const result = await Orders.query()
      .withGraphFetched('cart')
      .withGraphFetched('shipping')
      .withGraphFetched('bill')
      .where({ userId })
      .page(page - 1, limit);

    return result;
  } catch (error) {
    abort(500, error.message);
  }
};
