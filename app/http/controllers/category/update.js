const Joi = require('joi');

const categoryService = require('../../services/category');
const { abort } = require('../../../helpers/error');

async function validation({ categoryId, category_name }) {
  try {
    const schema = Joi.object().keys({
      categoryId: Joi.number().integer().min(1),
      category_name: Joi.string(),
    });

    return await schema.validateAsync({ categoryId, category_name });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function update(req, res) {
  const { categoryId } = req.params;
  const { category_name, category_slug } = req.body;
  const iconCategory = req.file.filename;

  await validation({ categoryId, category_name });

  await categoryService.update({ categoryId, category_name, category_icon: iconCategory, category_slug });

  return res.status(204).send();
}

module.exports = update;
