const { abort } = require('../../helpers/error');
const { Product } = require('../../models');

exports.searchProductByName = async ({ keyword, typeCategory }) => {
  try {
    const products = await Product.query().where(
      'productName',
      'like',
      `%${keyword}%`
    );
    if (!products) abort(404, 'Product Not Found');
    if (typeCategory === 'all') return products;
    const result = products.filter(
      (product) => product.categoryId === typeCategory
    );
    return result;
  } catch (error) {
    abort(400, 'Params Error');
  }
};
