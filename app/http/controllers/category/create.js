const Joi = require('joi');

const categoryService = require('../../services/category');
const { abort } = require('../../../helpers/error');

async function validation({ category_name }) {
  try {
    const schema = Joi.object().keys({
      category_name: Joi.string(),
    });

    return await schema.validateAsync({ category_name });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function create(req, res) {
  const { name } = req.body;
  const iconCategory = req.file.filename;
  const categoryInformation = {
    category_name,
    category_icon: iconCategory,
    category_slug
  };
  await validation({ category_name });

  await categoryService.create(categoryInformation);

  return res.status(201).send();
}

module.exports = create;
