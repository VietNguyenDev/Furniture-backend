const { Product, Category } = require('../../models');

const { abort } = require('../../helpers/error');

exports.create = async ({
    product_name,
    product_slug,
    category_id,
    subCategory_id,
    product_code,
    product_size,
    product_color,
    selling_price,
    discount_price,
    product_3d,
    product_descp,
    product_thumbnail
}) => {
  const product = await Product.query().findOne({
    product_name,
  });

  if (product) return abort(400, 'This product is already exits');

  const category = await Category.query().findById(category_id);

  if (!category) return abort(400, 'This category is not already exits');

  await Product.query().insert({
    product_name,
    product_slug,
    subCategory_id,
    product_code,
    product_size,
    product_color,
    discount_price: discount_price,
    selling_price: selling_price,
    product_descp,
    category_id: category_id,
    product_3d: `${process.env.APP_URL_UPLOAD}/${product_3d}`,
    product_thumbnail
  });

  return '';
};

exports.getList = async ({ limit, page, category_id }) => {
  const offset = page * limit - limit;

  let products = Product.query()
    .offset(offset).limit(limit);

  let total = Product.query().count();

  if (category_id && category_id.length) {
    products.whereIn('category_id', category_id);
    total.whereIn('category_id', category_id);
  }

  products = await products;
  [{ 'count(*)': total }] = await total;

  return { products, total };
};

exports.getDetail = async ({ product_id }) => {
  const product = await Product.query().findById(product_id);

  if (!product) return abort(400, 'Product is not already exists');

  return product;
};

exports.update = async ({
  product_id,
  product_name,
  category_id,
  subCategory_id,
  product_code,
  product_size,
  selling_price,
  discount_price,
  product_descp,
  product_3d,
  product_thumbnail
}) => {
  const product = await Product.query().findOne({
    product_name,
  });

  if (product && product.id === product_id) return abort(400, 'This product is already exits');

  const category = await Category.query().findById(category_id);

  if (!category) return abort(400, 'This category is not already exits');

  await Product.query().findById(product_id).update({
    product_name,
    product_name,
    category_id: category_id,
    subCategory_id,
    product_code,
    product_size,
    selling_price: selling_price,
    discount_price,
    product_descp,
    product_3d: `${process.env.APP_URL_UPLOAD}/${product_3d}`,
    product_thumbnail
  });

  return '';
};

exports.remove = async ({ product_id }) => {
  const product = await Product.query().findById(product_id);

  if (!product) return abort(400, 'Product is not already exists');

  await Product.query().findById(product_id).delete();

  return '';
};
