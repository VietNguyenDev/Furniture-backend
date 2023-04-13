/* eslint-disable no-undef */
const { Product, Category, Favorite } = require('../../models');

const { abort } = require('../../helpers/error');

exports.create = async (params) => {
  // check product is already exits

  const isExitsProduct = await Product.query().findOne({
    productName: params.productName,
  });

  if (isExitsProduct) return abort(400, 'This product is already exits');

  const isExitsCategory = await Category.query().findById(params.categoryId);

  if (!isExitsCategory) return abort(400, 'This category is not already exits');

  const result = await Product.query().insert(params);

  return result;
};

exports.getList = async ({ limit, page, categoryId, userId }) => {
  const offset = page * limit - limit;
  let products = Product.query().offset(offset).limit(limit);
  let favoriteList = null;
  let total = Product.query().count();

  if (categoryId) {
    // filter by category
    products = Product.query()
      .offset(offset)
      .limit(limit)
      .where('categoryId', categoryId);

    total = Product.query().count().where('categoryId', categoryId);
  }

  if (userId) {
    favoriteList = await Favorite.query().where('userId', userId);
    favoriteList = favoriteList.map((item) => item.productId);
  }

  products = await products;
  [{ 'count(*)': total }] = await total;
  if (favoriteList) {
    products = products.map((item) => {
      if (favoriteList.includes(item.id)) {
        item.favoriteStatus = true;
      } else {
        item.favoriteStatus = false;
      }
      return item;
    });
  }
  return { products, total };
};

exports.getDetail = async ({ productId }) => {
  const product = await Product.query().findById(productId);

  if (!product) return abort(400, 'Product is not already exists');

  if (product.favoriteId) {
    product.favoriteStatus = true;
  }

  return product;
};

exports.update = async (params) => {
  const product = await Product.query().findById(params.productId);
  if (!product) return abort(400, 'This product is not already exits');

  const category = await Category.query().findById(params.categoryId);
  if (!category) return abort(400, 'This category is not already exits');

  const { productId, ...paramsWithoutId } = params;

  const result = await Product.query()
    .findById(productId)
    .update(paramsWithoutId);

  return result;
};

exports.remove = async ({ productId }) => {
  const product = await Product.query().findById(productId);

  if (!product) return abort(400, 'Product is not already exists');

  await Product.query().findById(productId).delete();

  return '';
};

exports.uploadFile = async (req, res) => {
  try {
    const { file } = req;

    if (!file) return res.status(400).json({ message: 'File is required' });

    return res
      .status(200)
      .json({ message: 'Upload file success', data: file.filename });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
