const Joi = require('joi');

const productService = require('../../services/product');
const { abort } = require('../../../helpers/error');

async function validation({ product_id }) {
  try {
    const schema = Joi.object().keys({
      product_id: Joi.number().min(1),
    });

    return await schema.validateAsync({ product_id });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function getDetail(req, res) {
  const { productId } = req.params;

  await validation({ productId });

  const product = await productService.getDetail({ productId });

  return res.status(200).send(product);
}

module.exports = getDetail;
