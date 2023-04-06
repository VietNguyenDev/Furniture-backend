const { abort } = require('../../helpers/error');
const { Product, User, Cart } = require('../../models');
const { getDetail } = require('./product');

exports.addItemToCart = async ({
  productId,
  userId,
  quantity,
  productSize,
  productColor,
}) => {
  let checkProduct = await Product.query().findById(productId);
  if (!checkProduct) return abort(400, 'Product not found');
  let checkUser = await User.query().findById(userId);
  if (!checkUser) return abort(400, 'User not found');

  let checkCart = await Cart.query().findOne({
    productId,
    userId,
  });

  if (checkCart) {
    let newQuantity = checkCart.quantity + quantity;
    let result = await Cart.query().patchAndFetchById(checkCart.id, {
      quantity: newQuantity,
      subTotal: newQuantity * checkProduct.sellingPrice,
    });
    return {
      products: checkProduct,
      ...result,
    };
  }

  let result = await Cart.query().insert({
    productId,
    userId,
    quantity,
    subTotal: quantity * checkProduct.sellingPrice,
    productSize,
    productColor,
  });
  return {
    products: checkProduct,
    ...result,
  };
};

exports.getActiveCart = async ({ userId }) => {
  const result = await Cart.query().where({ userId });
  const products = await Promise.all(
    result.map(async (item) => {
      const product = await getDetail({ productId: item.productId });
      return {
        ...item,
        products: product,
      };
    })
  );

  return products;
};

exports.emptyCart = async ({ userId }) => {
  const result = await Cart.query().deleteById(userId);
  return result;
};
