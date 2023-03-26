const { Product } = require('../../models');

exports.searchProductByName = async ({ keyword, typeCategory }) => {
  try {
    const products = await Product.query().where(
      'productName',
      'like',
      `%${keyword}%`
    );
    if (typeCategory === 'all') return products;
    const result = products.filter(
      (product) => product.categoryId === typeCategory
    );
    return result;
  } catch (error) {
    return error;
  }
};
