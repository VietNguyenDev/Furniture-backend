const { abort } = require('../../helpers/error');
const { Orders } = require('../../models');
const Billing = require('../../models/Bill');
const ShippingDetail = require('../../models/ShippingDetail');
const Shipping = require('../../models/Shipping');
const Cart = require('../../models/Cart');

exports.createOrder = async ({ userId, data }) => {
  try {
    const { shippingLines, cartItems } = data;
    const shippingResult = await Shipping.query().insert({
      ...shippingLines,
      userId,
    });
    await ShippingDetail.query().insert({
      ...data.shipping,
      shippingId: shippingResult.id,
      shippingTotal: shippingLines.total,
      shippingTax: shippingLines.total,
    });
    cartItems.forEach(async (item) => {
      const cart = await Cart.query().findById(item);
      const billResult = await Billing.query().insert({
        profit: cart.subTotal,
        userId,
      });
      await Orders.query().insert({
        productId: cart.productId,
        shippingId: shippingResult.id,
        billId: billResult.id,
        status: 'pending',
        userId,
        productColor: cart.productColor,
        productSize: cart.productSize,
        quantity: cart.quantity,
        subTotal: cart.subTotal,
      });
      await Cart.query().deleteById(item);
    });
  } catch (error) {
    abort(500, error);
  }
};

exports.getAllOrdersByUserId = async ({ page, limit, userId, sortBy }) => {
  try {
    if (page < 1 || limit < 1) abort(400, 'Invalid page or limit');
    const result = await Orders.query()
      .where({ userId })
      .orderBy('id', sortBy || 'desc')
      .withGraphFetched('product')
      .withGraphFetched('shipping')
      .withGraphFetched('bill')
      .page(page - 1, limit);
    if (!result) abort(400, 'Orders not found');
    return result;
  } catch (error) {
    abort(500, error.message);
  }
};

exports.getAll = async ({ page, limit }) => {
  try {
    if (page < 1 || limit < 1) abort(400, 'Invalid page or limit');
    const result = await Orders.query()
      .withGraphFetched('product')
      .withGraphFetched('shipping')
      .withGraphFetched('bill')
      .page(page - 1, limit);
    return result;
  } catch (error) {
    abort(500, error.message);
  }
};

exports.updateStatus = async ({ status, orderId }) => {
  try {
    const checkOrder = await Orders.query().findById(orderId);
    if (!checkOrder) abort(400, 'Order not found');
    const id = orderId;
    const result = await Orders.query().patchAndFetchById(id, { status });
    return result;
  } catch (error) {
    abort(500, error.message);
  }
};
