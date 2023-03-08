const Joi = require('joi');

const productService = require('../../services/product');
const { abort } = require('../../../helpers/error');

async function validation({
  productId,
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
}) {
  try {
    const schema = Joi.object().keys({
      productId: Joi.number().min(1),
      product_name: Joi.string(),
      product_slug: Joi.string(),
      category_id: Joi.number().integer().min(0),
      subCategory_id: Joi.number().integer().min(0),
      product_code: Joi.string(),
      product_size: Joi.string(),
      product_color: Joi.string(),
      selling_price: Joi.number().min(0),
      discount_price: Joi.number().min(0),
      product_3d: Joi.string(),
      product_descp: Joi.string(),
      product_thumbnail: Joi.string(),
    });

    return await schema.validateAsync({
      productId,
      product_name: Joi.string(),
      product_slug: Joi.string(),
      category_id: Joi.number().integer().min(0),
      subCategory_id: Joi.number().integer().min(0),
      product_code: Joi.string(),
      product_size: Joi.string(),
      product_color: Joi.string(),
      selling_price: Joi.number().min(0),
      discount_price: Joi.number().min(0),
      product_3d: Joi.string(),
      product_descp: Joi.string(),
      product_thumbnail: Joi.string(),
    });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function update(req, res) {
  const {
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
  } = req.body;
  const { productId } = req.params;
  const productImg = req.file.filename;

  await validation({
    productId,
    product_name,
    product_slug,
    category_id,
    subCategory_id,
    product_code,
    product_size,
    product_color,
    selling_price,
    discount_price,
    product_3d: productImg,
    product_descp,
    product_thumbnail
  });

  await productService.update({
    productId,
    product_name,
    product_slug,
    category_id,
    subCategory_id,
    product_code,
    product_size,
    product_color,
    selling_price,
    discount_price,
    product_3d: productImg,
    product_descp,
    product_thumbnail 
  });

  return res.status(204).send();
}

module.exports = update;
