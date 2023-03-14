const Joi = require('joi');

const productService = require('../../services/product');
const { abort } = require('../../../helpers/error');

async function validation({
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
}) {
  try {
    const schema = Joi.object().keys({
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
    });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function create(req, res) {
  const {
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
    productThumbnail
  } = req.body;
  const productImg = req.file.filename;

  await validation({
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
    product3D: productImg,
    productThumbnail
  });

  await productService.create({
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
    product3D: productImg,
    productThumbnail
  });

  return res.status(201).send();
}

module.exports = create;
