const Joi = require('joi');

const productService = require('../../services/product');
const { abort } = require('../../../helpers/error');

async function validation({ limit, page }) {
  try {
    const schema = Joi.object().keys({
      limit: Joi.number().min(1),
      page: Joi.number().min(1),
    });

    return await schema.validateAsync({ limit, page });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function getList(req, res) {
  try {
    const { limit, page } = req.query;
    const filters = req.query;
    const categoryId = filters.categoryId || null;
    const sortBy = filters.sortBy || null;
  
    await validation({ limit, page });
  
    const products = await productService.getList({ limit, page, categoryId, sortBy });
    //console.log(products);
  
    return res.status(200).send(products);
  } catch (error) {
    abort(error.status, error.message);
  }

}

module.exports = getList;
