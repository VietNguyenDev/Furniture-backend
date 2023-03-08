const Joi = require('joi');

const subCategoryService = require('../../services/subCategory');
const { abort } = require('../../../helpers/error');

async function validation({ subCategory_name }) {
  try {
    const schema = Joi.object().keys({
      subCategory_name: Joi.string(),
    });

    return await schema.validateAsync({ subCategory_name });
  } catch (error) {
    return abort(400, 'Params error');
  }
}

async function create(req, res) {
    const { name } = req.body;
    const iconSubCategory = req.file.filename;
    const subCategoryInformation = {
      subCategory_name,
      subCategory_icon: iconSubCategory,
      subCategory_slug
    };
    await validation({ subCategory_name, });
  
    await subCategoryService.create(subCategoryInformation);
  
    return res.status(201).send();
  }
  
  module.exports = create;