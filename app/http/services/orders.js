const { abort } = require('../../helpers/error');
// @ts-ignore
const { Orders, OrdersDetail } = require('../../models');
// @ts-ignore
const ShippingDetail = require('../../models/ShippingDetail');
const Cart = require('../../models/Cart');

exports.createOrder = async ({ userId, data }) => {
  try {
    let result = [];
    const { cartItems } = data;
    const shipping = await ShippingDetail.query().insert({
      ...data.shipping,
    });
    const createOrder = await Orders.query().insert({
      shippingId: shipping.id,
      status: 'pending',
      userId,
    });
    cartItems.forEach(async (item) => {
      const cart = await Cart.query().findById(item);
      const orderData = await OrdersDetail.query().insert({
        orderId: createOrder.id,
        productId: cart.productId,
        productColor: cart.productColor,
        productSize: cart.productSize,
        price: cart.subTotal,
        quantity: cart.quantity,
      });
      result.push(orderData);
      await Cart.query().deleteById(item);
    });
    if (result.length > 0) return result;
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
