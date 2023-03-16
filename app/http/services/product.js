/* eslint-disable no-undef */
const { Product, Category } = require('../../models');

const { abort } = require('../../helpers/error');

exports.create = async (params) => {
  // check product is already exits

  const isExitsProduct  = await Product.query().findOne({
    productName: params.productName,
  });

  if (isExitsProduct) return abort(400, 'This product is already exits');

  const isExitsCategory = await Category.query().findById(params.categoryId);

  if (!isExitsCategory) return abort(400, 'This category is not already exits');

  const result = await Product.query().insert(params);

  return result;
};

exports.getList = async ({ limit, page, categoryId, sortBy }) => {
  const offset = page * limit - limit;
  const [field, type] = sortBy.split('=');
  console.log(field, type);
  let products = Product.query().offset(offset).limit(limit);

  let total = Product.query().count();

  if (categoryId) {
    // filter by category
    products = Product.query()
      .offset(offset)
      .limit(limit)
      .where('categoryId', categoryId);
    
    total = Product.query()
      .count()
      .where('categoryId', categoryId);
  }
  if (sortBy) {
    // sort by field
    products = Product.query()
      .offset(offset)
      .limit(limit)
      .orderBy(field, type);
    
    total = Product.query()
      .count()
      .orderBy(field, type);
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
  productDescription,
  categoryId,
  product3D,
  productThumbnail,
}) => {
  const product = await Product.query().findOne({
    productName,
  });

  if (product && product.id === productId)
    return abort(400, 'This product is already exits');

  const category = await Category.query().findById(categoryId);

  if (!category) return abort(400, 'This category is not already exits');

  await Product.query()
    .findById(productId)
    .update({
      productName,
      productSlug,
      subCategoryId,
      productCode,
      productSize,
      productColor,
      discountPrice: discountPrice,
      sellingPrice: sellingPrice,
      productDescription,
      categoryId: categoryId,
      product3D: `${process.env.APP_URL_UPLOAD}/${product3D}`,
      productThumbnail,
    });

  return '';
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
