const { Category } = require('../../models');

const { abort } = require('../../helpers/error');

exports.create = async ({ category_name, category_icon, category_slug }) => {
  const category = await Category.query().findOne({
    category_name,
  });

  if (category) return abort(400, 'This category is already exits');

  await Category.query().insert({ category_name, category_icon: category_icon, category_slug });

  return '';
};

exports.update = async ({ categoryId, category_name, category_icon, category_slug }) => {
  const category = await Category.query().findOne({
    category_name,
  });

  if (category && category.id === categoryId) return abort(400, 'This category is already exits');

  await Category.query().findById(categoryId).update({ category_name, category_icon: category_icon, category_slug });

  return '';
};

exports.getList = () => {
  const categories = Category.query().select('id', 'category_name', 'category_icon', 'category_slug');

  return categories;
};

exports.remove = async ({ categoryId }) => {
  const category = await Category.query().findById(categoryId);

  if (!category) return abort(400, 'This category is not already exists');

  await Category.query().findById(categoryId).delete();

  return '';
};
