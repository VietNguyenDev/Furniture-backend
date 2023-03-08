const Joi = require('joi');

const subCategoryService = require('../../services/subCategory');
const { abort } = require('../../../helpers/error');

async function validation({ subCategoryId, subCategory_name }) {
  try {
    const schema = Joi.object().keys({
      subCategoryId: Joi.number().integer().min(1),
      subCategory_name: Joi.string(),
    });

    return await schema.validateAsync({ subCategoryId, subCategory_name });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function update(req, res) {
  const { subCategoryId } = req.params;
  const { subCategory_name, subCategory_slug } = req.body;
  const iconCategory = req.file.filename;

  await validation({ subCategoryId, subCategory_name, subCategory_slug });

  await categoryService.update({ subCategoryId, subCategory_name, iconCategory, subCategory_slug });

  return res.status(204).send();
}

module.exports = update;