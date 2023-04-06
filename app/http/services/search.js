const { abort } = require('../../helpers/error');
const { Product } = require('../../models');

exports.searchProductByName = async ({
  keyword,
  typeCategory,
  limit,
  page,
}) => {
  try {
    const offset = page * limit - limit;

    const products = await Product.query()
      .where('productName', 'like', `%${keyword}%`)
      .offset(offset)
      .limit(limit);
    let total = await Product.query()
      .where('productName', 'like', `%${keyword}%`)
      .count();

    if (!products) abort(404, 'Product Not Found');
    if (typeCategory === 'all') return { products, total };
    const result = products.filter(
      (product) => product.categoryId === typeCategory
    );
    total = result.length;
    return { result, total };
  } catch (error) {
    abort(400, 'Params Error');
  }
};
