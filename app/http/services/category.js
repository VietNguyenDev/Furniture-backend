const { Category } = require('../../models');

const { abort } = require('../../helpers/error');
const { uploadImage } = require('../../config/cloudinary');

exports.create = async ({ categoryName, imageFilePath, categorySlug, imageFileName }) => {
  try {
    const category = await Category.query().findOne({
      categoryName,
    });
  
    if (category) return abort(400, 'This category is already exits');
    const result = await uploadImage(imageFilePath, imageFileName);
    const data = await Category.query().insert({ categoryName, categoryIcon: result.secure_url, categorySlug });
  
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
  try {
    const category = await Category.query().findById(categoryId);

    if (!category) return abort(400, 'This category is not already exists');
  
    await Category.query().findById(categoryId).delete();
  
    return ;
      
  } catch (error) {
    abort(400, 'Params error');    
  }
};
