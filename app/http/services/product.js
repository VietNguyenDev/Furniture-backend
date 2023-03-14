/* eslint-disable no-undef */
const { Product, Category } = require('../../models');

const { abort } = require('../../helpers/error');

exports.create = async ({
    productName,
    productSlug,
    categoryId,
    subCategoryId,
    productCode,
    productSize,
    productColor,
    sellingPrice,
    discountPrice,
    product3D,
    productDescp,
    productThumbnail
}) => {
  const product = await Product.query().findOne({
    productName,
  });

  if (product) return abort(400, 'This product is already exits');

  const category = await Category.query().findById(categoryId);

  if (!category) return abort(400, 'This category is not already exits');

  await Product.query().insert({
    productName,
    productSlug,
    subCategoryId,
    productCode,
    productSize,
    productColor,
    discountPrice: discountPrice,
    sellingPrice: sellingPrice,
    productDescp,
    categoryId: categoryId,
    product3D: `${process.env.APP_URL_UPLOAD}/${product3D}`,
    productThumbnail
  });

  return '';
};

exports.getList = async ({ limit, page, categoryId }) => {
  const offset = page * limit - limit;

  let products = Product.query()
    .offset(offset).limit(limit);

  let total = Product.query().count();

  if (categoryId && categoryId.length) {
    products.whereIn('categoryId', categoryId);
    total.whereIn('categoryId', categoryId);
  }

  products = await products;
  [{ 'count(*)': total }] = await total;

  return { products, total };
};

exports.getDetail = async ({ productId }) => {
  const product = await Product.query().findById(productId);

  if (!product) return abort(400, 'Product is not already exists');

  return product;
};

exports.update = async ({
  productId,
  productName,
  productSlug,
  subCategoryId,
  productCode,
  productSize,
  productColor,
  discountPrice,
  sellingPrice,
  productDescp,
  categoryId,
  product3D,
  productThumbnail
}) => {
  const product = await Product.query().findOne({
    productName,
  });

  if (product && product.id === productId) return abort(400, 'This product is already exits');

  const category = await Category.query().findById(categoryId);

  if (!category) return abort(400, 'This category is not already exits');

  await Product.query().findById(productId).update({
    productName,
    productSlug,
    subCategoryId,
    productCode,
    productSize,
    productColor,
    discountPrice: discountPrice,
    sellingPrice: sellingPrice,
    productDescp,
    categoryId: categoryId,
    product3D: `${process.env.APP_URL_UPLOAD}/${product3D}`,
    productThumbnail
  });

  return '';
};

exports.remove = async ({ productId }) => {
  const product = await Product.query().findById(productId);

  if (!product) return abort(400, 'Product is not already exists');

  await Product.query().findById(productId).delete();

  return '';
};
