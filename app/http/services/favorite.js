const productService = require('./product');
const { Favorite } = require('../../models');
const { abort } = require('../../helpers/error');

exports.addFavorite = async ({ productId, userId }) => {
  try {
    await productService.getDetail({ productId });
    const favorite = await Favorite.query().findOne({
      productId,
      userId,
    });
    if (favorite) {
      return abort(400, 'Product already in favorite');
    }
    const result = await Favorite.query().insert({
      productId,
      userId,
    });
    return result;
  } catch (error) {
    abort(400, error.message);
  }
};

exports.removeFavorite = async ({ productId, userId }) => {
  try {
    await productService.getDetail({ productId });
    const favorite = await Favorite.query().findOne({
      productId,
      userId,
    });

    if (!favorite) {
      return abort(400, 'Product not in favorite');
    }
    await Favorite.query().deleteById(favorite.id);
  } catch (error) {
    abort(400, error.message);
  }
};
