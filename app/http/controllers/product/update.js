const Joi = require('joi');

const productService = require('../../services/product');
const { abort } = require('../../../helpers/error');

async function validation({
  productId,
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
}) {
  try {
    const schema = Joi.object().keys({
      productId: Joi.number().min(1),
      productName: Joi.string(),
      productSlug: Joi.string(),
      categoryId: Joi.number().integer().min(0),
      subCategoryId: Joi.number().integer().min(0),
      productCode: Joi.string(),
      productSize: Joi.string(),
      productColor: Joi.string(),
      sellingPrice: Joi.number().min(0),
      discountPrice: Joi.number().min(0),
      product3D: Joi.string(),
      productDescp: Joi.string(),
      productThumbnail: Joi.string(),
    });

    return await schema.validateAsync({
      productId,
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
    });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function update(req, res) {
  const {
    productName,
    productSlug,
    categoryId,
    subCategoryId,
    productCode,
    productSize,
    productColor,
    sellingPrice,
    discountPrice,
    productDescp,
    productThumbnail
  } = req.body;
  const { productId } = req.params;
  const productImg = req.file.filename;

  await validation({
    productId,
    productName,
    productSlug,
    categoryId,
    subCategoryId,
    productCode,
    productSize,
    productColor,
    sellingPrice,
    discountPrice,
    product3D: productImg,
    productDescp,
    productThumbnail
  });

  await productService.update({
    productId,
    productName,
    productSlug,
    categoryId,
    subCategoryId,
    productCode,
    productSize,
    productColor,
    sellingPrice,
    discountPrice,
    product3D: productImg,
    productDescp,
    productThumbnail
  });

  return res.status(204).send();
}

module.exports = update;
