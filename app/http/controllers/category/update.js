const Joi = require('joi');

const categoryService = require('../../services/category');
const { abort } = require('../../../helpers/error');

async function validation({ categoryId, categoryName }) {
  try {
    const schema = Joi.object().keys({
      categoryId: Joi.number().integer().min(1),
      categoryName: Joi.string(),
    });

    return await schema.validateAsync({ categoryId, categoryName });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function update(req, res) {
  const { categoryId } = req.params;
  const { categoryName, categorySlug } = req.body;
  const categoryIcon = req.file.filename;

  await validation({ categoryId, categoryName });

  await categoryService.update({ categoryId, categoryName, categoryIcon: categoryIcon, categorySlug });

  return res.status(204).send();
}

module.exports = update;
