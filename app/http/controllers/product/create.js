const Joi = require('joi');

const productService = require('../../services/product');
const { abort } = require('../../../helpers/error');

async function validation({
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
    });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function create(req, res) {
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
  const productImg = req.file.filename;

  await validation({
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
  });

  await productService.create({
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
  });

  return res.status(201).send();
}

module.exports = create;
