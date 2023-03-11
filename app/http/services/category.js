const { Category } = require('../../models');

const { abort } = require('../../helpers/error');

exports.create = async ({ categoryName, categoryIcon, categorySlug }) => {
  try {
    const category = await Category.query().findOne({
      categoryName,
    });
  
    if (category) return abort(400, 'This category is already exits');
  
    const data = await Category.query().insert({ categoryName, categoryIcon: categoryIcon, categorySlug });
  
    return data;    
  }
  catch (error) {
    return abort(400, 'Params error');
  }
};

exports.update = async ({ categoryId, categoryName, categoryIcon, categorySlug }) => {
  const category = await Category.query().findOne({
    categoryName,
  });

  if (category && category.id === categoryId) return abort(400, 'This category is already exits');

  await Category.query().findById(categoryId).update({ categoryName, categoryIcon: categoryIcon, categorySlug });

  return '';
};

exports.getList = () => {
  const categories = Category.query().select('id', 'categoryName', 'categoryIcon', 'categorySlug');

  return categories;
};

exports.remove = async ({ categoryId }) => {
  const category = await Category.query().findById(categoryId);

  if (!category) return abort(400, 'This category is not already exists');

  await Category.query().findById(categoryId).delete();

  return '';
};
