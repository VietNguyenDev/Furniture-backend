const Joi = require('joi');

const productService = require('../../services/product');
const { abort } = require('../../../helpers/error');

async function validation({ limit, page, categoryId }) {
  try {
    const schema = Joi.object().keys({
      limit: Joi.number().min(1),
      page: Joi.number().min(1),
      categoryId: Joi.array().items(Joi.number()),
    });

    return await schema.validateAsync({ limit, page, categoryId });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function getList(req, res) {
  const { limit, page } = req.query;
  let { categoryId } = req.query;

  categoryId = categoryId ? JSON.parse(categoryId) : undefined;

  await validation({ limit, page, categoryId });

  const products = await productService.getList({ limit, page, categoryId });

  return res.status(200).send(products);
}

module.exports = getList;
